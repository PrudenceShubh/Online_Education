import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesByCategory, categories } from '../data/courseCategories';
import CourseCard from '../components/courseCard';
import { FaStar, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [isCardExpanded, setIsCardExpanded] = useState(true);

  // Find the category details
  const category = categories.find(cat => cat.id === categoryId);

  // Get courses for this category
  const categoryCourses = coursesByCategory[categoryId] || [];

  // Define highlights content (you might fetch this from category data later)
  const categoryHighlights = {
    title: "Category Highlights",
    text: `This section highlights unique features for the ${category?.title || 'selected'} category. Access exclusive live classes, personalized mentorship programs, and advanced problem-solving sessions tailored specifically for ${category?.title || 'these'} aspirants. Our success rate in this category is over 90%!`,
    link: "/enroll",
    linkLabel: "Learn More & Enroll"
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link to="/" className="text-blue-400 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto lg:pr-[calc(theme(width.72)+theme(spacing.8))]">
        <div className="mb-12 text-center">
          <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">
            ← Back to Categories
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{category.title}</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">{category.description}</p>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Courses in {category.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 w-320 gap-6 mb-12">
          {categoryCourses.map((course) => (
            <div key={course.id}>
              <CourseCard
                courseId={course.id}
                name={course.name}
                description={course.description}
                price={course.price}
                image={course.image}
                videos={course.videos}
              />
            </div>
          ))}
        </div>

        {categoryCourses.length === 0 && (
          <div className="text-center py-12 mb-12">
            <p className="text-xl text-gray-400">No courses available in this category yet.</p>
          </div>
        )}

        <div className="p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 mb-12">
          <h2 className="text-2xl font-semibold mb-4">What You'll Learn in {category.title}</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Comprehensive coverage of the syllabus for {category.title}.</li>
            <li>Expert guidance from experienced instructors.</li>
            <li>Regular mock tests and performance analysis.</li>
            <li>Doubt clearing sessions and community support.</li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block lg:fixed lg:top-24 lg:right-8 lg:w-80 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-2" />
            {isCardExpanded && (
              <h2 className="text-xl font-semibold text-white">
                {categoryHighlights.title}
              </h2>
            )}
          </div>
          <button
            onClick={() => setIsCardExpanded(!isCardExpanded)}
            className="text-gray-300 hover:text-gray-100"
          >
            {isCardExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {isCardExpanded && (
          <div className="mt-4">
            <p className="text-gray-300 mb-4">{categoryHighlights.text}</p>
            <Link to={categoryHighlights.link} className="inline-block w-full text-center px-5 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors">
              {categoryHighlights.linkLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;