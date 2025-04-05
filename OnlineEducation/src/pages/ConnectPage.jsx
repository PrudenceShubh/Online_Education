import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ConnectPage = () => {
  // Add these state variables
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('User' + Math.floor(Math.random() * 1000));
  const [peers, setPeers] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const videoRef = useRef();
  const socketRef = useRef();
  const peersRef = useRef({});

  useEffect(() => {
    // Connect to WebSocket server using the ngrok websocket URL
    socketRef.current = io('https://your-websocket-tunnel-url.ngrok.io', {
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
      });

    // Socket event listeners
    socketRef.current.on('message', handleNewMessage);
    socketRef.current.on('userJoined', handleUserJoined);
    socketRef.current.on('userLeft', handleUserLeft);

    return () => {
      socketRef.current.disconnect();
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleNewMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleUserJoined = (userId) => {
    setPeers(prev => [...prev, userId]);
  };

  const handleUserLeft = (userId) => {
    setPeers(prev => prev.filter(id => id !== userId));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      text: newMessage,
      username,
      timestamp: new Date().toISOString()
    };

    socketRef.current.emit('message', messageData);
    setNewMessage('');
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

  // Update the video controls section in the return statement
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Video Chat</h2>
            <div className="text-white">👥 {peers.length + 1} Online</div>
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
          <div className="mt-4 flex gap-2">
            <button 
              onClick={toggleVideo}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isVideoOn ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {isVideoOn ? '📹 Camera On' : '❌ Camera Off'}
            </button>
            <button 
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isAudioOn ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {isAudioOn ? '🎤 Mic On' : '🔇 Mic Off'}
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Discussion</h2>
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
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;