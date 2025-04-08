import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-10 px-5 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-600">About Us</h2>
        <p className="text-lg text-gray-700 mt-4">
          Welcome to <span className="font-semibold">Smart Interactive Learning</span>, where we revolutionize online education!
          Our mission is to **eliminate passive learning** by making online courses truly interactive.
          With AI-powered quizzes, real-time engagement tracking, and an intelligent chatbot, 
          we ensure students **stay focused, understand better, and retain knowledge effectively**.
        </p>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800">Our Goals</h3>
          <ul className="text-gray-700 mt-3 space-y-2">
            <li>✅ **Increase student focus & retention** with active learning.</li>
            <li>✅ **AI-powered quizzes & summaries** for better understanding.</li>
            <li>✅ **Gamified learning experience** to keep students motivated.</li>
            <li>✅ **Personalized learning paths** based on student performance.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
