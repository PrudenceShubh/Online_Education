export const quizData = {
    'web-Site': {
      'Introduction to Web Development': [
        {
          timeStamp: 10,
          questions: [
            {
              question: "What is the role of HTML in web development?",
              options: [
                "Styling web pages",
                "Creating page structure",
                "Server-side processing",
                "Database management"
              ],
              correct: 1,
              explanation: "HTML is the foundation of web pages, providing the basic structure and content."
            },
            {
              question: "Which of the following is NOT a common web development language?",
              options: [
                "JavaScript",
                "Python",
                "Java",
                "COBOL"
              ],
              correct: 3,
              explanation: "COBOL is an older programming language primarily used in business applications, not web development."
            },
            {
              question: "What does CSS stand for?",
              options: [
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Creative Style System",
                "Content Styling Service"
              ],
              correct: 1,
              explanation: "CSS stands for Cascading Style Sheets, which is used for styling HTML elements."
            }
          ]
        }
      ],
      'HTML & CSS Basics': [
        {
          timeStamp: 10,
          questions: [
            {
              question: "What is CSS used for in web development?",
              options: [
                "Database queries",
                "Styling and layout",
                "Server operations",
                "User authentication"
              ],
              correct: 1,
              explanation: "CSS is used to style and layout web pages, controlling their visual appearance."
            },
            {
              question: "Which HTML tag is used for creating a hyperlink?",
              options: [
                "<link>",
                "<a>",
                "<href>",
                "<url>"
              ],
              correct: 1,
              explanation: "The <a> tag is used to create hyperlinks in HTML, with the href attribute specifying the URL."
            },
            {
              question: "What is the box model in CSS?",
              options: [
                "A way to create 3D boxes",
                "A layout system with margin, border, padding, and content",
                "A method for organizing code",
                "A technique for responsive design"
              ],
              correct: 1,
              explanation: "The CSS box model consists of margin, border, padding, and content, which together form the layout of elements."
            }
          ]
        }
      ],
      'JavaScript Fundamentals': [
        {
          timeStamp: 10,
          questions: [
            {
              question: "What can JavaScript do in a web page?",
              options: [
                "Only styling",
                "Add interactivity",
                "Create databases",
                "Host websites"
              ],
              correct: 1,
              explanation: "JavaScript adds interactivity to web pages, allowing dynamic content updates and user interactions."
            },
            {
              question: "Which of the following is a JavaScript data type?",
              options: [
                "Float",
                "Integer",
                "Boolean",
                "Character"
              ],
              correct: 2,
              explanation: "Boolean is a JavaScript data type that can have two values: true or false."
            },
            {
              question: "What is the purpose of the 'this' keyword in JavaScript?",
              options: [
                "To refer to the current HTML element",
                "To create a new instance of a class",
                "To refer to the current object context",
                "To import external modules"
              ],
              correct: 2,
              explanation: "The 'this' keyword refers to the current object context in JavaScript, which can vary depending on how a function is called."
            }
          ]
        }
      ]
    },
    'data-science': {
      'Python for Data Analysis': [
        {
          timeStamp: 10,
          questions: [
            {
              question: "Which Python library is essential for data analysis?",
              options: [
                "Django",
                "Pandas",
                "Flask",
                "React"
              ],
              correct: 1,
              explanation: "Pandas is a powerful library for data manipulation and analysis in Python."
            },
            {
              question: "What is a DataFrame in Pandas?",
              options: [
                "A web framework",
                "A 2D data structure",
                "A JavaScript library",
                "A database system"
              ],
              correct: 1,
              explanation: "A DataFrame is a 2D data structure in Pandas for data manipulation."
            },
            {
              question: "Which of the following is NOT a common data visualization library in Python?",
              options: [
                "Matplotlib",
                "Seaborn",
                "Plotly",
                "D3.js"
              ],
              correct: 3,
              explanation: "D3.js is a JavaScript library for data visualization, not a Python library."
            }
          ]
        }
      ],
      'Introduction to Pandas': [
        {
          timeStamp: 150,
          questions: [
            {
              question: "What is a Series in Pandas?",
              options: [
                "A collection of DataFrames",
                "A 1D labeled array",
                "A database table",
                "A data visualization"
              ],
              correct: 1,
              explanation: "A Series is a 1D labeled array in Pandas that can hold data of any type."
            },
            {
              question: "How do you select a column in a Pandas DataFrame?",
              options: [
                "df.select('column_name')",
                "df['column_name']",
                "df.get_column('column_name')",
                "df.column('column_name')"
              ],
              correct: 1,
              explanation: "You can select a column in a Pandas DataFrame using square bracket notation: df['column_name']."
            },
            {
              question: "What is the purpose of the 'groupby' function in Pandas?",
              options: [
                "To combine multiple DataFrames",
                "To sort data by a specific column",
                "To group data by one or more keys",
                "To filter data based on conditions"
              ],
              correct: 2,
              explanation: "The 'groupby' function in Pandas is used to group data by one or more keys, allowing for aggregated operations on each group."
            }
          ]
        }
      ],
      'Machine Learning with Scikit-learn': [
        {
          timeStamp: 200,
          questions: [
            {
              question: "What type of tasks can Scikit-learn perform?",
              options: [
                "Only classification",
                "Only regression",
                "Both classification and regression",
                "Neither classification nor regression"
              ],
              correct: 2,
              explanation: "Scikit-learn can perform both classification and regression tasks, as well as clustering, dimensionality reduction, and more."
            },
            {
              question: "What is the purpose of train_test_split in Scikit-learn?",
              options: [
                "To combine training and testing data",
                "To split data into training and testing sets",
                "To train multiple models simultaneously",
                "To test multiple models simultaneously"
              ],
              correct: 1,
              explanation: "train_test_split is used to split data into training and testing sets, which is essential for evaluating model performance."
            },
            {
              question: "Which of the following is NOT a common evaluation metric for classification models?",
              options: [
                "Accuracy",
                "Precision",
                "Mean Squared Error",
                "F1 Score"
              ],
              correct: 2,
              explanation: "Mean Squared Error is typically used for regression tasks, not classification tasks."
            }
          ]
        }
      ]
    },
    'mobile-development': {
      'React Native Setup': [
        {
          timeStamp: 180,
          questions: [
            {
              question: "What is React Native used for?",
              options: [
                "Web development",
                "Mobile app development",
                "Desktop apps",
                "System programming"
              ],
              correct: 1,
              explanation: "React Native is used to build native mobile applications for iOS and Android."
            }
          ]
        }
      ],
      'Building UI Components': [
        {
          timeStamp: 150,
          questions: [
            {
              question: "What is a component in React Native?",
              options: [
                "A database table",
                "A reusable UI element",
                "A server function",
                "A network protocol"
              ],
              correct: 1,
              explanation: "Components are reusable UI elements that make up the interface of a React Native app."
            }
          ]
        }
      ],
      'Navigation and APIs': [
        {
          timeStamp: 200,
          questions: [
            {
              question: "What is the purpose of navigation in mobile apps?",
              options: [
                "Data storage",
                "Moving between screens",
                "Server communication",
                "App styling"
              ],
              correct: 1,
              explanation: "Navigation allows users to move between different screens in a mobile app."
            }
          ]
        }
      ]
    }
  };
  