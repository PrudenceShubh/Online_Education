import React, { useEffect, useState } from 'react';
import { quizData } from '../data/quizData';

const VideoQuizComponent = ({ player, courseId, videoId }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Force show quiz handler (for testing)
    const forceShowQuizHandler = () => {
      try {
        console.log(`Force showing quiz for course: ${courseId}, video: ${videoId}`);
        const videoQuizzes = quizData[courseId]?.[videoId];
        
        if (videoQuizzes && videoQuizzes.length > 0) {
          if (player && typeof player.pauseVideo === 'function') {
            player.pauseVideo();
          }
          
          setShowQuiz(true);
          setCurrentQuestionIndex(0);
          setCurrentQuiz(videoQuizzes[0].questions[0]);
          setWrongAnswers([]);
          setQuizCompleted(false);
        } else {
          console.warn(`No quiz found for courseId: ${courseId}, videoId: ${videoId}`);
          alert("No quiz available for this video yet.");
        }
      } catch (error) {
        console.error("Error showing quiz:", error);
      }
    };
    
    document.addEventListener('force-show-quiz', forceShowQuizHandler);
    return () => document.removeEventListener('force-show-quiz', forceShowQuizHandler);
  }, [courseId, videoId, player]);

  return (
    <div>
      {/* Render your quiz component here */}
    </div>
  );
};

export default VideoQuizComponent; 