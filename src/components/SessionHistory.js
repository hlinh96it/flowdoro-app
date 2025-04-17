import React, { useState, useMemo } from "react";

export const SessionHistory = ({ sessions: propSessions, currentTheme }) => {
  const [activeView, setActiveView] = useState("daily");
  
  // Dữ liệu mẫu để kiểm tra hiển thị (sẽ được sử dụng nếu không có dữ liệu được truyền vào)
  const sampleSessions = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    return [
      { id: 1, project: "Web Development", pomodoros: 4, date: today },
      { id: 2, project: "Design Tasks", pomodoros: 3, date: today },
      { id: 3, project: "Study Session", pomodoros: 2, date: yesterday },
      { id: 4, project: "Writing", pomodoros: 5, date: yesterday },
      { id: 5, project: "Web Development", pomodoros: 3, date: twoDaysAgo },
      { id: 6, project: "Study Session", pomodoros: 4, date: lastWeek },
    ];
  }, []);
  
  // Sử dụng dữ liệu được truyền vào hoặc dữ liệu mẫu nếu không có
  const sessions = useMemo(() => {
    // Kiểm tra và chuyển đổi định dạng ngày nếu cần
    const normalizedSessions = (propSessions && propSessions.length > 0) 
      ? propSessions.map(session => ({
          ...session,
          // Đảm bảo date là một đối tượng Date
          date: session.date instanceof Date ? session.date : new Date(session.date)
        }))
      : sampleSessions;
      
    return normalizedSessions;
  }, [propSessions, sampleSessions]);
  
  // Xác định các lớp dựa trên theme
  const isDarkTheme = currentTheme === "dark";
  const cardClass = isDarkTheme 
    ? "bg-neutral-800 border-neutral-700 text-white" 
    : "bg-white border border-gray-200";
  const buttonClass = (isActive) => isDarkTheme
    ? isActive 
      ? "bg-primary-600 text-white" 
      : "bg-neutral-700 text-neutral-300 hover:bg-primary-500"
    : isActive 
      ? "bg-primary-600 text-white" 
      : "bg-gray-100 text-gray-700 hover:bg-primary-500";
  const textClass = isDarkTheme ? "text-gray-300" : "text-gray-600";
  
  // Lấy ngày hiện tại
  const today = new Date();
  
  // Tính toán dữ liệu cho biểu đồ dựa trên sessions và chế độ xem
  const chartData = useMemo(() => {
    if (activeView === "daily") {
      // Lấy ngày hiện tại
      const dayOfWeek = today.getDay(); // 0 = Chủ Nhật, 1 = Thứ 2, ...
      
      // Tạo mảng 7 ngày trong tuần
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const days = [];
      
      // Tạo mảng các ngày trong tuần hiện tại
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - dayOfWeek + i);
        days.push({
          name: daysOfWeek[i],
          date: date,
          sessions: []
        });
      }
      
      // Nhóm các phiên theo ngày
      sessions.forEach(session => {
        const sessionDate = new Date(session.date);
      
        // Tìm ngày tương ứng trong mảng days
        for (let day of days) {
          if (sessionDate.toDateString() === day.date.toDateString()) {
            day.sessions.push(session);
            break;
          }
        }
      });
      
      // Tính toán chiều cao cho mỗi dự án trong mỗi ngày
      return days.map(day => {
        const projectCounts = {};
        let totalPomodoros = 0;
        
        day.sessions.forEach(session => {
          if (!projectCounts[session.project]) {
            projectCounts[session.project] = 0;
          }
          projectCounts[session.project] += session.pomodoros;
          totalPomodoros += session.pomodoros;
        });
        
        // Chuyển đổi thành mảng để dễ dàng hiển thị
        const projects = Object.keys(projectCounts).map(project => ({
          name: project,
          count: projectCounts[project]
        }));
        
        // Tính tổng thời gian (giả sử mỗi pomodoro là 25 phút)
        const totalMinutes = totalPomodoros * 25;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const timeDisplay = totalPomodoros > 0 ? `${hours}h ${minutes}m` : "";

        return {
          ...day,
          projects,
          totalPomodoros,
          timeDisplay,
          label: day.name,
          isToday: day.date.toDateString() === today.toDateString()
        };
      });
    } 
    else if (activeView === "weekly") {
      // Tạo mảng 4 tuần gần đây
      const weeks = [];
      
      for (let i = 0; i < 4; i++) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() - (7 * i));
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        weeks.push({
          name: `W${i === 0 ? "This" : i === 1 ? "Last" : i + 1}`,
          startDate: weekStart,
          endDate: weekEnd,
          sessions: [],
          weekIndex: i // Store the index to use later
        });
      }
      
      // Nhóm các phiên theo tuần
      sessions.forEach(session => {
        const sessionDate = new Date(session.date);
        
        for (let week of weeks) {
          if (sessionDate >= week.startDate && sessionDate <= week.endDate) {
            week.sessions.push(session);
            break;
          }
        }
      });
      
      // Tính toán chiều cao cho mỗi dự án trong mỗi tuần
      return weeks.map(week => {
        const projectCounts = {};
        let totalPomodoros = 0;
        
        week.sessions.forEach(session => {
          if (!projectCounts[session.project]) {
            projectCounts[session.project] = 0;
          }
          projectCounts[session.project] += session.pomodoros;
          totalPomodoros += session.pomodoros;
        });
        
        console.log("Week:", week.name, "Projects:", projectCounts, "Total:", totalPomodoros);
        
        const projects = Object.keys(projectCounts).map(project => ({
          name: project,
          count: projectCounts[project]
        }));
        
        // Tính tổng thời gian (giả sử mỗi pomodoro là 25 phút)
        const totalMinutes = totalPomodoros * 25;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const timeDisplay = totalPomodoros > 0 ? `${hours}h ${minutes}m` : "";
        
        const formattedStartDate = `${week.startDate.getDate()}/${week.startDate.getMonth() + 1}`;
        const formattedEndDate = `${week.endDate.getDate()}/${week.endDate.getMonth() + 1}`;
        
        return {
          ...week,
          projects,
          totalPomodoros,
          timeDisplay,
          label: `${week.name}`,
          sublabel: `${formattedStartDate} - ${formattedEndDate}`,
          isCurrentWeek: week.weekIndex === 0 // Use the stored index
        };
      });
    } 
    else if (activeView === "monthly") {
      // Tạo mảng 6 tháng gần đây
      const months = [];
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      for (let i = 0; i < 6; i++) {
        const monthDate = new Date(today);
        monthDate.setMonth(today.getMonth() - i);
        
        const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
        
        months.push({
          name: monthNames[monthDate.getMonth()],
          startDate: monthStart,
          endDate: monthEnd,
          sessions: [],
          isCurrentMonth: i === 0 // Store this information directly when creating the month object
        });
      }
      
      // Nhóm các phiên theo tháng
      sessions.forEach(session => {
        const sessionDate = new Date(session.date);
        
        for (let month of months) {
          if (sessionDate >= month.startDate && sessionDate <= month.endDate) {
            month.sessions.push(session);
            break;
          }
        }
      });
      
      // Tính toán chiều cao cho mỗi dự án trong mỗi tháng
      return months.map(month => {
        const projectCounts = {};
        let totalPomodoros = 0;
        
        month.sessions.forEach(session => {
          if (!projectCounts[session.project]) {
            projectCounts[session.project] = 0;
          }
          projectCounts[session.project] += session.pomodoros;
          totalPomodoros += session.pomodoros;
        });
        
        console.log("Month:", month.name, "Projects:", projectCounts, "Total:", totalPomodoros);
        
        const projects = Object.keys(projectCounts).map(project => ({
          name: project,
          count: projectCounts[project]
        }));
        
        // Tính tổng thời gian (giả sử mỗi pomodoro là 25 phút)
        const totalMinutes = totalPomodoros * 25;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const timeDisplay = totalPomodoros > 0 ? `${hours}h ${minutes}m` : "";
        
        return {
          ...month,
          projects,
          totalPomodoros,
          timeDisplay,
          label: month.name,
          sublabel: month.startDate.getFullYear().toString()
          // isCurrentMonth is already included from the months array
        };
      });
    }
    
    return [];
  }, [sessions, activeView, today]);
  
  // Lấy danh sách các dự án duy nhất
  const uniqueProjects = useMemo(() => {
    const projects = new Set();
    sessions.forEach(session => {
      projects.add(session.project);
    });
    return Array.from(projects);
  }, [sessions]);
  
  // Lấy màu cho dự án
  const getProjectColor = (projectName) => {
    const colorMap = {
      "Web Development": "bg-green-400",
      "Design Tasks": "bg-blue-400",
      "Study Session": "bg-yellow-400",
      "Writing": "bg-red-400"
    };
    
    return colorMap[projectName] || "bg-purple-400";
  };
  
  // Tính tổng số pomodoros cho mỗi ngày/tuần/tháng
  const maxPomodoros = Math.max(...chartData.map(item => 
    item.projects.reduce((sum, project) => sum + project.count, 0)
  ), 1);
  
  // Hệ số để tính chiều cao
  const heightFactor = 48 / maxPomodoros;
  
  // Tính toán tổng số pomodoro
  const totalPomodoros = useMemo(() => {
    return sessions.reduce((total, session) => total + session.pomodoros, 0);
  }, [sessions]);
  
  // Tính toán tổng thời gian (giả sử mỗi pomodoro là 25 phút)
  const totalMinutes = totalPomodoros * 25;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Session History</h3>
        <div className="flex items-center">
          <div className={`mr-6 ${textClass}`}>
            <span className="font-medium">Total: </span>
            <span className="font-bold">{totalPomodoros} pomodoros</span>
            <span className="mx-1">•</span>
            <span>{hours}h {minutes}m</span>
          </div>
          <div className="flex space-x-2">
            <button 
              className={`py-2 px-4 ${buttonClass(activeView === "daily")} rounded-lg font-medium transition`}
              onClick={() => setActiveView("daily")}
            >
              Daily
            </button>
            <button 
              className={`py-2 px-4 ${buttonClass(activeView === "weekly")} rounded-lg font-medium transition`}
              onClick={() => setActiveView("weekly")}
            >
              Weekly
            </button>
            <button 
              className={`py-2 px-4 ${buttonClass(activeView === "monthly")} rounded-lg font-medium transition`}
              onClick={() => setActiveView("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      
      <div className={`${cardClass} rounded-xl p-6`}>
        <div className="h-64 flex items-end justify-between px-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex flex-col h-48 justify-end relative">
                {/* Hiển thị số thời gian trên cột */}
                {item.totalPomodoros > 0 && (
                  <div className={`absolute -top-8 w-full text-center ${textClass}`}>
                    <div className="text-xs font-medium">{item.totalPomodoros} pomos</div>
                    <div className="text-xs">{item.timeDisplay}</div>
                  </div>
                )}
                
                {item.projects.length > 0 ? (
                  item.projects.map((project, pIndex) => {
                    const height = Math.max(4, project.count * heightFactor);
                    return (
                      <div 
                        key={pIndex} 
                        className={`${getProjectColor(project.name)} w-14 md:w-20 ${pIndex === 0 ? 'rounded-t-lg' : ''} ${pIndex === item.projects.length - 1 ? 'rounded-b-lg' : ''} transition-all duration-500 flex items-center justify-center`}
                        style={{ height: `${height}px` }}
                        title={`${project.name}: ${project.count} pomodoros`}
                      >
                        {/* Hiển thị số pomodoro cho từng phần của cột nếu đủ lớn */}
                        {height >= 20 && (
                          <span className="text-xs font-bold text-white">{project.count}</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="w-14 md:w-20 h-4 bg-gray-200 dark:bg-neutral-700 rounded-lg"></div>
                )}
              </div>
              <div className="mt-2 text-center">
                <span className={`text-sm font-medium ${item.isToday || item.isCurrentWeek || item.isCurrentMonth ? 'text-primary-600' : textClass}`}>
                  {item.label}
                </span>
                {item.sublabel && (
                  <div className={`text-xs ${textClass}`}>{item.sublabel}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-4">
            {uniqueProjects.map((project, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getProjectColor(project)} mr-2`}></div>
                <span className={`text-sm ${textClass}`}>{project}</span>
              </div>
            ))}
          </div>
          <button className={`text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center mt-2 md:mt-0`}>
            View Detailed Report
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};