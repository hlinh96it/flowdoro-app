import React from "react";


export const Component = () => {
  return (
<div id="webcrumbs"> 
        	<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8 font-sans">
	  <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
	    <div className="grid grid-cols-1 lg:grid-cols-5">
	      {/* Sidebar */}
	      <div className="bg-primary-700 text-white p-6 lg:col-span-1">
	        <h1 className="text-2xl font-bold mb-8 flex items-center">
	          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	          </svg>
	          Pomodoro
	        </h1>
	        
	        <div className="mb-8">
	          <h2 className="text-lg font-semibold mb-3">Projects</h2>
	          <div className="space-y-2">
	            <div className="flex items-center p-2 bg-primary-600 rounded-lg transition hover:bg-primary-500 cursor-pointer">
	              <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
	              <span >Web Development</span>
	            </div>
	            <div className="flex items-center p-2 rounded-lg transition hover:bg-primary-600 cursor-pointer">
	              <div className="w-3 h-3 rounded-full bg-blue-400 mr-3"></div>
	              <span>Design Tasks</span>
	            </div>
	            <div className="flex items-center p-2 rounded-lg transition hover:bg-primary-600 cursor-pointer">
	              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-3"></div>
	              <span>Study Session</span>
	            </div>
	            <div  className="flex items-center p-2 rounded-lg transition hover:bg-primary-600 cursor-pointer">
	              <div className="w-3 h-3 rounded-full bg-red-400 mr-3"></div>
	              <span>Writing</span>
	            </div>
	            
	          <div>
	  <div className="flex items-center p-2 rounded-lg transition hover:bg-primary-600 cursor-pointer">
	    <div className="flex items-center flex-grow">
	      <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
	      <input 
	        type="text" 
	        placeholder="Add custom category..." 
	        className="bg-transparent border-b border-primary-500 text-white placeholder-primary-300 focus:outline-none w-full py-1"
	      />
	    </div>
	    <button className="ml-2 text-white opacity-70 hover:opacity-100 transition">
	      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	        <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	      </svg>
	    </button>
	  </div>
	</div></div>
	          
	          <button className="mt-4 flex items-center text-sm py-2 px-3 bg-primary-800 rounded-lg transition hover:bg-primary-600">
	            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	            </svg>
	            Add New Project
	          </button>
	        </div>
	        
	        <div  className="mb-8">
	  <h2 className="text-lg font-semibold mb-3">Filter Projects</h2>
	  <div className="space-y-3">
	    <div className="flex items-center p-2 bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-500 transition">
	      <input type="checkbox" id="allProjects" className="w-4 h-4 mr-2 rounded-sm border-primary-400 focus:ring-primary-500" checked />
	      <label htmlFor="allProjects" className="w-full cursor-pointer">All Projects</label>
	    </div>
	    <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-primary-600 transition">
	      <input type="checkbox" id="webDev" className="w-4 h-4 mr-2 rounded-sm border-primary-400 focus:ring-primary-500" checked />
	      <div className="w-3 h-3 rounded-full bg-green-400 ml-1 mr-2"></div>
	      <label htmlFor="webDev" className="w-full cursor-pointer">Web Development</label>
	    </div>
	    <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-primary-600 transition">
	      <input type="checkbox" id="design" className="w-4 h-4 mr-2 rounded-sm border-primary-400 focus:ring-primary-500" checked />
	      <div className="w-3 h-3 rounded-full bg-blue-400 ml-1 mr-2"></div>
	      <label htmlFor="design" className="w-full cursor-pointer">Design Tasks</label>
	    </div>
	    <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-primary-600 transition">
	      <input type="checkbox" id="study" className="w-4 h-4 mr-2 rounded-sm border-primary-400 focus:ring-primary-500" checked />
	      <div className="w-3 h-3 rounded-full bg-yellow-400 ml-1 mr-2"></div>
	      <label htmlFor="study" className="w-full cursor-pointer">Study Session</label>
	    </div>
	    <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-primary-600 transition">
	      <input type="checkbox" id="writing" className="w-4 h-4 mr-2 rounded-sm border-primary-400 focus:ring-primary-500" checked />
	      <div className="w-3 h-3 rounded-full bg-red-400 ml-1 mr-2"></div>
	      <label htmlFor="writing" className="w-full cursor-pointer">Writing</label>
	    </div>
	    
	  </div>
	</div><div>
	          <h2 className="text-lg font-semibold mb-3">Statistics</h2>
	          <div className="space-y-3">
	            <div className="flex justify-between items-center p-2 bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-500 transition">
	              <span>Today</span>
	              <span className="font-bold">4 sessions</span>
	            </div>
	            <div className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-primary-600 transition">
	              <span>This Week</span>
	              <span className="font-bold">18 sessions</span>
	            </div>
	            <div className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-primary-600 transition">
	              <span>This Month</span>
	              <span className="font-bold">64 sessions</span>
	            </div>
	            {/* Next: "Add detailed statistics page link" */}
	          </div>
	        </div>
	      </div>
	      
	      {/* Main Content */}
	      <div className="lg:col-span-4 p-6 lg:p-10">
	        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
	          <h2  className="text-3xl font-bold text-gray-800">Current Session</h2>
	          <div className="mt-4 md:mt-0 flex space-x-2">
	            <details className="relative">
	              <summary  className="py-2 px-4 bg-primary-100 text-primary-700 rounded-lg font-medium cursor-pointer flex items-center hover:bg-primary-200 transition">
	                <svg  className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	            <button className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center">
	              <svg  className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	              </svg>
	              New Session
	            </button>
	          </div>
	        </div>
	        
	        {/* Timer Section */}
	        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
	          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center">
	            <div className="flex items-center mb-4">
	              <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
	              <span className="text-lg text-gray-700">Web Development</span>
	            </div>
	            <div className="text-7xl font-bold text-gray-800 mt-4 mb-8 tabular-nums">25:00</div>
	            <div className="flex space-x-3">
	              <button className="py-3 px-8 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-500 transform hover:scale-105 transition shadow-md">Start</button>
	              <button className="py-3 px-8 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transform hover:scale-105 transition shadow-sm">Reset</button>
	            </div>
	            <div className="mt-6 flex justify-center space-x-4">
	              <button className="flex flex-col items-center group">
	                <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition">
	                  <span className="text-lg font-bold text-primary-600">25</span>
	                </div>
	                <span className="mt-1 text-sm text-gray-600">Pomodoro</span>
	              </button>
	              <button className="flex flex-col items-center group">
	                <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition">
	                  <span className="text-lg font-bold text-primary-600">5</span>
	                </div>
	                <span className="mt-1 text-sm text-gray-600">Short Break</span>
	              </button>
	              <button className="flex flex-col items-center group">
	                <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:shadow group-hover:bg-gray-100 transition">
	                  <span className="text-lg font-bold text-primary-600">15</span>
	                </div>
	                <span className="mt-1 text-sm text-gray-600">Long Break</span>
	              </button>
	            </div>
	            {/* Next: "Add sound settings button" */}
	          </div>
	          
	          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
	            <h3  className="text-xl font-bold text-gray-800 mb-4">Session Notes</h3>
	            <div className="flex space-x-2 mb-4">
	              <input 
	                type="text" 
	                placeholder="Session name..." 
	                className="flex-grow py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition" 
	              />
	              <button className="py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition">
	                Save
	              </button>
	            </div>
	            <textarea  
	              className="w-full h-36 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
	              placeholder="Write your thoughts about this session..."
	            ></textarea>
	            <div className="mt-4 flex justify-between">
	              <span className="text-sm text-gray-500">Last saved: 10:23 AM</span>
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
	            {/* Next: "Add auto-save feature indicator" */}
	          </div>
	        </div>
	        
	        {/* History Section */}
	        <div className="mb-8">
	          <h3 className="text-2xl font-bold text-gray-800 mb-6">Session History</h3>
	          <div className="flex mb-4 space-x-2">
	            <button  className="py-2 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-500 transition">Daily</button>
	            <button className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">Weekly</button>
	            <button className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">Monthly</button>
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
	                <span  className="mt-2 text-sm text-gray-600">Tue</span>
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
	                  <div  className="bg-yellow-400 w-16 h-12 rounded-t-lg" title="Study Session"></div>
	                  <div className="bg-red-400 w-16 h-8 rounded-b-lg" title="Writing"></div>
	                </div>
	                <span  className="mt-2 text-sm text-gray-600">Sat</span>
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
	                  <span  className="text-sm text-gray-600">Writing</span>
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
	          {/* Next: "Add date range selector for history view" */}
	        </div>
	        
	        {/* Recent Sessions */}
	        <div>
	          <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Sessions</h3>
	          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition group">
	              <div className="flex justify-between items-start mb-4">
	                <div className="flex items-center">
	                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
	                  <h4 className="font-semibold">API Integration</h4>
	                </div>
	                <span className="text-xs text-gray-500">Today, 10:15 AM</span>
	              </div>
	              <p className="text-sm text-gray-600 mb-3">Completed the authentication flow and started working on data fetching.</p>
	              <div className="flex justify-between items-center">
	                <span className="text-xs font-medium text-gray-500">4 pomodoros</span>
	                <button className="opacity-0 group-hover:opacity-100 text-primary-600 hover:text-primary-700 text-sm transition">
	                  View Details
	                </button>
	              </div>
	            </div>
	            
	            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition group">
	              <div className="flex justify-between items-start mb-4">
	                <div className="flex items-center">
	                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
	                  <h4 className="font-semibold">Dashboard UI</h4>
	                </div>
	                <span className="text-xs text-gray-500">Today, 8:30 AM</span>
	              </div>
	              <p className="text-sm text-gray-600 mb-3">Designed the chart components and fixed responsive layout issues.</p>
	              <div className="flex justify-between items-center">
	                <span className="text-xs font-medium text-gray-500">3 pomodoros</span>
	                <button className="opacity-0 group-hover:opacity-100 text-primary-600 hover:text-primary-700 text-sm transition">
	                  View Details
	                </button>
	              </div>
	            </div>
	            
	            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition group">
	              <div className="flex justify-between items-start mb-4">
	                <div className="flex items-center">
	                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
	                  <h4 className="font-semibold">React Hooks</h4>
	                </div>
	                <span className="text-xs text-gray-500">Yesterday, 4:45 PM</span>
	              </div>
	              <p className="text-sm text-gray-600 mb-3">Studied useContext and useReducer hooks for state management.</p>
	              <div className="flex justify-between items-center">
	                <span className="text-xs font-medium text-gray-500">2 pomodoros</span>
	                <button className="opacity-0 group-hover:opacity-100 text-primary-600 hover:text-primary-700 text-sm transition">
	                  View Details
	                </button>
	              </div>
	            </div>
	            {/* Next: "Add pagination for recent sessions" */}
	          </div>
	        </div>
	      </div>
	    </div>
	  </div>
	</div> 
        </div>
  )
}

