import React, { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import { FaTrophy, FaMedal, FaStar, FaChartLine, FaBook, FaCode, FaQuestionCircle, FaCalendarAlt, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const ProgressDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("week");

  // Sample data - in a real app, this would come from an API
  const codingData = [
    { name: "Jan1", solved: 2, difficulty: "easy" },
    { name: "Jan2", solved: 5, difficulty: "medium" },
    { name: "Jan3", solved: 1, difficulty: "hard" },
    { name: "Jan4", solved: 3, difficulty: "easy" },
    { name: "Jan5", solved: 0, difficulty: "medium" },
    { name: "Jan6", solved: 4, difficulty: "easy" },
    { name: "Jan7", solved: 2, difficulty: "hard" },
  ];

  const mcqData = [
    { name: "Jan1", solved: 4, correct: 3 },
    { name: "Jan2", solved: 3, correct: 2 },
    { name: "Jan3", solved: 2, correct: 1 },
    { name: "Jan4", solved: 5, correct: 4 },
    { name: "Jan5", solved: 1, correct: 1 },
    { name: "Jan6", solved: 0, correct: 0 },
    { name: "Jan6", solved: 6, correct: 5 },
  ];

  const skillData = [
    { name: "JavaScript", value: 85 },
    { name: "React", value: 70 },
    { name: "Node.js", value: 60 },
    { name: "Python", value: 45 },
    { name: "Data Structures", value: 80 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const courses = [
    { id: "js101", name: "JavaScript Fundamentals", progress: 75, lastAccessed: "2 days ago" },
    { id: "react101", name: "React for Beginners", progress: 45, lastAccessed: "1 day ago" },
    { id: "node101", name: "Node.js Backend", progress: 30, lastAccessed: "3 days ago" },
    { id: "ds101", name: "Data Structures", progress: 90, lastAccessed: "Today" },
  ];

  const achievements = [
    { id: 1, name: "First Quiz Completed", icon: <FaTrophy className="text-yellow-500" />, earned: "2 days ago" },
    { id: 2, name: "5 Day Streak", icon: <FaMedal className="text-blue-500" />, earned: "Yesterday" },
    { id: 3, name: "Perfect Score", icon: <FaStar className="text-purple-500" />, earned: "3 days ago" },
    { id: 4, name: "Course Completed", icon: <FaCheckCircle className="text-green-500" />, earned: "1 week ago" },
  ];

  const upcomingTasks = [
    { id: 1, title: "Complete React Hooks Module", due: "Tomorrow", priority: "high" },
    { id: 2, title: "Practice Array Methods", due: "In 2 days", priority: "medium" },
    { id: 3, title: "Review Promises", due: "In 3 days", priority: "low" },
  ];

  // Calculate statistics
  const totalProblemsSolved = codingData.reduce((sum, item) => sum + item.solved, 0);
  const totalMCQsSolved = mcqData.reduce((sum, item) => sum + item.solved, 0);
  const totalMCQsCorrect = mcqData.reduce((sum, item) => sum + item.correct, 0);
  const mcqAccuracy = totalMCQsSolved > 0 ? Math.round((totalMCQsCorrect / totalMCQsSolved) * 100) : 0;
  const averageProblemsPerDay = Math.round((totalProblemsSolved / codingData.length) * 10) / 10;
  const streakDays = 5; // This would be calculated in a real app

  return (
    <div className="p-6 sm:p-10 bg-gray-900 text-white min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Learning Dashboard</h1>
        <p className="text-gray-400">Track your progress, achievements, and upcoming tasks</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-2">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-t-lg ${activeTab === "overview" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 rounded-t-lg ${activeTab === "courses" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          Courses
        </button>
        <button 
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 rounded-t-lg ${activeTab === "skills" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          Skills
        </button>
        <button 
          onClick={() => setActiveTab("achievements")}
          className={`px-4 py-2 rounded-t-lg ${activeTab === "achievements" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          Achievements
        </button>
        <button 
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 rounded-t-lg ${activeTab === "tasks" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          Tasks
        </button>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="bg-gray-800 rounded-lg p-1 flex">
          <button 
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1 rounded-md ${timeRange === "week" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1 rounded-md ${timeRange === "month" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          >
            Month
          </button>
          <button 
            onClick={() => setTimeRange("year")}
            className={`px-3 py-1 rounded-md ${timeRange === "year" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Problems Solved</p>
                  <h3 className="text-2xl font-bold">{totalProblemsSolved}</h3>
                </div>
                <div className="bg-blue-600 p-3 rounded-full">
                  <FaCode className="text-xl" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                {averageProblemsPerDay} per day
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Quiz Accuracy</p>
                  <h3 className="text-2xl font-bold">{mcqAccuracy}%</h3>
                </div>
                <div className="bg-green-600 p-3 rounded-full">
                  <FaQuestionCircle className="text-xl" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                {totalMCQsCorrect} of {totalMCQsSolved} correct
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Learning Streak</p>
                  <h3 className="text-2xl font-bold">{streakDays} days</h3>
                </div>
                <div className="bg-yellow-600 p-3 rounded-full">
                  <FaCalendarAlt className="text-xl" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Keep it up!
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Time Spent</p>
                  <h3 className="text-2xl font-bold">12.5 hrs</h3>
                </div>
                <div className="bg-purple-600 p-3 rounded-full">
                  <FaClock className="text-xl" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                This week
              </div>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Coding Problems Solved</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={codingData}>
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Bar dataKey="solved" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Quiz Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mcqData}>
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Area type="monotone" dataKey="solved" stroke="#FF5733" fill="#FF5733" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="correct" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4 space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#FF5733] rounded-full mr-2"></div>
                  <span className="text-sm">Attempted</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#4CAF50] rounded-full mr-2"></div>
                  <span className="text-sm">Correct</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Learning Assistant */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">AI Learning Assistant</h3>
              <div className="bg-blue-600 p-2 rounded-full">
                <FaChartLine className="text-lg" />
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300 mb-4">
                Based on your recent activity, I recommend focusing on these areas:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Your JavaScript fundamentals are strong. Consider advancing to more complex topics.</span>
                </li>
                <li className="flex items-start">
                  <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <span>You're struggling with React Hooks. I recommend revisiting the useState and useEffect tutorials.</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Your problem-solving skills have improved by 15% this week. Keep practicing!</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-600">
                <p className="text-gray-300">
                  <strong>Recommended Next Steps:</strong> Complete the "Advanced React Patterns" module and practice at least 3 coding problems daily.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Your Courses</h3>
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{course.name}</h4>
                    <span className="text-sm text-gray-400">Last accessed: {course.lastAccessed}</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{course.progress}% complete</span>
                    <button className="text-blue-400 hover:text-blue-300">Continue Learning</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Skill Proficiency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Skill Breakdown</h3>
              <div className="space-y-4">
                {skillData.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ width: `${skill.value}%`, backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Your Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2 flex justify-center">
                    {achievement.icon}
                  </div>
                  <h4 className="font-semibold mb-1">{achievement.name}</h4>
                  <p className="text-sm text-gray-400">Earned {achievement.earned}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Upcoming Achievements</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-600 p-3 rounded-full mr-4">
                    <FaTrophy className="text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">10 Day Streak</h4>
                    <p className="text-sm text-gray-400">Learn for 10 consecutive days</p>
                    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">5/10 days completed</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-600 p-3 rounded-full mr-4">
                    <FaMedal className="text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Problem Solver</h4>
                    <p className="text-sm text-gray-400">Solve 50 coding problems</p>
                    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">15/50 problems solved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Upcoming Tasks</h3>
            <div className="space-y-4">
              {upcomingTasks.map(task => (
                <div key={task.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-sm text-gray-400">Due {task.due}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      task.priority === 'high' ? 'bg-red-600' : 
                      task.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Task Title</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;
