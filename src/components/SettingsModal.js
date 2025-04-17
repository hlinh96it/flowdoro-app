import React, { useState } from "react";

export const SettingsModal = ({ onClose, currentTheme, setCurrentTheme }) => {
  const [activeTab, setActiveTab] = useState("appearance");
  
  const themes = [
    { id: "light", name: "Light", color: "bg-gradient-to-r from-blue-50 to-purple-50" },
    { id: "dark", name: "Dark", color: "bg-gradient-to-r from-neutral-900 to-neutral-800" },
    { id: "purple", name: "Purple", color: "bg-gradient-to-r from-purple-100 to-indigo-100" },
    { id: "blue", name: "Blue", color: "bg-gradient-to-r from-blue-100 to-cyan-100" },
    { id: "green", name: "Green", color: "bg-gradient-to-r from-green-50 to-emerald-100" }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Settings</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-3 font-medium text-sm ${activeTab === "appearance" ? "border-b-2 border-primary-600 text-primary-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("appearance")}
          >
            Appearance
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm ${activeTab === "timer" ? "border-b-2 border-primary-600 text-primary-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("timer")}
          >
            Timer
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm ${activeTab === "notifications" ? "border-b-2 border-primary-600 text-primary-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === "appearance" && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Theme</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {themes.map((theme) => (
                  <button 
                    key={theme.id}
                    className={`p-4 rounded-lg flex flex-col items-center justify-center ${theme.color} border-2 transition ${currentTheme === theme.id ? 'border-primary-500' : 'border-transparent hover:border-gray-300'}`}
                    onClick={() => setCurrentTheme(theme.id)}
                  >
                    <span className={`text-sm font-medium ${theme.id === 'dark' ? 'text-white' : 'text-gray-800'}`}>{theme.name}</span>
                    {currentTheme === theme.id && (
                      <div className="absolute -top-2 -right-2 bg-primary-500 rounded-full p-1">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              <h4 className="text-sm font-medium text-gray-700 mb-3">Font Size</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">A</span>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  defaultValue="3" 
                  className="w-full mx-2 accent-primary-600" 
                />
                <span className="text-base text-gray-500">A</span>
              </div>
            </div>
          )}
          
          {activeTab === "timer" && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Timer Duration (minutes)</h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Pomodoro</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="60" 
                    defaultValue="25" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Short Break</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="30" 
                    defaultValue="5" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Long Break</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="60" 
                    defaultValue="15" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-700">Auto-start Breaks</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Auto-start Pomodoros</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          )}
          
          {activeTab === "notifications" && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Sound Notifications</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-700">Timer End Sound</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="mb-4">
                <label className="text-xs text-gray-500 block mb-1">Sound Volume</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="80" 
                  className="w-full accent-primary-600" 
                />
              </div>
              
              <h4 className="text-sm font-medium text-gray-700 mb-3">Desktop Notifications</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Enable Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
          <button 
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition"
            onClick={onClose}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};