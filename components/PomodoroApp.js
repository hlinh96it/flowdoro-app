import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { TimerSection } from "./TimerSection";
import { SessionHistory } from "./SessionHistory";
import { RecentSessions } from "./RecentSessions";

export const PomodoroApp = () => {
  const [activeProject, setActiveProject] = useState("Web Development");
  const [timerMode, setTimerMode] = useState("pomodoro"); // pomodoro, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionName, setSessionName] = useState("");
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
  
  // Timer durations in seconds
  const timerDurations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };
  
  // Handle timer mode change
  const handleTimerModeChange = (mode) => {
    setTimerMode(mode);
    setTimeLeft(timerDurations[mode]);
    setIsRunning(false);
  };
  
  // Start timer
  const startTimer = () => {
    setIsRunning(true);
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
    <div id="webcrumbs"> 
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8 font-sans">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Sidebar */}
            <Sidebar 
              activeProject={activeProject} 
              setActiveProject={setActiveProject} 
            />
            
            {/* Main Content */}
            <div className="lg:col-span-4 p-6 lg:p-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Current Session</h2>
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <details className="relative">
                    <summary className="py-2 px-4 bg-primary-100 text-primary-700 rounded-lg font-medium cursor-pointer flex items-center hover:bg-primary-200 transition">
                      <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                startTimer={startTimer}
                resetTimer={resetTimer}
                handleTimerModeChange={handleTimerModeChange}
                sessionName={sessionName}
                setSessionName={setSessionName}
                sessionNotes={sessionNotes}
                setSessionNotes={setSessionNotes}
                saveSessionNotes={saveSessionNotes}
              />
              
              {/* History Section */}
              <SessionHistory />
              
              {/* Recent Sessions */}
              <RecentSessions sessions={sessions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};