import React, { useState } from 'react';

const QuizPopup = ({ onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      correct: 0,
      summary: "HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications."
    },
    {
      question: "Which tag is used to create a hyperlink in HTML?",
      options: [
        "<link>",
        "<href>",
        "<a>",
        "<hyperlink>"
      ],
      correct: 2,
      summary: "The <a> tag defines a hyperlink, which is used to link from one page to another."
    },
    {
      question: "What is CSS used for?",
      options: [
        "Database Management",
        "Server Programming",
        "Styling Web Pages",
        "Network Security"
      ],
      correct: 2,
      summary: "CSS (Cascading Style Sheets) is used for styling and laying out web pages."
    }
  ];

  const handleAnswer = (selectedOption) => {
    if (selectedOption !== questions[currentQuestion].correct) {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full">
        {!showSummary ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Quiz!</h2>
            <div className="mb-6">
              <p className="text-lg text-white mb-4">{questions[currentQuestion].question}</p>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-3 rounded bg-gray-700 hover:bg-gray-600 text-white transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h2>
            {wrongAnswers.length > 0 ? (
              <div className="space-y-4">
                <p className="text-yellow-400">Here's what you should review:</p>
                {wrongAnswers.map((questionIndex) => (
                  <div key={questionIndex} className="bg-gray-700 p-4 rounded">
                    <p className="text-white mb-2">{questions[questionIndex].question}</p>
                    <p className="text-green-400">Correct Answer: {questions[questionIndex].options[questions[questionIndex].correct]}</p>
                    <p className="text-gray-300 mt-2">{questions[questionIndex].summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-400">Perfect score! Great job!</p>
            )}
            <button
              onClick={onComplete}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Continue Learning
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPopup;