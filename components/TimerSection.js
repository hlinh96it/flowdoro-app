import React from "react";

export const TimerSection = ({ 
  activeProject,
  timerMode,
  timeLeft,
  isRunning,
  startTimer,
  resetTimer,
  handleTimerModeChange,
  sessionName,
  setSessionName,
  sessionNotes,
  setSessionNotes,
  saveSessionNotes
}) => {
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div className="bg-gray-50 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center">
        <div className="flex items-center mb-4">
          <div className={`w-4 h-4 rounded-full ${getProjectColor(activeProject)} mr-2`}></div>
          <span className="text-lg text-gray-700">{activeProject}</span>
        </div>
        <div className="text-7xl font-bold text-gray-800 mt-4 mb-8 tabular-nums">{formatTime(timeLeft)}</div>
        <div className="flex space-x-3">
          <button 
            className="py-3 px-8 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-500 transform hover:scale-105 transition shadow-md"
            onClick={isRunning ? resetTimer : startTimer}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button 
            className="py-3 px-8 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transform hover:scale-105 transition shadow-sm"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button 
            className="flex flex-col items-center group"
            onClick={() => handleTimerModeChange("pomodoro")}
          >
            <div className={`h-12 w-12 flex items-center justify-center ${timerMode === "pomodoro" ? "bg-primary-100" : "bg-white"} rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition`}>
              <span className="text-lg font-bold text-primary-600">25</span>
            </div>
            <span className="mt-1 text-sm text-gray-600">Pomodoro</span>
          </button>
          <button 
            className="flex flex-col items-center group"
            onClick={() => handleTimerModeChange("shortBreak")}
          >
            <div className={`h-12 w-12 flex items-center justify-center ${timerMode === "shortBreak" ? "bg-primary-100" : "bg-white"} rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition`}>
              <span className="text-lg font-bold text-primary-600">5</span>
            </div>
            <span className="mt-1 text-sm text-gray-600">Short Break</span>
          </button>
          <button 
            className="flex flex-col items-center group"
            onClick={() => handleTimerModeChange("longBreak")}
          >
            <div className={`h-12 w-12 flex items-center justify-center ${timerMode === "longBreak" ? "bg-primary-100" : "bg-white"} rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition`}>
              <span className="text-lg font-bold text-primary-600">15</span>
            </div>
            <span className="mt-1 text-sm text-gray-600">Long Break</span>
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Session Notes</h3>
        <div className="flex space-x-2 mb-4">
          <input 
            type="text" 
            placeholder="Session name..." 
            className="flex-grow py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
          />
          <button 
            className="py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition"
            onClick={saveSessionNotes}
          >
            Save
          </button>
        </div>
        <textarea  
          className="w-full h-36 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
          placeholder="Write your thoughts about this session..."
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-between">
          <span className="text-sm text-gray-500">Last saved: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-200 transition">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-200 transition">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};