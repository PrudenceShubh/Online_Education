import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { courses } from './CourseList';
import VideoQuizComponent from './VideoQuizComponent';

const LearningPage = () => {
  const { courseId } = useParams();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { text: "How can I help you with this lesson?", isBot: true }
  ]);
  const [comments, setComments] = useState([
    { id: 1, user: "Alice", text: "Great explanation!", timestamp: "2024-02-29T10:30:00" },
    { id: 2, user: "Bob", text: "Very helpful!", timestamp: "2024-02-29T11:15:00" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptSegments, setTranscriptSegments] = useState([]);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [transcriptError, setTranscriptError] = useState(null);
  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Enhanced YouTube ID extraction
  const extractYouTubeId = (url) => {
    // Handle direct video IDs
    if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
      return url;
    }
    
    // Handle various URL formats
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // YouTube API initialization
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API ready");
    };

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Initialize YouTube player when video changes
  useEffect(() => {
    if (courseData && courseData.videos[currentVideoIndex]) {
      const videoId = extractYouTubeId(courseData.videos[currentVideoIndex].url);
      
      if (videoId && window.YT && window.YT.Player) {
        // Clear any existing timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        // Destroy existing player if it exists
        if (playerRef.current) {
          playerRef.current.destroy();
        }
        
        // Create new player with updated configuration
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: {
            'autoplay': 0,
            'controls': 1,
            'origin': 'http://localhost:5173',
            'enablejsapi': 1,
            'widgetid': 1,
            'host': 'http://localhost:5173',
            'rel': 0,
            'modestbranding': 1,
            'iv_load_policy': 3
          },
          events: {
            'onReady': (event) => {
              console.log("Player is ready");
              setIsPlayerReady(true);
              try {
                // Start a timer to update the current time
                if (timerRef.current) {
                  clearInterval(timerRef.current);
                }
                
                timerRef.current = setInterval(() => {
                  try {
                    if (event.target && typeof event.target.getCurrentTime === 'function') {
                      const currentTime = Math.floor(event.target.getCurrentTime());
                      setCurrentVideoTime(currentTime);
                    }
                  } catch (error) {
                    console.error('Error getting current time:', error);
                  }
                }, 1000);
              } catch (error) {
                console.error('Error in onPlayerReady:', error);
              }
            },
            'onStateChange': (event) => {
              try {
                // If video is playing, ensure timer is running
                if (event.data === window.YT.PlayerState.PLAYING) {
                  if (!timerRef.current) {
                    timerRef.current = setInterval(() => {
                      try {
                        if (event.target && typeof event.target.getCurrentTime === 'function') {
                          const currentTime = Math.floor(event.target.getCurrentTime());
                          setCurrentVideoTime(currentTime);
                        }
                      } catch (error) {
                        console.error('Error getting current time:', error);
                      }
                    }, 1000);
                  }
                } else if (event.data === window.YT.PlayerState.PAUSED || 
                          event.data === window.YT.PlayerState.ENDED) {
                  // Clear the timer when video is paused or ended
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                  }
                }
              } catch (error) {
                console.error('Error in onPlayerStateChange:', error);
              }
            },
            'onError': (event) => {
              console.error('YouTube Player Error:', event);
              setIsPlayerReady(false);
            }
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
          setIsPlayerReady(false);
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
    };
  }, [courseData, currentVideoIndex]);

  // Navigation functions
  const handleNextVideo = () => {
    if (courseData && currentVideoIndex < courseData.videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  // Transcript fetching with improved error handling and language fallback
  const fetchTranscript = async (videoUrl) => {
    setIsLoadingTranscript(true);
    setTranscriptError(null);

    try {
      const videoId = extractYouTubeId(videoUrl);
      if (!videoId) {
        throw new Error('Could not extract video ID from URL');
      }

      // Try fetching captions in the preferred language first (en-ZA)
      let language = 'en-ZA';
      let transcriptData = null;

      // Attempt to fetch captions in the preferred language
      try {
        const response = await fetch('http://localhost:5004/api/get-subtitles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId, language })
        });

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        transcriptData = await response.json();

        if (!transcriptData.subtitles) {
          throw new Error('No subtitles available');
        }

      } catch (error) {
        console.error('Error fetching transcript:', error);
        throw error;
      }

      // Handle transcript and segments
      setCurrentTranscript(transcriptData.subtitles);
      setTranscriptSegments(transcriptData.segments || []);

      setChatMessages(prev => [...prev, {
        text: "I've loaded the video transcript and can now answer questions about its content.",
        isBot: true
      }]);

    } catch (error) {
      console.error('Transcript error:', error);
      setTranscriptError(error.message);
      setCurrentTranscript('');
      setTranscriptSegments([]);
      
      setChatMessages(prev => [...prev, {
        text: `Note: ${error.message}. I can still answer general questions about programming.`,
        isBot: true
      }]);
    } finally {
      setIsLoadingTranscript(false);
    }
  };

  // Course data loading with error handling
  useEffect(() => {
    try {
      const selectedCourse = courses.find(course => course.id === courseId);
      if (!selectedCourse) {
        throw new Error('Course not found');
      }
      setCourseData(selectedCourse);
      setCurrentVideoIndex(0);
    } catch (error) {
      console.error('Error loading course:', error);
      // Handle course loading error
    }
  }, [courseId]);

  // Fetch transcript when video changes with error handling
  useEffect(() => {
    if (courseData?.videos?.[currentVideoIndex]?.url) {
      fetchTranscript(courseData.videos[currentVideoIndex].url);
    }
  }, [courseData, currentVideoIndex]);

  // Chat functions
  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { text: chatInput, isBot: false };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");

    try {
      const response = await fetch('http://localhost:5004/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: chatInput,
          courseTitle: currentVideo?.title || '',
          transcript: currentTranscript
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, data]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, {
        text: `Error: ${error.message}. Please try again.`,
        isBot: true,
        isError: true
      }]);
    }
  };

  // Comment functions
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([...comments, {
      id: Date.now(),
      user: "You",
      text: newComment,
      timestamp: new Date().toISOString()
    }]);
    setNewComment("");
  };

  // Helper functions
  const addTimestampToChat = () => {
    const mins = Math.floor(currentVideoTime / 60);
    const secs = currentVideoTime % 60;
    const timestamp = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    setChatInput(prev => `${prev} [${timestamp}]`.trim());
  };

  const summarizeCurrentSection = async () => {
    if (!currentTranscript || isSummarizing) return;
    
    setIsSummarizing(true);
    
    try {
      const currentSegment = transcriptSegments.find(segment => 
        currentVideoTime >= segment.start && 
        currentVideoTime < segment.start + segment.duration
      );

      const response = await fetch('http://localhost:5004/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: currentSegment?.text || currentTranscript.substring(0, 1000),
          timestamp: currentVideoTime
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.summary) {
        setChatMessages(prev => [...prev, {
          text: `Summary at ${Math.floor(currentVideoTime/60)}:${currentVideoTime%60}:\n${data.summary}`,
          isBot: true
        }]);
      } else {
        throw new Error('No summary received');
      }
    } catch (error) {
      console.error('Summary error:', error);
      setChatMessages(prev => [...prev, {
        text: `Couldn't generate summary: ${error.message}`,
        isBot: true,
        isError: true
      }]);
    } finally {
      setIsSummarizing(false);
    }
  };

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading course...</div>
      </div>
    );
  }

  const currentVideo = courseData.videos[currentVideoIndex];
  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Video not found</div>
      </div>
    );
  }

  const formattedTime = `${Math.floor(currentVideoTime / 60)}:${(currentVideoTime % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Video Section */}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">{currentVideo.title}</h2>
          
          <div className="relative pt-[56.25%]">
            <div id="youtube-player" className="absolute top-0 left-0 w-full h-full rounded-lg"></div>
            {isPlayerReady && (
              <VideoQuizComponent 
                player={playerRef.current} 
                videoId={currentVideo.title} 
                courseId={courseId} 
              />
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handlePrevVideo}
              disabled={currentVideoIndex === 0}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextVideo}
              disabled={currentVideoIndex === courseData.videos.length - 1}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              disabled={!currentTranscript && !isLoadingTranscript}
              className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              {showTranscript ? "Hide Transcript" : "Show Transcript"}
            </button>
            <div className="ml-auto flex items-center bg-gray-700 px-3 py-2 rounded-lg">
              <span className="text-sm">Current Time: {formattedTime}</span>
            </div>
          </div>

          {/* Transcript Section */}
          {isLoadingTranscript && (
            <div className="mt-4 p-3 bg-gray-700 rounded-lg animate-pulse">
              Loading transcript...
            </div>
          )}

          {showTranscript && transcriptError && (
            <div className="mt-4 p-3 bg-yellow-900 text-yellow-200 rounded-lg">
              <p className="font-bold">Transcript Unavailable</p>
              <p className="text-sm">{transcriptError}</p>
            </div>
          )}

          {showTranscript && currentTranscript && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg max-h-60 overflow-y-auto">
              <h3 className="text-lg font-bold mb-2">Transcript</h3>
              {transcriptSegments.length > 0 ? (
                transcriptSegments.map((segment, i) => {
                  const timeInSeconds = Math.floor(segment.start);
                  const minutes = Math.floor(timeInSeconds / 60);
                  const seconds = Math.floor(timeInSeconds % 60);
                  const timestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                  
                  return (
                    <div 
                      key={i}
                      className={`mb-1 p-1 rounded ${
                        currentVideoTime >= timeInSeconds && 
                        currentVideoTime < timeInSeconds + Math.floor(segment.duration)
                          ? 'bg-blue-800' 
                          : ''
                      }`}
                    >
                      <span className="text-xs text-gray-400 mr-2">{timestamp}</span>
                      {segment.text}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-300">{currentTranscript}</p>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="md:w-1/3 flex flex-col gap-4">
          {/* Course Content */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Course Content</h2>
            <div className="space-y-2">
              {courseData.videos.map((video, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer ${index === currentVideoIndex ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setCurrentVideoIndex(index)}
                >
                  <h3 className="font-medium">{video.title}</h3>
                  <p className="text-sm text-gray-400">{video.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat Assistant */}
          <div className="bg-gray-800 p-4 h-[600px] rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">AI Learning Assistant</h2>
            <div className="h-[500px] flex flex-col">
              <div className="flex-1 bg-gray-700 rounded-lg p-4 overflow-y-auto mb-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-3 p-3 rounded-lg ${msg.isBot ? 'bg-gray-600' : 'bg-blue-600 ml-auto'} ${msg.isError ? 'border border-red-400' : ''} max-w-[80%]`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    {msg.sources?.length > 0 && (
                      <div className="mt-1 text-xs text-blue-200">
                        Sources: {msg.sources.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={addTimestampToChat}
                    className="bg-gray-700 px-3 py-1 rounded text-sm flex-1"
                  >
                    Add Time: {formattedTime}
                  </button>
                  <button
                    onClick={summarizeCurrentSection}
                    disabled={!currentTranscript || isSummarizing}
                    className="bg-green-700 px-3 py-1 rounded text-sm flex-1 disabled:opacity-50"
                  >
                    {isSummarizing ? 'Summarizing...' : 'Summarize'}
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                    placeholder="Ask about this lesson..."
                    className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleChatSubmit}
                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Discussion</h2>
        
        <form onSubmit={handleAddComment} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-blue-400">{comment.user}</h3>
                <span className="text-sm text-gray-400">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-200">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPage;