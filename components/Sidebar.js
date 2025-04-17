import React, { useState } from "react";

export const Sidebar = ({ activeProject, setActiveProject }) => {
  const [newCategory, setNewCategory] = useState("");
  const [projects, setProjects] = useState([
    { name: "Web Development", color: "bg-green-400" },
    { name: "Design Tasks", color: "bg-blue-400" },
    { name: "Study Session", color: "bg-yellow-400" },
    { name: "Writing", color: "bg-red-400" }
  ]);
  
  const addNewProject = () => {
    if (newCategory.trim() !== "") {
      setProjects([...projects, { 
        name: newCategory, 
        color: "bg-purple-400" 
      }]);
      setNewCategory("");
    }
  };

  return (
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
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`flex items-center p-2 ${activeProject === project.name ? 'bg-primary-600' : ''} rounded-lg transition hover:bg-primary-500 cursor-pointer`}
              onClick={() => setActiveProject(project.name)}
            >
              <div className={`w-3 h-3 rounded-full ${project.color} mr-3`}></div>
              <span>{project.name}</span>
            </div>
          ))}
          
          <div>
            <div className="flex items-center p-2 rounded-lg transition hover:bg-primary-600 cursor-pointer">
              <div className="flex items-center flex-grow">
                <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
                <input 
                  type="text" 
                  placeholder="Add custom category..." 
                  className="bg-transparent border-b border-primary-500 text-white placeholder-primary-300 focus:outline-none w-full py-1"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewProject()}
                />
              </div>
              <button 
                className="ml-2 text-white opacity-70 hover:opacity-100 transition"
                onClick={addNewProject}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <button className="mt-4 flex items-center text-sm py-2 px-3 bg-primary-800 rounded-lg transition hover:bg-primary-600">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add New Project
        </button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Filter Projects</h2>
        <div className="space-y-3">
          <div className="flex items-center p-2 bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-500 transition">
            <input type="checkbox" id="allProjects" className="w-4 h-4 mr-2 rounded-sm border-primary-400 focus:ring-primary-500" defaultChecked />
            <label htmlFor="allProjects" className="w-full cursor-pointer">All Projects</label>
          </div>
          
          {projects.map((project, index) => (
            <div key={index} className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-primary-600 transition">
              <input 
                type="checkbox" 
                id={`project-${index}`} 
                className="w-4 h-4 mr-2 rounded-sm border-primary-400 focus:ring-primary-500" 
                defaultChecked 
              />
              <div className={`w-3 h-3 rounded-full ${project.color} ml-1 mr-2`}></div>
              <label htmlFor={`project-${index}`} className="w-full cursor-pointer">{project.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
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
        </div>
      </div>
    </div>
  );
};