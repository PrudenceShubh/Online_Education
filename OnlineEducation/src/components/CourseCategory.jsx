import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserMd, 
  FaAtom, 
  FaGraduationCap, 
  FaBalanceScale, 
  FaUserTie,
  FaShieldAlt,
  FaLongArrowAltRight 
} from 'react-icons/fa';

const getCategoryIcon = (id) => {
  const icons = {
    'neet': <FaUserMd className="text-4xl text-red-400 opacity-50" />,
    'iit-jee': <FaAtom className="text-4xl text-yellow-400 opacity-50" />,
    'school': <FaGraduationCap className="text-4xl text-blue-400 opacity-50" />,
    'upsc': <FaBalanceScale className="text-4xl text-purple-400 opacity-50" />,
    'govt-jobs': <FaUserTie className="text-4xl text-green-400 opacity-50" />,
    'defence': <FaShieldAlt className="text-4xl text-cyan-400 opacity-50" />
  };
  return icons[id] || <FaGraduationCap className="text-4xl text-blue-400 opacity-50" />;
};

const getCardBgColor = (id) => {
  const colors = {
    'neet': 'bg-gradient-to-br from-rose-900/30 to-rose-800/10',
    'iit-jee': 'bg-gradient-to-br from-amber-900/30 to-amber-800/10',
    'school': 'bg-gradient-to-br from-blue-900/30 to-blue-800/10', 
    'upsc': 'bg-gradient-to-br from-indigo-900/30 to-indigo-800/10',
    'govt-jobs': 'bg-gradient-to-br from-cyan-900/30 to-cyan-800/10',
    'defence': 'bg-gradient-to-br from-gray-900/30 to-gray-800/10'
  };
  return colors[id] || 'bg-gradient-to-br from-gray-900/30 to-gray-800/10';
};

const CourseCategory = ({ id, title, tags }) => {
  return (
    <Link to={`/category/${id}`} className="block">
      <div className={`${getCardBgColor(id)} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 border border-gray-700/50`}>
        <div className="flex flex-col h-full">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

          {/* Tags/Classes */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags && tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-gray-700/30 text-gray-200 text-sm font-medium hover:bg-gray-600/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Icon in background */}
          <div className="absolute top-6 right-6 opacity-25">
            {getCategoryIcon(id)}
          </div>

          {/* Explore Link */}
          <div className="flex items-center text-gray-300 hover:text-white transition-colors mt-auto">
            <span className="text-sm font-medium">Explore Category</span>
            <FaLongArrowAltRight className="ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCategory; 