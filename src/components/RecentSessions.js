import React from "react";

export const RecentSessions = ({ sessions, currentTheme, deleteSession }) => {
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
  
  // Xác định các lớp dựa trên theme
  const isDarkTheme = currentTheme === "dark";
  const cardClass = isDarkTheme 
    ? "bg-neutral-800 border-neutral-700 text-white hover:shadow-lg transition group" 
    : "bg-white border border-gray-200 hover:shadow-md transition group";
  const noteTextClass = isDarkTheme
    ? "text-sm text-gray-300 mb-3"
    : "text-sm text-gray-600 mb-3";
  const metaTextClass = isDarkTheme
    ? "text-xs text-gray-400"
    : "text-xs text-gray-500";
  
  // Kiểm tra xem deleteSession có phải là hàm không
  const handleDelete = (id) => {
    if (typeof deleteSession === 'function') {
      deleteSession(id);
    } else {
      console.error('deleteSession is not a function');
    }
  };
  
  return (
    <div>
      <h3 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-800'} mb-6`}>Recent Sessions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <div key={session.id} className={`p-4 rounded-xl ${cardClass}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getProjectColor(session.project)} mr-2`}></div>
                <h4 className="font-semibold">{session.name}</h4>
              </div>
              <span className={metaTextClass}>{session.date}</span>
            </div>
            <p className={noteTextClass}>{session.notes}</p>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium ${metaTextClass}`}>{session.pomodoros} pomodoros</span>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                <button className={`text-primary-600 hover:text-primary-700 text-sm`}>
                  View Details
                </button>
                {typeof deleteSession === 'function' && (
                  <button 
                    className="text-red-500 hover:text-red-600 text-sm"
                    onClick={() => handleDelete(session.id)}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};