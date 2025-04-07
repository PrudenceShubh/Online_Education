import React from "react";
import { FaGraduationCap, FaChartLine, FaUsers, FaRobot } from "react-icons/fa";

const AboutUs = () => {
  const features = [
    {
      icon: <FaGraduationCap className="text-4xl text-blue-500 mb-2" />,
      title: "Interactive Learning",
      description: "Transform passive watching into active learning with our engaging platform"
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-500 mb-2" />,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics and insights"
    },
    {
      icon: <FaUsers className="text-4xl text-blue-500 mb-2" />,
      title: "Community Driven",
      description: "Learn together with peers and get support from expert mentors"
    },
    {
      icon: <FaRobot className="text-4xl text-blue-500 mb-2" />,
      title: "AI-Powered",
      description: "Personalized learning experience with AI-generated quizzes and summaries"
    }
  ];

  return (
    <div className="bg-gray-900 py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-500 mb-4">About Us</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="font-semibold text-white">Smart Interactive Learning</span>, 
            where we revolutionize online education through active engagement and 
            cutting-edge technology. Our platform combines AI-powered learning tools 
            with interactive content to create an immersive educational experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
