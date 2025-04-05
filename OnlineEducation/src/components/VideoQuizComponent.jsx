import React, { useState, useEffect } from 'react';
import { quizData } from '../data/quizData';

const VideoQuizComponent = ({ player, videoId, courseId }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (!player) return;

    const checkTime = () => {
      const currentTime = Math.floor(player.getCurrentTime());
      if (currentTime === 10 && !showQuiz) {
        player.pauseVideo();
        setShowQuiz(true);
        // Get quiz for current video
        const videoQuiz = quizData[courseId]?.[videoId]?.[0];
        if (videoQuiz) {
          setCurrentQuiz(videoQuiz.questions[0]);
        }
      }
    };

    // Check time every second
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [player, videoId, showQuiz]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setIsCorrect(answerIndex === currentQuiz.correct);
    if (answerIndex !== currentQuiz.correct) {
      setShowSummary(true);
    } else {
      handleContinue();
    }
  };

  const handleContinue = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowSummary(false);
    player.playVideo();
  };

  if (!showQuiz || !currentQuiz) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
        {!showSummary ? (
          <>
            <h3 className="text-xl font-bold mb-4">{currentQuiz.question}</h3>
            <div className="space-y-3">
              {currentQuiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-3 rounded-lg text-left ${
                    selectedAnswer === index
                      ? isCorrect
                        ? 'bg-green-600'
                        : 'bg-red-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">Topic Summary</h3>
            <p className="mb-4">{currentQuiz.explanation}</p>
            <button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
            >
              Continue Video
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoQuizComponent;