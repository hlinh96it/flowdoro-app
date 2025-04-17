import React, { useState } from "react";

export const Sidebar = ({ activeProject, setActiveProject, currentTheme }) => {
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

  // Thêm hàm xóa project
  const deleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
    
    // Nếu project đang active bị xóa, chuyển sang project đầu tiên hoặc null
    if (activeProject === projects[index].name) {
      setActiveProject(updatedProjects.length > 0 ? updatedProjects[0].name : null);
    }
  };

  // Xác định các lớp dựa trên theme
  const isDarkTheme = currentTheme === "dark";
  const sidebarClass = isDarkTheme 
    ? "bg-neutral-800 text-white border-r border-neutral-700" 
    : "sidebar-minimal";
  const itemHoverClass = isDarkTheme
    ? "hover:bg-neutral-700 transition-colors duration-200"
    : "sidebar-item-hover";
  const itemActiveClass = isDarkTheme
    ? "bg-primary-700 border-l-4 border-primary-500 shadow-lg"
    : "bg-primary-100 border-l-4 border-primary-400 shadow-lg";
  const buttonClass = isDarkTheme
    ? "bg-neutral-700 hover:bg-neutral-600 text-white transition-colors duration-200"
    : "sidebar-button";
  const inputClass = isDarkTheme
    ? "bg-transparent border-b border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:border-primary-400"
    : "bg-transparent border-b border-neutral-300 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-primary-400";

  return (
    <div className={`p-6 lg:col-span-1 ${sidebarClass}`}>
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
              className={`group flex items-center p-2 rounded-lg transition cursor-pointer ${activeProject === project.name ? itemActiveClass : itemHoverClass}`}
              onClick={() => setActiveProject(project.name)}
            >
              <div className={`w-3 h-3 rounded-full ${project.color} mr-3`}></div>
              <span className="flex-grow">{project.name}</span>
              {/* Nút xóa project - hiển thị khi hover */}
              <button 
                className="opacity-0 group-hover:opacity-70 hover:opacity-100 transition ml-2 text-red-500"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn không cho kích hoạt sự kiện onClick của div cha
                  deleteProject(index);
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
          
          <div>
            <div className={`flex items-center p-2 rounded-lg ${itemHoverClass} cursor-pointer`}>
              <div className="flex items-center flex-grow">
                <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
                <input 
                  type="text" 
                  placeholder="Add projects" 
                  className={`w-full py-1 ${inputClass}`}
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewProject()}
                />
              </div>
              <button 
                className="ml-2 opacity-70 hover:opacity-100 transition"
                onClick={addNewProject}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Filter Projects</h2>
        <div className="space-y-3">
          <div className={`flex items-center p-2 ${itemActiveClass} rounded-lg cursor-pointer`}>
            <input type="checkbox" id="allProjects" className="w-4 h-4 mr-2 rounded-sm border-neutral-400 focus:ring-primary-500" defaultChecked />
            <label htmlFor="allProjects" className="w-full cursor-pointer">All Projects</label>
          </div>
          
          {projects.map((project, index) => (
            <div key={index} className={`flex items-center p-2 rounded-lg cursor-pointer ${itemHoverClass}`}>
              <input 
                type="checkbox" 
                id={`project-${index}`} 
                className="w-4 h-4 mr-2 rounded-sm border-neutral-400 focus:ring-primary-500" 
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
          <div className={`flex justify-between items-center p-2 ${itemActiveClass} rounded-lg cursor-pointer`}>
            <span>Today</span>
            <span className="font-bold">4 sessions</span>
          </div>
          <div className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${itemHoverClass}`}>
            <span>This Week</span>
            <span className="font-bold">18 sessions</span>
          </div>
          <div className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${itemHoverClass}`}>
            <span>This Month</span>
            <span className="font-bold">64 sessions</span>
          </div>
        </div>
      </div>
    </div>
  );
};