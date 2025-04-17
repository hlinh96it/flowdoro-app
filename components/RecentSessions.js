import React from "react";

export const RecentSessions = ({ sessions }) => {
  // Get project color
  const getProjectColor = (projectName) => {
    const colorMap = {
      "Web Development": "bg-green-400",
      "Design Tasks": "bg-blue-400",
      "Study Session": "bg-yellow-400",
      "Writing": "bg-red-400"
    };
    
    return colorMap[projectName] || "bg-purple-400";
  };
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Sessions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getProjectColor(session.project)} mr-2`}></div>
                <h4 className="font-semibold">{session.name}</h4>
              </div>
              <span className="text-xs text-gray-500">{session.date}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{session.notes}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">{session.pomodoros} pomodoros</span>
              <button className="opacity-0 group-hover:opacity-100 text-primary-600 hover:text-primary-700 text-sm transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};