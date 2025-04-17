import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { TimerSection } from "./TimerSection";
import { SessionHistory } from "./SessionHistory";
import { RecentSessions } from "./RecentSessions";
import { SettingsModal } from "./SettingsModal";

export const PomodoroApp = () => {
  const [activeProject, setActiveProject] = useState("Web Development");
  const [timerMode, setTimerMode] = useState("pomodoro"); // pomodoro, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light"); // light, dark, purple, blue, green
  
  // Timer durations in seconds
  const timerDurations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };
  
  // Thêm hàm completeTimer vào PomodoroApp.js
  const completeTimer = () => {
    // Tính toán thời gian đã sử dụng
    const timeUsed = timerDurations[timerMode] - timeLeft;
    const minutesUsed = Math.ceil(timeUsed / 60); // Làm tròn lên số phút đã sử dụng
    
    // Lưu phiên làm việc với số pomodoro dựa trên thời gian đã sử dụng
    const newSession = {
      id: sessions.length + 1,
      project: activeProject,
      name: sessionName || `${activeProject} Session`,
      notes: sessionNotes,
      date: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'short',
        day: 'numeric'
      }),
      pomodoros: Math.max(1, Math.ceil(minutesUsed / 25)) // Ít nhất 1 pomodoro, hoặc tính theo thời gian đã dùng
    };
    
    setSessions([newSession, ...sessions]);
    
    // Reset các trạng thái
    setIsRunning(false);
    setTimeLeft(timerDurations[timerMode]); // Reset thời gian về ban đầu
    setSessionName("");
    setSessionNotes("");
  };
  
  // Delete session
  const deleteSession = (sessionId) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };
  
  const [sessions, setSessions] = useState([
    {
      id: 1,
      project: "Web Development",
      name: "API Integration",
      notes: "Completed the authentication flow and started working on data fetching.",
      date: "Today, 10:15 AM",
      pomodoros: 4
    },
    {
      id: 2,
      project: "Design Tasks",
      name: "Dashboard UI",
      notes: "Designed the chart components and fixed responsive layout issues.",
      date: "Today, 8:30 AM",
      pomodoros: 3
    },
    {
      id: 3,
      project: "Study Session",
      name: "React Hooks",
      notes: "Studied useContext and useReducer hooks for state management.",
      date: "Yesterday, 4:45 PM",
      pomodoros: 2
    }
  ]);

  const timerRef = useRef(null);

  // Handle timer mode change
  const handleTimerModeChange = (mode) => {
    setTimerMode(mode);
    setTimeLeft(timerDurations[mode]);
    setIsRunning(false);
  };

  // Start/Pause timer
  const toggleTimer = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerDurations[timerMode]);
  };

  // Save session notes
  const saveSessionNotes = () => {
    const newSession = {
      id: sessions.length + 1,
      project: activeProject,
      name: sessionName || `${activeProject} Session`,
      notes: sessionNotes,
      date: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'short',
        day: 'numeric'
      }),
      pomodoros: 1
    };

    setSessions([newSession, ...sessions]);
    setSessionName("");
    setSessionNotes("");
  };

  // Get theme classes
  const getThemeClasses = () => {
    const themeClasses = {
      light: "bg-gradient-to-br from-blue-50 to-purple-50",
      dark: "bg-gradient-to-br from-neutral-900 to-neutral-800 text-white",
      purple: "bg-gradient-to-br from-purple-100 to-indigo-100",
      blue: "bg-gradient-to-br from-blue-100 to-cyan-100",
      green: "bg-gradient-to-br from-green-50 to-emerald-100",
    };

    return themeClasses[currentTheme] || themeClasses.light;
  };

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            // Play notification sound or show notification
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div id="webcrumbs" className={`min-h-screen font-sans ${getThemeClasses()}`}>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Sidebar */}
        <Sidebar
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          currentTheme={currentTheme}
        />

        {/* Main Content */}
        <div className="lg:col-span-4 p-6 lg:p-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Current Session</h2>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                className="py-2 px-4 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200 transition flex items-center"
                onClick={() => setIsSettingsOpen(true)}
              >
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Settings
              </button>
              <details className="relative">
                <summary className="py-2 px-4 bg-primary-100 text-primary-700 rounded-lg font-medium cursor-pointer flex items-center hover:bg-primary-200 transition">
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Help
                </summary>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10 text-sm text-gray-700">
                  <h3 className="font-bold text-base mb-2">Pomodoro Technique</h3>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Work for 25 minutes</li>
                    <li>Take a 5-minute break</li>
                    <li>After 4 pomodoros, take a longer 15-30 minute break</li>
                  </ol>
                </div>
              </details>
              <button
                className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center"
                onClick={() => {
                  resetTimer();
                  setSessionName("");
                  setSessionNotes("");
                }}
              >
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                New Session
              </button>
            </div>
          </div>

          {/* Timer Section */}
          <TimerSection
            activeProject={activeProject}
            timerMode={timerMode}
            timeLeft={timeLeft}
            isRunning={isRunning}
            startTimer={toggleTimer}  // Đổi tên từ startTimer thành toggleTimer
            resetTimer={resetTimer}
            completeTimer={completeTimer}
            handleTimerModeChange={handleTimerModeChange}
            sessionName={sessionName}
            setSessionName={setSessionName}
            sessionNotes={sessionNotes}
            setSessionNotes={setSessionNotes}
            saveSessionNotes={saveSessionNotes}
            currentTheme={currentTheme}
          />

          {/* History Section */}
          <SessionHistory
            sessions={sessions}
            currentTheme={currentTheme}
          />

          {/* Recent Sessions */}
          <RecentSessions
            sessions={sessions}
            currentTheme={currentTheme}
            deleteSession={deleteSession}
          />
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
        />
      )}
    </div>
  );
};