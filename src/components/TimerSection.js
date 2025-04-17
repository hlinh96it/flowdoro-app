import React from "react";

export const TimerSection = ({ 
  activeProject,
  timerMode,
  timeLeft,
  isRunning,
  startTimer,
  resetTimer,
  completeTimer,
  handleTimerModeChange,
  sessionName,
  setSessionName,
  sessionNotes,
  setSessionNotes,
  saveSessionNotes,
  currentTheme
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
  
  // Xác định các lớp dựa trên theme
  const isDarkTheme = currentTheme === "dark";
  const bgClass = isDarkTheme ? "bg-neutral-800 text-white" : "bg-gray-50";
  const textClass = isDarkTheme ? "text-white" : "text-gray-800";
  const secondaryTextClass = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const inputBgClass = isDarkTheme ? "bg-neutral-700 border-neutral-600" : "bg-white border-gray-300";
  const inputFocusClass = "focus:ring-2 focus:ring-primary-500 focus:border-primary-500";

  // Tính toán phần trăm thời gian còn lại
  const getTimerPercentage = () => {
    const totalTime = timerMode === "pomodoro" ? 25 * 60 : timerMode === "shortBreak" ? 5 * 60 : 15 * 60;
    return (timeLeft / totalTime) * 100;
  };

  // Tính toán giá trị cho SVG circle
  const percentage = getTimerPercentage();
  
  // Xác định màu cho vòng tròn dựa trên chế độ timer
  const getTimerColor = () => {
    switch(timerMode) {
      case "pomodoro": return isDarkTheme ? "#8B5CF6" : "#8B5CF6"; // primary-500
      case "shortBreak": return isDarkTheme ? "#10B981" : "#10B981"; // green-500
      case "longBreak": return isDarkTheme ? "#3B82F6" : "#3B82F6"; // blue-500
      default: return isDarkTheme ? "#8B5CF6" : "#8B5CF6"; // primary-500
    }
  };

  // Tạo hiệu ứng border gradient cho khung session
  const borderColor = getTimerColor();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div className="relative">
        {/* Border animation container */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: `conic-gradient(${borderColor} ${percentage}%, transparent ${percentage}%)`,
            padding: '3px', // Border thickness
          }}
        >
          <div className="w-full h-full rounded-2xl bg-transparent"></div>
        </div>
        
        {/* Main content */}
        <div className={`${bgClass} rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center relative z-10 m-0.5`}>
          <div className="flex items-center mb-4">
            <div className={`w-4 h-4 rounded-full ${getProjectColor(activeProject)} mr-2`}></div>
            <span className={`text-lg ${secondaryTextClass}`}>{activeProject}</span>
          </div>
          
          <div className={`text-7xl font-bold ${textClass} mt-4 mb-8 tabular-nums`}>{formatTime(timeLeft)}</div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button 
              className={`py-3 px-6 ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-primary-600 hover:bg-primary-500'} text-white rounded-full font-bold transform hover:scale-105 transition shadow-md flex items-center`}
              onClick={startTimer}
            >
              {isRunning ? (
                <>
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 9V15M14 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Start
                </>
              )}
            </button>
            <button 
              className="py-3 px-6 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transform hover:scale-105 transition shadow-sm flex items-center"
              onClick={resetTimer}
            >
              <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4V9H9M4 15V20H9M20 4H15M20 9H15M20 15H15M20 20H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Reset
            </button>
            <button 
              className="py-3 px-6 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transform hover:scale-105 transition shadow-md flex items-center"
              onClick={completeTimer}
            >
              <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Done
            </button>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              className="flex flex-col items-center group"
              onClick={() => handleTimerModeChange("pomodoro")}
            >
              <div className={`h-12 w-12 flex items-center justify-center ${timerMode === "pomodoro" ? "bg-primary-100" : isDarkTheme ? "bg-neutral-700" : "bg-white"} rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition`}>
                <span className="text-lg font-bold text-primary-600">25</span>
              </div>
              <span className={`mt-1 text-sm ${secondaryTextClass}`}>Pomodoro</span>
            </button>
            <button 
              className="flex flex-col items-center group"
              onClick={() => handleTimerModeChange("shortBreak")}
            >
              <div className={`h-12 w-12 flex items-center justify-center ${timerMode === "shortBreak" ? "bg-primary-100" : isDarkTheme ? "bg-neutral-700" : "bg-white"} rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition`}>
                <span className="text-lg font-bold text-primary-600">5</span>
              </div>
              <span className={`mt-1 text-sm ${secondaryTextClass}`}>Short Break</span>
            </button>
            <button 
              className="flex flex-col items-center group"
              onClick={() => handleTimerModeChange("longBreak")}
            >
              <div className={`h-12 w-12 flex items-center justify-center ${timerMode === "longBreak" ? "bg-primary-100" : isDarkTheme ? "bg-neutral-700" : "bg-white"} rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition`}>
                <span className="text-lg font-bold text-primary-600">15</span>
              </div>
              <span className={`mt-1 text-sm ${secondaryTextClass}`}>Long Break</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`${bgClass} rounded-2xl p-6 shadow-sm flex flex-col h-full`}>
        <h3 className={`text-xl font-bold ${textClass} mb-4`}>Session Notes</h3>
        <div className="flex space-x-2 mb-4">
          <input 
            type="text" 
            placeholder="Session name..." 
            className={`flex-grow py-2 px-3 rounded-lg border ${inputBgClass} ${inputFocusClass} transition`}
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
          />
          <button 
            className="py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition flex items-center"
            onClick={saveSessionNotes}
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save
          </button>
        </div>
        <textarea  
          className={`w-full flex-grow p-3 border ${inputBgClass} rounded-lg ${inputFocusClass} transition resize-none`}
          placeholder="Write your thoughts about this session..."
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};