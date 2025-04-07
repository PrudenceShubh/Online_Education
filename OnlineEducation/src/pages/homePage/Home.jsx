import React, { useState, useEffect } from "react";
import banner from "../../assets/banner.png";
import AboutUs from "../../components/AboutUs";
import CourseCard from "../../components/courseCard";
import CourseList from "../../components/CourseList";
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaGraduationCap, FaUsers, FaChartLine, FaTimes } from 'react-icons/fa';

const Home = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(null);

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-6xl mx-auto"
        >
          <img src={banner} alt="banner" className="w-full rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-r from-black/70 to-black/50 rounded-2xl p-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              Smart Interactive Learning
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-200"
            >
              Engage, Learn, and Retain Better with AI-Powered Learning
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-xl bg-gray-700/50 backdrop-blur-lg transform transition-all duration-300 cursor-pointer ${
                  activeFeature === index ? 'scale-105 shadow-xl' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
                onClick={() => handleFeatureClick(index)}
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Details Modal */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeFeatureDetails}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeFeatureDetails}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl text-blue-500 mb-4">
                  {features[selectedFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{features[selectedFeature].title}</h3>
                <p className="text-gray-300 mb-6">{features[selectedFeature].description}</p>
                <div className="w-full h-px bg-gray-700 mb-6"></div>
                <p className="text-gray-300 text-left leading-relaxed">
                  {features[selectedFeature].details}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Courses Section */}
      <div id="courses-section" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <CourseList showAll={showAllCourses} />
          </div>
          {!showAllCourses && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <button 
                onClick={() => setShowAllCourses(true)} 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                See More Courses
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* About Us Section */}
      <div id="about-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <AboutUs />
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-gray-700/50 rounded-xl backdrop-blur-lg"
            >
              <h3 className="text-4xl font-bold text-blue-500">10K+</h3>
              <p className="text-gray-300 mt-2">Active Students</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center p-6 bg-gray-700/50 rounded-xl backdrop-blur-lg"
            >
              <h3 className="text-4xl font-bold text-blue-500">500+</h3>
              <p className="text-gray-300 mt-2">Expert Instructors</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center p-6 bg-gray-700/50 rounded-xl backdrop-blur-lg"
            >
              <h3 className="text-4xl font-bold text-blue-500">95%</h3>
              <p className="text-gray-300 mt-2">Success Rate</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
