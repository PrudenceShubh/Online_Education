import React, { useState, useEffect, useRef } from "react";
import AboutUs from "../../components/AboutUs";
import { AnimatePresence } from 'framer-motion';
import { FaRocket, FaGraduationCap, FaUsers, FaChartLine, FaTimes } from 'react-icons/fa';
import CourseCategory from "../../components/CourseCategory";
import { categories } from "../../data/courseCategories";
import { shubhn } from "../../assets/video/video";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const videoRef = useRef(null);

  const features = [
    {
      icon: <FaRocket className="text-4xl text-blue-500" />,
      title: "AI-Powered Learning",
      description: "Personalized learning experience with smart recommendations",
      details: "Our platform uses advanced AI algorithms to analyze your learning patterns and preferences. The system adapts to your pace, suggests relevant content, and provides personalized feedback. With AI-powered quizzes that adjust difficulty based on your performance, you'll always be challenged at the right level. Our smart recommendation engine ensures you discover courses that match your interests and career goals."
    },
    {
      icon: <FaGraduationCap className="text-4xl text-blue-500" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and experts",
      details: "Our courses are taught by industry professionals with years of real-world experience. Each instructor undergoes a rigorous selection process to ensure they not only have deep subject matter expertise but also the ability to teach effectively. With our platform, you get direct access to these experts through live Q&A sessions, office hours, and community forums. Learn the latest industry practices and techniques that aren't covered in traditional textbooks."
    },
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: "Community Learning",
      description: "Join a community of learners and share knowledge",
      details: "Learning is more effective when done together. Our platform fosters a vibrant community of learners where you can connect with peers, share insights, and collaborate on projects. Join study groups, participate in discussions, and get feedback from other learners. Our community features include peer review systems, collaborative project spaces, and knowledge-sharing forums. Build your professional network while you learn."
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-500" />,
      title: "Progress Tracking",
      description: "Track your learning journey with detailed analytics",
      details: "Our comprehensive analytics dashboard gives you real-time insights into your learning progress. Track completion rates, quiz scores, and time spent on different topics. Identify your strengths and areas for improvement with detailed performance metrics. Set learning goals and receive notifications when you're falling behind. Our progress tracking system helps you stay motivated and focused on your learning objectives."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  const handleFeatureClick = (index) => {
    setSelectedFeature(index);
    setActiveFeature(index);
  };

  const closeFeatureDetails = () => {
    setSelectedFeature(null);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
          <video
            ref={videoRef}
            src={shubhn}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-r from-black/70 to-black/50 rounded-2xl p-8 text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              Smart Interactive Learning
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-200"
            >
              Engage, Learn, and Retain Better with AI-Powered Learning
            </p>
            <button
              className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
            </button>
          </div> */}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose Us</h2>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer transform transition-all duration-300 ${
                  activeFeature === index ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
                }`}
                onClick={() => handleFeatureClick(index)}
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-bold text-white mt-4">{feature.title}</h3>
                  <p className="text-gray-300 mt-2">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Feature Details Modal */}
          <AnimatePresence>
            {selectedFeature !== null && (
              <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                onClick={closeFeatureDetails}
              >
                <div
                  className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {features[selectedFeature].icon}
                      <h3 className="text-2xl font-bold text-white ml-3">{features[selectedFeature].title}</h3>
                    </div>
                    <button 
                      onClick={closeFeatureDetails}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>
                  <p className="text-gray-300 text-lg">{features[selectedFeature].details}</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Explore Our Course Categories</h2>
          <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Browse through our diverse range of course categories and find the perfect learning path for your career goals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <CourseCategory
                  id={category.id}
                  title={category.title}
                  tags={category.tags}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <AboutUs />
        </div>
      </div>
    </div>
  );
};

export default Home;
