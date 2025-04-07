import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaHandPaper, FaChalkboard, FaPoll, FaUsers, FaPaperPlane, FaTimes } from 'react-icons/fa';

const ConnectPage = () => {
  const { courseId, courseName } = useParams();
  
  // State variables
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username] = useState('User' + Math.floor(Math.random() * 1000));
  const [userId] = useState(localStorage.getItem('userId') || 'user_' + Date.now());
  const [localStream, setLocalStream] = useState(null);
  const [roomUsers, setRoomUsers] = useState([]);
  const [whiteboardElements, setWhiteboardElements] = useState([]);
  const [polls, setPolls] = useState([]);
  const [activePoll, setActivePoll] = useState(null);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  
  // Refs
  const videoRef = useRef();
  const socketRef = useRef();
  const canvasRef = useRef();
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Generate a room ID based on course ID
  const roomId = `course_${courseId}`;

  useEffect(() => {
    // Save userId to localStorage
    localStorage.setItem('userId', userId);
    
    // Connect to WebSocket server
    socketRef.current = io('http://localhost:5005', {
      transports: ['websocket'],
      cors: {
        origin: "*"
      }
    });

    // Initialize video stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error('Error accessing media devices:', err);
      });

    // Join with user data
    socketRef.current.emit('join', { username, userId });
    
    // Join course room
    socketRef.current.emit('joinRoom', { 
      roomId, 
      courseId, 
      courseName: courseName || 'Course Room' 
    });

    // Socket event listeners
    socketRef.current.on('message', handleNewMessage);
    socketRef.current.on('userJoined', handleUserJoined);
    socketRef.current.on('userLeft', handleUserLeft);
    socketRef.current.on('userJoinedRoom', handleUserJoinedRoom);
    socketRef.current.on('userLeftRoom', handleUserLeftRoom);
    socketRef.current.on('roomJoined', handleRoomJoined);
    socketRef.current.on('privateMessage', handlePrivateMessage);
    socketRef.current.on('whiteboardUpdate', handleWhiteboardUpdate);
    socketRef.current.on('pollCreated', handlePollCreated);
    socketRef.current.on('pollUpdated', handlePollUpdated);
    socketRef.current.on('handRaised', handleHandRaised);

    return () => {
      socketRef.current.disconnect();
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleUserJoined = (user) => {
    setRoomUsers(prev => [...prev, user]);
  };

  const handleUserLeft = (user) => {
    setRoomUsers(prev => prev.filter(u => u.id !== user.id));
  };

  const handleUserJoinedRoom = (user) => {
    setRoomUsers(prev => [...prev, user]);
  };

  const handleUserLeftRoom = (user) => {
    setRoomUsers(prev => prev.filter(u => u.id !== user.id));
  };

  const handleRoomJoined = (data) => {
    setRoomUsers(data.users);
    setMessages(data.messages || []);
    setWhiteboardElements(data.whiteboard || []);
    setPolls(data.polls || []);
  };

  const handlePrivateMessage = (message) => {
    setMessages(prev => [...prev, {
      ...message,
      isPrivate: true,
      text: `[Private] ${message.senderName}: ${message.text}`
    }]);
  };

  const handleWhiteboardUpdate = (data) => {
    if (data.action === 'add') {
      setWhiteboardElements(prev => [...prev, data.element]);
      
      // Draw the new element immediately
      if (showWhiteboard && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const element = data.element;
        
        if (element.type === 'line') {
          ctx.beginPath();
          ctx.moveTo(element.startX, element.startY);
          ctx.lineTo(element.endX, element.endY);
          ctx.stroke();
        }
      }
    } else if (data.action === 'clear') {
      setWhiteboardElements([]);
      
      // Clear the canvas
      if (showWhiteboard && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handlePollCreated = (poll) => {
    setPolls(prev => [...prev, poll]);
    setActivePoll(poll);
  };

  const handlePollUpdated = (updatedPoll) => {
    setPolls(prev => prev.map(poll => 
      poll.id === updatedPoll.id ? updatedPoll : poll
    ));
    
    if (activePoll && activePoll.id === updatedPoll.id) {
      setActivePoll(updatedPoll);
    }
  };

  const handleHandRaised = (data) => {
    // Update UI to show who raised their hand
    console.log(`${data.username} ${data.raised ? 'raised' : 'lowered'} their hand`);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      text: newMessage,
      type: 'text'
    };

    socketRef.current.emit('message', messageData);
    setNewMessage('');
  };

  const sendPrivateMessage = (recipientId, text) => {
    if (!text.trim()) return;
    
    socketRef.current.emit('privateMessage', { recipientId, text });
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOn;
      });
      setIsVideoOn(!isVideoOn);
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioOn;
      });
      setIsAudioOn(!isAudioOn);
    }
  };

  const toggleHand = () => {
    const raised = !isHandRaised;
    setIsHandRaised(raised);
    
    socketRef.current.emit('raiseHand', { roomId, raised });
  };

  const toggleWhiteboard = () => {
    setShowWhiteboard(!showWhiteboard);
  };

  const togglePollCreator = () => {
    setShowPollCreator(!showPollCreator);
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  const createPoll = (e) => {
    e.preventDefault();
    
    if (!pollQuestion.trim() || pollOptions.some(opt => !opt.trim())) {
      return;
    }
    
    const pollData = {
      roomId,
      question: pollQuestion,
      options: pollOptions.filter(opt => opt.trim())
    };
    
    socketRef.current.emit('createPoll', pollData);
    
    setPollQuestion('');
    setPollOptions(['', '']);
    setShowPollCreator(false);
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const votePoll = (pollId, optionIndex) => {
    socketRef.current.emit('votePoll', { roomId, pollId, optionIndex });
  };

  const clearWhiteboard = () => {
    socketRef.current.emit('whiteboardUpdate', { roomId, action: 'clear' });
  };

  // Whiteboard drawing functions
  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    lastPointRef.current = { x, y };
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    // Add to whiteboard elements
    const element = {
      type: 'line',
      startX: lastPointRef.current.x,
      startY: lastPointRef.current.y,
      endX: x,
      endY: y,
      color: '#ffffff',
      width: 2
    };
    
    socketRef.current.emit('whiteboardUpdate', { 
      roomId, 
      action: 'add', 
      element 
    });
    
    lastPointRef.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  // Initialize canvas when whiteboard is shown
  useEffect(() => {
    if (showWhiteboard && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to match display size
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Set initial canvas properties
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Redraw existing whiteboard elements
      whiteboardElements.forEach(element => {
        if (element.type === 'line') {
          ctx.beginPath();
          ctx.moveTo(element.startX, element.startY);
          ctx.lineTo(element.endX, element.endY);
          ctx.stroke();
        }
      });
    }
  }, [showWhiteboard, whiteboardElements]);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Video Section */}
        <div className="md:col-span-2 bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              {courseName || 'Course Room'}
            </h2>
            <div className="text-white">👥 {roomUsers.length} Online</div>
          </div>
          
          <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Controls */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button 
              onClick={toggleVideo}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isVideoOn ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
              {isVideoOn ? 'Camera On' : 'Camera Off'}
            </button>
            
            <button 
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isAudioOn ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {isAudioOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
              {isAudioOn ? 'Mic On' : 'Mic Off'}
            </button>
            
            <button 
              onClick={toggleHand}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isHandRaised ? 'bg-yellow-600' : 'bg-gray-600'
              }`}
            >
              <FaHandPaper className={isHandRaised ? 'text-white' : 'text-gray-400'} />
              {isHandRaised ? 'Hand Raised' : 'Raise Hand'}
            </button>
            
            <button 
              onClick={toggleWhiteboard}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600"
            >
              <FaChalkboard />
              Whiteboard
            </button>
            
            <button 
              onClick={togglePollCreator}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600"
            >
              <FaPoll />
              Create Poll
            </button>
            
            <button 
              onClick={toggleUserList}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600"
            >
              <FaUsers />
              Users
            </button>
          </div>
          
          {/* Whiteboard */}
          {showWhiteboard && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">Whiteboard</h3>
                <button 
                  onClick={clearWhiteboard}
                  className="px-3 py-1 bg-red-600 rounded-md text-white"
                >
                  Clear
                </button>
              </div>
              <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent('mousedown', {
                      clientX: touch.clientX,
                      clientY: touch.clientY
                    });
                    canvasRef.current.dispatchEvent(mouseEvent);
                  }}
                  onTouchMove={(e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent('mousemove', {
                      clientX: touch.clientX,
                      clientY: touch.clientY
                    });
                    canvasRef.current.dispatchEvent(mouseEvent);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    const mouseEvent = new MouseEvent('mouseup', {});
                    canvasRef.current.dispatchEvent(mouseEvent);
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Poll Creator */}
          {showPollCreator && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Create Poll</h3>
              <form onSubmit={createPoll}>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg"
                    placeholder="Enter your question"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Options
                  </label>
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updatePollOption(index, e.target.value)}
                        className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg"
                        placeholder={`Option ${index + 1}`}
                      />
                      {pollOptions.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removePollOption(index)}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addPollOption}
                    className="mt-2 bg-gray-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add Option
                  </button>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Create Poll
                </button>
              </form>
            </div>
          )}
          
          {/* Active Poll */}
          {activePoll && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">{activePoll.question}</h3>
              <div className="space-y-2">
                {activePoll.options.map((option, index) => {
                  const totalVotes = activePoll.options.reduce((sum, opt) => sum + opt.votes, 0);
                  const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                  
                  return (
                    <div key={index} className="space-y-1">
                      <button
                        onClick={() => votePoll(activePoll.id, index)}
                        className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{option.text}</span>
                        <span className="text-sm">{percentage}%</span>
                      </button>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Total votes: {activePoll.options.reduce((sum, opt) => sum + opt.votes, 0)}
              </p>
            </div>
          )}
        </div>
        
        {/* Chat Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Discussion</h2>
          
          {/* User List */}
          {showUserList && (
            <div className="mb-4 bg-gray-700 p-3 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Users</h3>
              <div className="max-h-40 overflow-y-auto">
                {roomUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <span className="text-white">{user.username}</span>
                    <button
                      onClick={() => {
                        const message = prompt(`Send a private message to ${user.username}:`);
                        if (message) {
                          sendPrivateMessage(user.id, message);
                        }
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="h-[400px] overflow-y-auto mb-4 bg-gray-700 rounded-lg p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.username === username ? 'bg-blue-600 ml-auto' : 'bg-gray-600'
                } max-w-[80%]`}
              >
                <p className="text-sm text-gray-300">{msg.username}</p>
                <p className="text-white">{msg.text}</p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;