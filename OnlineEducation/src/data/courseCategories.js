// Import images for the development category using correct filenames
import htmlCssJsImage from '../assets/courses/webdevelopment/webdev.jpeg';   // Updated filename
import reactImage from '../assets/courses/webdevelopment/react .jpeg';       // Updated filename
import nodejsImage from '../assets/courses/webdevelopment/ndoejs.jpeg';     // Updated filename
import backendImage from '../assets/courses/webdevelopment/backend.jpeg';    // Updated filename
import nextjsImage from '../assets/courses/webdevelopment/next.jpeg';      // Updated filename

// Course categories
export const categories = [
  {
    id: 'development',
    title: 'DEVELOPMENT',
    description: 'Learn web development with certified mentors .',
    tags: ['Frontend', 'Backend', 'react', 'nodejs', 'next'],
    courseCount: 5 // Adjusted count to match the 5 courses added
  },
  {
    id: 'iit-jee',
    title: 'IIT JEE',
    description: 'Expert preparation for IIT-JEE Main and Advanced',
    tags: ['class 11', 'class 12', 'Dropper'],
    courseCount: 4
  },
  {
    id: 'school',
    title: 'School Preparation',
    description: 'Complete school curriculum and exam preparation',
    tags: ['class 6', 'class 7', 'class 8', 'More'],
    courseCount: 8
  },
  {
    id: 'upsc',
    title: 'UPSC',
    description: 'Comprehensive preparation for UPSC Civil Services',
    tags: [],
    courseCount: 6
  },
  {
    id: 'govt-jobs',
    title: 'Govt Job Exams',
    description: 'Preparation for various government job examinations',
    tags: ['SSC', 'Banking', 'Teaching', 'Judiciary'],
    courseCount: 10
  },
  {
    id: 'defence',
    title: 'Defence',
    description: 'Preparation for defence services examinations',
    tags: ['NDA', 'CDS', 'AFCAT', 'Agniveer'],
    courseCount: 4
  }
];

