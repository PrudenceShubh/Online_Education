

import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ProgressDashboard = () => {
  const codingData = [
    { name: "Jan1", solved: 2 },
    { name: "Jan2", solved: 5 },
    { name: "Jan3", solved: 1 },
    { name: "Jan4", solved: 3 },
    { name: "Jan5", solved: 0 },
    { name: "Jan6", solved: 4 },
    { name: "Jan7", solved: 2 },
  ];

  const mcqData = [
    { name: "Jan1", solved: 4 },
    { name: "Jan2", solved: 3 },
    { name: "Jan3", solved: 2 },
    { name: "Jan4", solved: 5 },
    { name: "Jan5", solved: 1 },
    { name: "Jan6", solved: 0 },
    { name: "Jan7", solved: 6 },
  ];

  return (
    <div className="p-6 sm:p-10 bg-gray-900 text-white min-h-screen flex flex-col gap-6">
      {/* Top Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center sm:text-left">
        <h2 className="text-2xl font-bold">Track Your Progress</h2>
        <p className="text-gray-400">Showing daily rank/score for the last 30 days</p>
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
          <div className="bg-gray-700 p-4 rounded-md text-center sm:text-left">Overall Rank: <strong>1</strong></div>
          <div className="bg-gray-700 p-4 rounded-md text-center sm:text-left">Overall Score: <strong>500</strong></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-center">Daily Coding Questions Solved</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={codingData}>
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey="solved" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-center">Daily In-Video MCQs Solved</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mcqData}>
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Line type="monotone" dataKey="solved" stroke="#FF5733" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Chatbot Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg h-80 flex flex-col">
          <h3 className="text-xl font-bold text-center">AI Learning Assistant</h3>
          <p className="text-gray-400 text-center">Summarizing your progress and suggesting lectures to watch.</p>
          <div className="bg-gray-700 p-6 rounded-md mt-4 flex-1 overflow-y-auto max-h-56">
            <p className="text-gray-300">AI: Based on your recent activity, I recommend revisiting Lecture 5 on Data Structures. Your performance shows improvement in algorithms, but you should focus on optimizing problem-solving speed. Additionally, practicing more on dynamic programming could be beneficial.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between bg-gray-800 p-6 rounded-lg shadow-lg gap-4">
        <div className="bg-gray-700 p-4 rounded-md text-center sm:text-left">Lecture Progress: <strong>35/50</strong></div>
        <div className="bg-gray-700 p-4 rounded-md text-center sm:text-left">Problems Solved: <strong>150/200</strong></div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
