import React from "react";
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ image, name, description, price, courseId }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-80 transition-transform transform hover:scale-105 cursor-pointer flex flex-col" // Added flex flex-col
      onClick={handleCourseClick}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />

      <div className="p-4 flex flex-col flex-grow"> 
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm mt-2 flex-grow">{description}</p> 
        
        <div className="mt-auto"> 
          <p className="text-blue-600 font-bold mt-3 text-lg">₹{price}</p>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
