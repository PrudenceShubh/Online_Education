import React, { useState } from "react";
import banner from "../../assets/banner.png";
import AboutUs from "../../components/AboutUs";
import CourseCard from "../../components/courseCard";
import CourseList from "../../components/courseList";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-20">
      <div className="relative w-full max-w-6xl mx-auto">
        <img src={banner} alt="banner" className="w-full rounded-2xl shadow-lg object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 rounded-2xl p-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Smart Interactive Learning</h1>
          <p className="text-sm sm:text-base md:text-lg mt-2">Engage, Learn, and Retain Better with AI-Powered Learning</p>
          <button className="mt-4 px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-sm sm:text-base">
            Get Started
          </button>
        </div>
      </div>
      <div className="mt-10 px-4 sm:px-6 lg:px-8">
        <CourseList showAll={showAllCourses} />
        {!showAllCourses && (
          <div className="text-center mt-6">
            <button 
              onClick={() => setShowAllCourses(true)} 
              className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-lg font-semibold">
              See More Courses
            </button>
          </div>
        )}
      </div>
      <div className="mt-10 px-4 sm:px-6 lg:px-8">
        <AboutUs />
      </div>
    </div>
  );
};

export default Home;
