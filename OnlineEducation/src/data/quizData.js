export const quizData = {
  'html-css-js-basics': {
    'HTML, CSS & JS Full Course': [
      {
        timeStamp: 10,
        questions: [
          {
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Tech Multi Language",
              "Hyperlink and Text Markup Language",
              "Home Tool Markup Language"
            ],
            correct: 0,
            explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages."
          },
          {
            question: "Which HTML element is used to define the main content of a document?",
            options: [
              "<content>",
              "<main>",
              "<section>",
              "<article>"
            ],
            correct: 1,
            explanation: "The <main> element specifies the main content of a document, and there should be only one per page."
          },
          {
            question: "What CSS property is used to change the text color?",
            options: [
              "text-color",
              "font-color",
              "color",
              "text-style"
            ],
            correct: 2,
            explanation: "The 'color' property is used to specify the color of text in CSS."
          },
          {
            question: "How do you select an element with id 'header' in CSS?",
            options: [
              ".header",
              "header",
              "*header",
              "#header"
            ],
            correct: 3,
            explanation: "The hash (#) symbol is used to select elements by their id in CSS."
          }
        ]
      }
    ]
  },
  'react-js-intro': {
    'React JS Course': [
      {
        timeStamp: 10,
        questions: [
          {
            question: "What function is used to create a React component?",
            options: [
              "createComponent()",
              "makeElement()",
              "React.component()",
              "function Component() {}"
            ],
            correct: 3,
            explanation: "We can create a functional component by defining a JavaScript function that returns JSX."
          },
          {
            question: "Which hook is used to manage state in functional components?",
            options: [
              "useStatus",
              "useState",
              "useVariable",
              "useMemory"
            ],
            correct: 1,
            explanation: "The useState hook is used to add state to functional components."
          },
          {
            question: "How do you render a list of items in React?",
            options: [
              "Using a for loop inside JSX",
              "Using the display() method",
              "Using map() to transform array items into JSX",
              "Using the show() function"
            ],
            correct: 2,
            explanation: "The array.map() method is used to transform each item in a data array into JSX elements."
          },
          {
            question: "What syntax is used to include JavaScript expressions in JSX?",
            options: [
              "{{ expression }}",
              "{( expression )}",
              "{% expression %}",
              "{ expression }"
            ],
            correct: 3,
            explanation: "Single curly braces { } are used to embed JavaScript expressions in JSX."
          }
        ]
      }
    ]
  },
  'nodejs-basics': {
    'Node.js Ultimate Beginner\'s Course': [
      {
        timeStamp: 10,
        questions: [
          {
            question: "What command initializes a new Node.js project?",
            options: [
              "node start",
              "node init",
              "npm init",
              "npm create"
            ],
            correct: 2,
            explanation: "The 'npm init' command creates a new Node.js project by generating a package.json file."
          },
          {
            question: "How do you include the HTTP module in Node.js?",
            options: [
              "import http from 'http';",
              "const http = include('http');",
              "const http = require('http');",
              "import('http');"
            ],
            correct: 2,
            explanation: "In CommonJS, we use require() to import modules: const http = require('http');"
          }
        ]
      }
    ]
  },
  'backend-dev': {
    'Backend Web Development Course': [
      {
        timeStamp: 10,
        questions: [
          {
            question: "Which Express.js middleware parses JSON request bodies?",
            options: [
              "express.parseJSON()",
              "express.bodyParser()",
              "express.json()",
              "express.parseBody()"
            ],
            correct: 2,
            explanation: "The express.json() middleware is used to parse incoming request bodies with JSON payload."
          }
        ]
      }
    ]
  },
  'nextjs-intro': {
    'Next.js 14 Crash Course': [
      {
        timeStamp: 10,
        questions: [
          {
            question: "Which folder defines routes in Next.js 14?",
            options: [
              "routes/",
              "pages/",
              "app/",
              "views/"
            ],
            correct: 2,
            explanation: "In Next.js 14's App Router, routes are defined using the app/ directory structure."
          }
        ]
      }
    ]
  },
  
  // Keep the default as a fallback, but make it less likely to be chosen
  "default": {
    "default": [
      {
        timeStamp: 1800, // Set high timestamp so it doesn't show immediately
        questions: [
          {
            question: "Is this course helpful so far?",
            options: [
              "Yes, very helpful!",
              "It's okay",
              "Not really",
              "Too early to tell"
            ],
            correct: 0,
            explanation: "We're glad you're finding it helpful! We strive to provide quality educational content."
          }
        ]
      }
    ]
  }
};
  