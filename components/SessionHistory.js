import React, { useState } from "react";

export const SessionHistory = () => {
  const [activeView, setActiveView] = useState("daily");
  
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Session History</h3>
      <div className="flex mb-4 space-x-2">
        <button 
          className={`py-2 px-4 ${activeView === "daily" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700"} rounded-lg font-medium hover:bg-primary-500 transition`}
          onClick={() => setActiveView("daily")}
        >
          Daily
        </button>
        <button 
          className={`py-2 px-4 ${activeView === "weekly" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700"} rounded-lg font-medium hover:bg-primary-500 transition`}
          onClick={() => setActiveView("weekly")}
        >
          Weekly
        </button>
        <button 
          className={`py-2 px-4 ${activeView === "monthly" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700"} rounded-lg font-medium hover:bg-primary-500 transition`}
          onClick={() => setActiveView("monthly")}
        >
          Monthly
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="h-64 flex items-end justify-between px-4">
          <div className="flex flex-col items-center">
            <div className="flex flex-col h-36">
              <div className="bg-green-400 w-16 h-20 rounded-t-lg" title="Web Development"></div>
              <div className="bg-blue-400 w-16 h-8 " title="Design Tasks"></div>
              <div className="bg-yellow-400 w-16 h-8 rounded-b-lg" title="Study Session"></div>
            </div>
            <span className="mt-2 text-sm text-gray-600">Mon</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col h-48">
              <div className="bg-green-400 w-16 h-24 rounded-t-lg" title="Web Development"></div>
              <div className="bg-yellow-400 w-16 h-16 " title="Study Session"></div>
              <div className="bg-red-400 w-16 h-8 rounded-b-lg" title="Writing"></div>
            </div>
            <span className="mt-2 text-sm text-gray-600">Tue</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col h-28">
              <div className="bg-blue-400 w-16 h-16 rounded-t-lg" title="Design Tasks"></div>
              <div className="bg-yellow-400 w-16 h-12 rounded-b-lg" title="Study Session"></div>
            </div>
            <span className="mt-2 text-sm text-gray-600">Wed</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col h-40">
              <div className="bg-green-400 w-16 h-16 rounded-t-lg" title="Web Development"></div>
              <div className="bg-red-400 w-16 h-24 rounded-b-lg" title="Writing"></div>
            </div>
            <span className="mt-2 text-sm text-gray-600">Thu</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col h-56">
              <div className="bg-green-400 w-16 h-32 rounded-t-lg" title="Web Development"></div>
              <div className="bg-blue-400 w-16 h-16 " title="Design Tasks"></div>
              <div className="bg-yellow-400 w-16 h-8 rounded-b-lg" title="Study Session"></div>
            </div>
            <span className="mt-2 text-sm text-gray-600">Fri</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col h-20">
              <div className="bg-yellow-400 w-16 h-12 rounded-t-lg" title="Study Session"></div>
              <div className="bg-red-400 w-16 h-8 rounded-b-lg" title="Writing"></div>
            </div>
            <span className="mt-2 text-sm text-gray-600">Sat</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col h-32">
              <div className="bg-green-400 w-16 h-16 rounded-t-lg" title="Web Development"></div>
              <div className="bg-blue-400 w-16 h-16 rounded-b-lg" title="Design Tasks"></div>
            </div>
            <span className="mt-2 text-sm text-gray-600">Sun</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm text-gray-600">Web Development</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
              <span className="text-sm text-gray-600">Design Tasks</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
              <span className="text-sm text-gray-600">Study Session</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
              <span className="text-sm text-gray-600">Writing</span>
            </div>
          </div>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            View Detailed Report
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};