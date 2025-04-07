const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store active users and their rooms
const users = {};
const rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining with username
  socket.on('join', (userData) => {
    const { username, userId } = userData;
    users[socket.id] = { username, userId, rooms: [] };
    console.log(`User ${username} (${socket.id}) joined`);
    
    // Notify all clients about the new user
    io.emit('userJoined', { 
      id: socket.id, 
      username,
      userId,
      timestamp: new Date().toISOString()
    });
  });

  // Handle joining a course room
  socket.on('joinRoom', (roomData) => {
    const { roomId, courseId, courseName } = roomData;
    
    // Leave all current rooms
    if (users[socket.id]) {
      users[socket.id].rooms.forEach(room => {
        socket.leave(room);
      });
      users[socket.id].rooms = [];
    }
    
    // Join the new room
    socket.join(roomId);
    if (users[socket.id]) {
      users[socket.id].rooms.push(roomId);
    }
    
    // Initialize room if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = {
        id: roomId,
        courseId,
        courseName,
        users: [],
        messages: [],
        whiteboard: [],
        polls: []
      };
    }
    
    // Add user to room's user list
    if (users[socket.id] && !rooms[roomId].users.includes(socket.id)) {
      rooms[roomId].users.push(socket.id);
    }
    
    console.log(`User ${socket.id} joined room ${roomId}`);
    
    // Send room data to the user
    socket.emit('roomJoined', {
      roomId,
      courseId,
      courseName,
      users: rooms[roomId].users.map(id => users[id]),
      messages: rooms[roomId].messages.slice(-50), // Last 50 messages
      whiteboard: rooms[roomId].whiteboard,
      polls: rooms[roomId].polls
    });
    
    // Notify others in the room
    socket.to(roomId).emit('userJoinedRoom', {
      id: socket.id,
      username: users[socket.id]?.username,
      timestamp: new Date().toISOString()
    });
  });

  // Handle chat messages
  socket.on('message', (messageData) => {
    const { roomId, text, type = 'text' } = messageData;
    
    if (!roomId) {
      // Global message
      io.emit('message', {
        ...messageData,
        id: socket.id,
        username: users[socket.id]?.username,
        timestamp: new Date().toISOString()
      });
    } else {
      // Room message
      const message = {
        ...messageData,
        id: socket.id,
        username: users[socket.id]?.username,
        timestamp: new Date().toISOString()
      };
      
      // Store message in room history
      if (rooms[roomId]) {
        rooms[roomId].messages.push(message);
      }
      
      // Send to room
      io.to(roomId).emit('message', message);
    }
  });

  // Handle private messages
  socket.on('privateMessage', (messageData) => {
    const { recipientId, text } = messageData;
    
    if (users[recipientId]) {
      const message = {
        senderId: socket.id,
        senderName: users[socket.id]?.username,
        recipientId,
        recipientName: users[recipientId]?.username,
        text,
        timestamp: new Date().toISOString()
      };
      
      // Send to recipient
      io.to(recipientId).emit('privateMessage', message);
      
      // Send back to sender
      socket.emit('privateMessage', message);
    }
  });

  // Handle whiteboard updates
  socket.on('whiteboardUpdate', (data) => {
    const { roomId, action, element } = data;
    
    if (rooms[roomId]) {
      if (action === 'add') {
        rooms[roomId].whiteboard.push(element);
      } else if (action === 'clear') {
        rooms[roomId].whiteboard = [];
      }
      
      // Broadcast to room
      io.to(roomId).emit('whiteboardUpdate', data);
    }
  });

  // Handle polls
  socket.on('createPoll', (pollData) => {
    const { roomId, question, options } = pollData;
    
    if (rooms[roomId]) {
      const poll = {
        id: Date.now().toString(),
        question,
        options: options.map(option => ({
          text: option,
          votes: 0
        })),
        createdBy: socket.id,
        createdAt: new Date().toISOString(),
        active: true
      };
      
      // Add poll to room's polls array
      if (!rooms[roomId].polls) {
        rooms[roomId].polls = [];
      }
      rooms[roomId].polls.push(poll);
      
      // Broadcast to room
      io.to(roomId).emit('pollCreated', poll);
    }
  });

  socket.on('votePoll', (voteData) => {
    const { roomId, pollId, optionIndex } = voteData;
    
    if (rooms[roomId]) {
      const poll = rooms[roomId].polls.find(p => p.id === pollId);
      
      if (poll && poll.active) {
        // Ensure the option exists
        if (poll.options[optionIndex]) {
          poll.options[optionIndex].votes++;
          
          // Broadcast updated poll
          io.to(roomId).emit('pollUpdated', poll);
        }
      }
    }
  });

  // Handle hand raising
  socket.on('raiseHand', (data) => {
    const { roomId, raised } = data;
    
    if (rooms[roomId]) {
      // Notify others in the room
      socket.to(roomId).emit('handRaised', {
        userId: socket.id,
        username: users[socket.id]?.username,
        raised,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove user from all rooms
    if (users[socket.id]) {
      users[socket.id].rooms.forEach(roomId => {
        if (rooms[roomId]) {
          rooms[roomId].users = rooms[roomId].users.filter(id => id !== socket.id);
          
          // Notify others in the room
          io.to(roomId).emit('userLeftRoom', {
            id: socket.id,
            username: users[socket.id]?.username,
            timestamp: new Date().toISOString()
          });
        }
      });
      
      // Remove user from users list
      delete users[socket.id];
    }
    
    // Notify all clients
    io.emit('userLeft', {
      id: socket.id,
      timestamp: new Date().toISOString()
    });
  });
});

const PORT = 5005;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});