import React from "react";
import userimg from '../assets/WhatsApp Image 2024-02-29 at 22.30.15_cb242efd.jpg'

const AccountPage = () => {
  return (
    <div className="p-6 sm:p-10 bg-gray-900 text-white min-h-screen flex flex-col gap-6">
      {/* User Profile Section */}
      <div className="flex flex-col md:flex-row w-full items-center gap-4">
        <div className="bg-gray-800 w-full md:w-2/5 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-center gap-4">
          <img
            src={userimg}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-600"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">Shubham Kumar</h2>
            <p className="text-sm sm:text-xl p-3 text-gray-400">shubham@gmail.com</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-gray-800 p-6 w-full md:w-3/5 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-md">Courses Enrolled: <strong>5</strong></div>
          <div className="bg-gray-700 p-4 rounded-md">Completed Courses: <strong>3</strong></div>
          <div className="bg-gray-700 p-4 rounded-md">Learning Streak: <strong>7 Days</strong></div>
          <div className="bg-gray-700 p-4 rounded-md">Overall Score: <strong>1200</strong></div>
        </div>
      </div>

      {/* Course History */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Course History</h3>
        <ul className="mt-2">
          <li className="bg-gray-700 p-3 rounded-md mb-2">React Basics - <span className="text-green-400">Completed</span></li>
          <li className="bg-gray-700 p-3 rounded-md mb-2">Advanced JavaScript - <span className="text-yellow-400">In Progress</span></li>
          <li className="bg-gray-700 p-3 rounded-md mb-2">MongoDB Fundamentals - <span className="text-red-400">Not Started</span></li>
        </ul>
      </div>

      {/* Achievements & Badges */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Achievements & Badges</h3>
        <div className="mt-4 flex flex-wrap gap-4">
          <span className="bg-yellow-500 px-4 py-2 rounded-md">Gold Learner</span>
          <span className="bg-blue-500 px-4 py-2 rounded-md">Top Scorer</span>
        </div>
      </div>

      {/* Settings & Preferences */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Settings</h3>
        <button className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
