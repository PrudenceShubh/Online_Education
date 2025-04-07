import React, { useState, useEffect } from 'react';
import { quizData } from '../data/quizData';

const VideoQuizComponent = ({ player, videoId, courseId }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [quizTiming, setQuizTiming] = useState('auto'); // 'auto', 'end', or 'none'
  const [lastCheckedTime, setLastCheckedTime] = useState(-1); // Track last checked time

  useEffect(() => {
    if (!player) return;

    const checkTime = () => {
      try {
        if (!player || typeof player.getCurrentTime !== 'function') return; // Add safety check

        const currentTime = Math.floor(player.getCurrentTime());
        const duration = player.getDuration();

        // --- START DEBUG LOGS ---
        // Only log periodically to avoid flooding console
        if (currentTime % 5 === 0 && currentTime !== lastCheckedTime) { // Log every 5 seconds
           console.log(`Checking time: Current = ${currentTime}, Course = ${courseId}, Video = ${videoId}, TimingMode = ${quizTiming}`);
           const videoQuizzes = quizData[courseId]?.[videoId];
           console.log('Quizzes for this video:', videoQuizzes);
           if (videoQuizzes && videoQuizzes[0]) {
             console.log('Expected Timestamp:', videoQuizzes[0].timeStamp);
           }
        }
        // --- END DEBUG LOGS ---


        // Skip if we've already checked this second
        if (currentTime === lastCheckedTime) return;
        setLastCheckedTime(currentTime);

        // Find the appropriate quiz for the current video time
        const videoQuizzes = quizData[courseId]?.[videoId] || [];

        let quizToShow = null;

        if (quizTiming === 'auto') {
          // Original behavior - show quiz at specific timestamps
          quizToShow = videoQuizzes.find(quiz => {
            const shouldShow = currentTime >= quiz.timeStamp &&
                             currentTime < quiz.timeStamp + 2 && // Check within a 2-second window
                             !showQuiz &&
                             !quizCompleted;
            // --- Log if a quiz *should* show ---
            if(shouldShow){
              console.log(`FOUND QUIZ TO SHOW at ${currentTime}s for timestamp ${quiz.timeStamp}`);
            }
            // ---
            return shouldShow;
          });
        } else if (quizTiming === 'end') {
          // Show quiz at the end of the video
          if (currentTime >= duration - 5 && !showQuiz && !quizCompleted) {
            quizToShow = videoQuizzes[0]; // Use the first quiz set
          }
        }
        
        if (quizToShow) {
          console.log(">>> Pausing video and showing quiz!"); // Add this log
          player.pauseVideo();
          setShowQuiz(true);
          setCurrentQuestionIndex(0);
          setCurrentQuiz(quizToShow.questions[0]);
          setWrongAnswers([]);
        }
      } catch (error) {
        console.error('Error in checkTime:', error);
      }
    };

    // Check time more frequently (every 500ms)
    const interval = setInterval(checkTime, 500);
    return () => clearInterval(interval);
  }, [player, videoId, showQuiz, courseId, quizCompleted, quizTiming, lastCheckedTime]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuiz.correct;
    setIsCorrect(correct);
    
    if (!correct) {
      // Track wrong answers for summary
      setWrongAnswers(prev => [...prev, {
        question: currentQuiz.question,
        correctAnswer: currentQuiz.options[currentQuiz.correct],
        explanation: currentQuiz.explanation
      }]);
      setShowSummary(true);
    } else {
      // Move to next question or complete quiz
      if (currentQuestionIndex < quizData[courseId]?.[videoId]?.[0]?.questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setCurrentQuiz(quizData[courseId]?.[videoId]?.[0]?.questions[currentQuestionIndex + 1]);
          setSelectedAnswer(null);
          setIsCorrect(null);
        }, 1000);
      } else {
        // All questions answered correctly
        setQuizCompleted(true);
        setTimeout(() => {
          handleContinue();
        }, 1500);
      }
    }
  };

  const handleContinue = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowSummary(false);
    
    // If quiz is completed, resume video
    if (quizCompleted) {
      player.playVideo();
    }
  };

  const retryQuestion = () => {
    setShowSummary(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleQuizTimingChange = (timing) => {
    setQuizTiming(timing);
    // Reset quiz state when changing timing
    setShowQuiz(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setWrongAnswers([]);
  };

  // Quiz timing control buttons
  const QuizTimingControls = () => (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-3 rounded-lg shadow-lg z-40">
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-white mb-1">Quiz Timing:</span>
        <div className="flex space-x-2">
          <button
            onClick={() => handleQuizTimingChange('auto')}
            className={`px-3 py-1 rounded-md text-sm ${
              quizTiming === 'auto' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => handleQuizTimingChange('end')}
            className={`px-3 py-1 rounded-md text-sm ${
              quizTiming === 'end' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            End
          </button>
          <button
            onClick={() => handleQuizTimingChange('none')}
            className={`px-3 py-1 rounded-md text-sm ${
              quizTiming === 'none' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            None
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showQuiz && currentQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
            {!showSummary ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Quiz Question {currentQuestionIndex + 1}</h3>
                  <span className="text-sm text-gray-400">
                    {quizData[courseId]?.[videoId]?.[0]?.questions.length} questions total
                  </span>
                </div>
                
                <h3 className="text-lg mb-4">{currentQuiz.question}</h3>
                <div className="space-y-3">
                  {currentQuiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedAnswer === index
                          ? isCorrect
                            ? 'bg-green-600'
                            : 'bg-red-600'
                          : 'bg-gray-700 hover:bg-gray-600'
                      } ${selectedAnswer !== null && selectedAnswer !== index && index === currentQuiz.correct ? 'bg-green-600' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {selectedAnswer !== null && (
                  <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-900' : 'bg-red-900'}`}>
                    <p className="font-medium">
                      {isCorrect ? 'Correct!' : 'Incorrect!'}
                    </p>
                    <p className="text-sm mt-1">{currentQuiz.explanation}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Review</h3>
                <div className="mb-4 max-h-60 overflow-y-auto">
                  {wrongAnswers.map((wrong, index) => (
                    <div key={index} className="mb-4 p-3 bg-gray-700 rounded-lg">
                      <p className="font-medium">Question: {wrong.question}</p>
                      <p className="text-green-400">Correct Answer: {wrong.correctAnswer}</p>
                      <p className="text-sm mt-1">{wrong.explanation}</p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={retryQuestion}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleContinue}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded-lg"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <QuizTimingControls />
    </>
  );
};

export default VideoQuizComponent;