// Reorganized courses by category
export const coursesByCategory = {
  'neet': [
    {
      id: 'neet-physics',
      name: "NEET Physics Complete Course",
      description: "Comprehensive physics preparation for NEET examination",
      price: "9999",
      image: "/placeholder-image.jpg",
      videos: [
        {
          title: "Introduction to NEET Physics",
          url: "https://youtu.be/-lFAIxq8kaY",
          duration: "10:00"
        },
        {
          title: "Mechanics Basics",
          url: "https://www.youtube.com/embed/mU6anWqZJcc",
          duration: "15:00"
        },
        {
          title: "Thermodynamics",
          url: "https://www.youtube.com/embed/PkZNo7MFNFg",
          duration: "20:00"
        }
      ]
    }
  ],
  'iit-jee': [
    {
      id: 'jee-mathematics',
      name: "JEE Mathematics Complete Course",
      description: "In-depth mathematics preparation for IIT-JEE",
      price: "9999",
      image: "/placeholder-image.jpg",
      videos: [
        {
          title: "Introduction to JEE Mathematics",
          url: "https://youtu.be/-lFAIxq8kaY",
          duration: "10:00"
        },
        {
          title: "Calculus Fundamentals",
          url: "https://www.youtube.com/embed/mU6anWqZJcc",
          duration: "15:00"
        },
        {
          title: "Algebra Concepts",
          url: "https://www.youtube.com/embed/PkZNo7MFNFg",
          duration: "20:00"
        }
      ]
    }
  ],
  'school': [
    {
      id: 'class-8-math',
      name: "Class 8 Mathematics",
      description: "Complete mathematics course for class 8 students",
      price: "4999",
      image: "/placeholder-image.jpg",
      videos: [
        {
          title: "Introduction to Algebra",
          url: "https://youtu.be/-lFAIxq8kaY",
          duration: "10:00"
        },
        {
          title: "Geometry Basics",
          url: "https://www.youtube.com/embed/mU6anWqZJcc",
          duration: "15:00"
        },
        {
          title: "Number Systems",
          url: "https://www.youtube.com/embed/PkZNo7MFNFg",
          duration: "20:00"
        }
      ]
    }
  ],
  'upsc': [
    {
      id: 'upsc-gs',
      name: "UPSC General Studies",
      description: "Comprehensive general studies preparation for UPSC",
      price: "12999",
      image: "/placeholder-image.jpg",
      videos: [
        {
          title: "Introduction to UPSC GS",
          url: "https://youtu.be/-lFAIxq8kaY",
          duration: "10:00"
        },
        {
          title: "Indian History",
          url: "https://www.youtube.com/embed/mU6anWqZJcc",
          duration: "15:00"
        },
        {
          title: "Indian Polity",
          url: "https://www.youtube.com/embed/PkZNo7MFNFg",
          duration: "20:00"
        }
      ]
    }
  ],
  'govt-jobs': [
    {
      id: 'ssc-complete',
      name: "SSC Complete Course",
      description: "Complete preparation for SSC examinations",
      price: "7999",
      image: "/placeholder-image.jpg",
      videos: [
        {
          title: "SSC Exam Overview",
          url: "https://youtu.be/-lFAIxq8kaY",
          duration: "10:00"
        },
        {
          title: "Quantitative Aptitude",
          url: "https://www.youtube.com/embed/mU6anWqZJcc",
          duration: "15:00"
        },
        {
          title: "English Language",
          url: "https://www.youtube.com/embed/PkZNo7MFNFg",
          duration: "20:00"
        }
      ]
    }
  ],
  'defence': [
    {
      id: 'nda-complete',
      name: "NDA Complete Course",
      description: "Comprehensive preparation for NDA examination",
      price: "8999",
      image: "/placeholder-image.jpg",
      videos: [
        {
          title: "NDA Exam Overview",
          url: "https://youtu.be/-lFAIxq8kaY",
          duration: "10:00"
        },
        {
          title: "Mathematics",
          url: "https://www.youtube.com/embed/mU6anWqZJcc",
          duration: "15:00"
        },
        {
          title: "General Ability Test",
          url: "https://www.youtube.com/embed/PkZNo7MFNFg",
          duration: "20:00"
        }
      ]
    }
  ],
  'development': [
    {
      id: 'html-css-js-basics',
      name: "HTML, CSS & JavaScript Basics",
      description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
      price: "4999",
      image: htmlCssJsImage, // Uses the imported variable
      videos: [
        { title: "HTML, CSS & JS Full Course", url: "https://youtu.be/HcOc7P5BMi4", duration: "N/A" },
      ]
    },
    {
      id: 'react-js-intro',
      name: "React JS Introduction",
      description: "Get started with React JS for building modern user interfaces.",
      price: "6999",
      image: reactImage, // Uses the imported variable
      videos: [
        { title: "React JS Course", url: "https://youtu.be/-mJFZp84TIY", duration: "N/A" },
      ]
    },
    {
      id: 'nodejs-basics',
      name: "Node.js Basics",
      description: "Learn the fundamentals of Node.js for backend development.",
      price: "7999",
      image: nodejsImage, // Uses the imported variable
      videos: [
        { title: "Node.js Ultimate Beginner's Course", url: "https://youtu.be/BLl32FvcdVM", duration: "N/A" },
      ]
    },
    {
      id: 'backend-dev',
      name: "Backend Development Concepts",
      description: "Understand core concepts of backend web development.",
      price: "7999",
      image: backendImage, // Uses the imported variable
      videos: [
        { title: "Backend Web Development Course", url: "https://youtu.be/EH3vGeqeIAo", duration: "N/A" },
      ]
    },
    {
      id: 'nextjs-intro',
      name: "Next.js Introduction",
      description: "Build server-rendered React applications with Next.js.",
      price: "8999",
      image: nextjsImage, // Uses the imported variable
      videos: [
        { title: "Next.js 14 Crash Course", url: "https://youtu.be/AR6eQCi_Me4", duration: "N/A" },
      ]
    }
  ]
};

// Flattened courses array for backward compatibility
export const courses = Object.values(coursesByCategory).flat(); 