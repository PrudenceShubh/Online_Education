import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ courseId, name, description, price, image, videos }) => {
  const videoCount = Array.isArray(videos) ? videos.length : 0;

  return (
    <Link to={`/course/${courseId}`} className="block h-full">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
        <div className="relative h-40 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-white mb-2 flex-grow">{name}</h3>
          <p className="text-gray-300 text-sm mb-3">{description}</p>
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-700/50">
            <span className="text-xs text-gray-400">{videoCount} Videos</span>
            <span className="text-base font-semibold text-blue-400">
              {typeof price === 'number' ? `$${price.toFixed(2)}` : price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
