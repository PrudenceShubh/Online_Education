import React from "react";
import CourseCard from "./courseCard";
import webdevImage from '../assets/courses/logo1.png'; // Use your actual image paths

// Export the courses array
export const courses = [
  {
    id: 'web-Site',
    name: "Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript & React with hands-on projects",
    price: "9999",
    image: webdevImage,
    videos: [
      {
        title: "Introduction to Web Development",
        url: "https://youtu.be/-lFAIxq8kaY?si=LyOs66dR9fxXNQTt",
        duration: "10:00"
      },
      {
        title: "HTML & CSS Basics",
        url: "https://www.youtube.com/embed/mU6anWqZJcc",
        duration: "15:00"
      },
      {
        title: "JavaScript Fundamentals",
        url: "https://www.youtube.com/embed/PkZNo7MFNFg",
        duration: "20:00"
      }
    ]
  },
  {
    id: 'web-development',
    name: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build your own websites.",
    price: 49.99,
    image: webdevImage,
    videos: [
      { title: "Introduction to HTML", url: "https://example.com/html-intro", duration: "12:30" },
      { title: "CSS Styling Basics", url: "https://example.com/css-basics", duration: "18:45" },
      { title: "JavaScript Fundamentals", url: "https://example.com/js-basics", duration: "25:00" },
    ],
  },
  {
    id: 'data-science',
    name: "Data Science with Python",
    description: "Explore data analysis and machine learning using Python and popular libraries.",
    price: 79.99,
    image: webdevImage, // Same image name
    videos: [
      { title: "Python for Data Analysis", url: "https://example.com/python-data", duration: "20:15" },
      { title: "Introduction to Pandas", url: "https://example.com/pandas-intro", duration: "15:30" },
      { title: "Machine Learning with Scikit-learn", url: "https://example.com/ml-sklearn", duration: "30:00" },
    ],
  },
  {
    id: 'mobile-development',
    name: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps using React Native and JavaScript.",
    price: 69.99,
    image: webdevImage,
    videos: [
      { title: "React Native Setup", url: "https://example.com/rn-setup", duration: "14:00" },
      { title: "Building UI Components", url: "https://example.com/rn-ui", duration: "22:00" },
      { title: "Navigation and APIs", url: "https://example.com/rn-api", duration: "28:00" },
    ],
  },
  {
    id: 'cloud-computing',
    name: "Cloud Computing Fundamentals",
    description: "Dive into cloud computing concepts and services with AWS.",
    price: 89.99,
    image: webdevImage,
    videos: [
        { title: "Introduction to AWS", url: "https://example.com/aws-intro", duration: "25:00" },
        { title: "EC2 and S3 Basics", url: "https://example.com/aws-ec2-s3", duration: "30:00" },
        { title: "Serverless Computing", url: "https://example.com/aws-serverless", duration: "28:00" },
    ],
  },
  {
    id: 'digital-marketing',
    name: "Digital Marketing Strategies",
    description: "Master digital marketing techniques and strategies for online success.",
    price: 64.99,
    image: webdevImage,
    videos: [
        { title: "SEO Fundamentals", url: "https://example.com/digital-seo", duration: "22:00" },
        { title: "Social Media Marketing", url: "https://example.com/digital-social", duration: "26:00" },
        { title: "Email Marketing Campaigns", url: "https://example.com/digital-email", duration: "24:00" },
    ],
  },
  {
    id: 'graphic-design',
    name: "Graphic Design Essentials",
    description: "Learn the principles of graphic design and create stunning visuals.",
    price: 59.99,
    image: webdevImage,
    videos: [
      { title: "Design Principles", url: "https://example.com/design-principles", duration: "16:45" },
      { title: "Adobe Photoshop Basics", url: "https://example.com/photoshop-basics", duration: "24:00" },
      { title: "Typography and Layout", url: "https://example.com/typography-layout", duration: "19:30" },
    ],
  },
];

const CourseList = ({ showAll }) => {
  const displayedCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <div className="container justify-center mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 justify-items-center">
      {displayedCourses.map((course) => (
        <CourseCard
          key={course.id}
          courseId={course.id}
          name={course.name}
          description={course.description}
          price={course.price}
          image={course.image}
          videos={course.videos}
        />
      ))}
    </div>
  );
};

export default CourseList;
