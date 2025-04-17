import React, { useState, useMemo, useRef } from "react";

export const SessionHistory = ({ sessions: propSessions, currentTheme, projects }) => {
  const [activeView, setActiveView] = useState("daily");
  const [activeSounds, setActiveSounds] = useState({});
  const [soundVolumes, setSoundVolumes] = useState({});
  const audioRefs = useRef({});
  
  // Danh sách các âm thanh background noise
  const backgroundSounds = [
    { id: "fan", name: "Quạt", icon: "fan", src: "/sounds/fan.mp3" },
    { id: "cafe", name: "Quán Cafe", icon: "cafe", src: "/assets/sounds/cafe-noise-32940.mp3" },
    { id: "rain", name: "Mưa", icon: "rain", src: "/sounds/rain.mp3" },
    { id: "forest", name: "Rừng", icon: "forest", src: "/sounds/forest.mp3" },
    { id: "waves", name: "Sóng Biển", icon: "waves", src: "/sounds/waves.mp3" },
  ];
  
  // Các mức âm lượng
  const volumeLevels = [1, 0.75, 0.5, 0.25, 0];
  
  // Xử lý việc phát/dừng/điều chỉnh âm lượng âm thanh
  const toggleSound = (soundId) => {
    // Kiểm tra xem âm thanh đã được phát chưa
    if (activeSounds[soundId]) {
      // Nếu đã phát, thay đổi âm lượng hoặc tắt
      const currentVolumeIndex = volumeLevels.indexOf(soundVolumes[soundId] || 1);
      const nextVolumeIndex = (currentVolumeIndex + 1) % volumeLevels.length;
      const newVolume = volumeLevels[nextVolumeIndex];
      
      if (newVolume === 0) {
        // Nếu âm lượng = 0, dừng phát
        if (audioRefs.current[soundId]) {
          audioRefs.current[soundId].pause();
          audioRefs.current[soundId].currentTime = 0;
          delete audioRefs.current[soundId];
        }
        
        // Cập nhật trạng thái
        setActiveSounds(prev => {
          const newState = { ...prev };
          delete newState[soundId];
          return newState;
        });
        
        setSoundVolumes(prev => {
          const newVolumes = { ...prev };
          delete newVolumes[soundId];
          return newVolumes;
        });
      } else {
        // Nếu chỉ thay đổi âm lượng
        if (audioRefs.current[soundId]) {
          audioRefs.current[soundId].volume = newVolume;
        }
        
        // Cập nhật trạng thái âm lượng
        setSoundVolumes(prev => ({
          ...prev,
          [soundId]: newVolume
        }));
      }
    } else {
      // Nếu chưa phát, bắt đầu phát
      const sound = backgroundSounds.find(s => s.id === soundId);
      if (sound) {
        const audio = new Audio(sound.src);
        audio.loop = true;
        audio.volume = 1; // Bắt đầu với âm lượng tối đa
        
        audio.play().catch(error => {
          console.error(`Không thể phát âm thanh ${sound.name}:`, error);
        });
        
        // Lưu tham chiếu đến đối tượng Audio
        audioRefs.current[soundId] = audio;
        
        // Cập nhật trạng thái
        setActiveSounds(prev => ({
          ...prev,
          [soundId]: true
        }));
        
        setSoundVolumes(prev => ({
          ...prev,
          [soundId]: 1
        }));
      }
    }
  };
  
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
      
    // Lọc ra các sessions có project vẫn còn tồn tại trong danh sách projects
    if (projects && projects.length > 0) {
      const projectNames = projects.map(p => p.name);
      return normalizedSessions.filter(session => projectNames.includes(session.project));
    }
    
    return normalizedSessions;
  }, [propSessions, sampleSessions, projects]);
  
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
  
  // Hàm tính toán màu sắc dựa trên âm lượng
  const getVolumeColorClass = (soundId) => {
    if (!activeSounds[soundId]) return "";
    
    const volume = soundVolumes[soundId] || 1;
    if (volume === 1) return "bg-primary-600";
    if (volume >= 0.75) return "bg-primary-500";
    if (volume >= 0.5) return "bg-primary-400";
    return "bg-primary-300";
  };
  
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
        let totalPomodoros = 2;
        
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
        };
      });
    }
    
    return [];
  }, [sessions, activeView, today]);
  
  // Lấy danh sách các dự án duy nhất từ sessions hiện tại
  const uniqueProjects = useMemo(() => {
    const projectSet = new Set();
    sessions.forEach(session => {
      projectSet.add(session.project);
    });
    return Array.from(projectSet);
  }, [sessions]);
  
  // Lấy màu cho dự án từ danh sách projects được truyền vào
  const getProjectColor = (projectName) => {
    if (projects && projects.length > 0) {
      const project = projects.find(p => p.name === projectName);
      if (project) {
        return project.color;
      }
    }
    
    // Fallback colors nếu không tìm thấy project
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
  
  // Lấy biểu tượng cho từng loại âm thanh
  const getSoundIcon = (iconName) => {
    switch (iconName) {
      case 'fan':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12C19 13.8565 18.3283 15.637 17.1211 16.9497C15.9139 18.2625 14.2435 19 12.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19C9.23858 19 7 16.7614 7 14C7 11.2386 4.76142 9 2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12C5 10.1435 5.67173 8.36301 6.87893 7.05025C8.08614 5.7375 9.75653 5 11.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5C14.7614 5 17 7.23858 17 10C17 12.7614 19.2386 15 22 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'cafe':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8H19C20.0609 8 21.0783 8.42143 21.8284 9.17157C22.5786 9.92172 23 10.9391 23 12C23 13.0609 22.5786 14.0783 21.8284 14.8284C21.0783 15.5786 20.0609 16 19 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 8H18V17C18 18.0609 17.5786 19.0783 16.8284 19.8284C16.0783 20.5786 15.0609 21 14 21H6C4.93913 21 3.92172 20.5786 3.17157 19.8284C2.42143 19.0783 2 18.0609 2 17V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 1V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 1V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 1V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'rain':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 16.58C21.0512 16.1196 21.9121 15.3116 22.4381 14.2916C22.964 13.2715 23.1231 12.1074 22.8886 10.9854C22.6541 9.86332 22.0402 8.84788 21.1501 8.12018C20.2599 7.39247 19.1476 7.00132 18 7.00002H16.74C16.4231 5.77254 15.8189 4.63797 14.9773 3.68982C14.1358 2.74167 13.0809 2.00709 11.8998 1.54662C10.7186 1.08614 9.44488 0.91809 8.18365 1.05828C6.92243 1.19847 5.70978 1.64314 4.64567 2.35325C3.58155 3.06336 2.69644 4.01813 2.06328 5.14724C1.43012 6.27635 1.06704 7.54751 1.00398 8.85043C0.940913 10.1533 1.17968 11.4543 1.70058 12.6528C2.22147 13.8513 3.00959 14.9125 4 15.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'forest':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 19H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 19V13C7 11.9391 7.42143 10.9217 8.17157 10.1716C8.92172 9.42143 9.93913 9 11 9C12.0609 9 13.0783 9.42143 13.8284 10.1716C14.5786 10.9217 15 11.9391 15 13V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 19V6C4 4.93913 4.42143 3.92172 5.17157 3.17157C5.92172 2.42143 6.93913 2 8 2C9.06087 2 10.0783 2.42143 10.8284 3.17157C11.5786 3.92172 12 4.93913 12 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 19V13C18 11.9391 17.5786 10.9217 16.8284 10.1716C16.0783 9.42143 15.0609 9 14 9H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'waves':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 4L22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.24 7.76C16.7979 8.31724 17.2404 8.97897 17.5424 9.70736C17.8443 10.4357 18.0005 11.2142 18.0005 12C18.0005 12.7858 17.8443 13.5643 17.5424 14.2926C17.2404 15.021 16.7979 15.6828 16.24 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.07 4.93C19.9708 5.82772 20.6826 6.89944 21.1625 8.07441C21.6424 9.24938 21.8813 10.5052 21.8649 11.7723C21.8484 13.0395 21.5771 14.2871 21.0667 15.4466C20.5563 16.6061 19.8176 17.6566 18.8967 18.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.76 16.24C7.20214 15.6828 6.75959 15.021 6.45766 14.2926C6.15573 13.5643 5.99951 12.7858 5.99951 12C5.99951 11.2142 6.15573 10.4357 6.45766 9.70736C6.75959 8.97897 7.20214 8.31724 7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.93 19.07C4.02922 18.1723 3.31738 17.1006 2.83749 15.9256C2.35759 14.7506 2.11871 13.4948 2.13513 12.2277C2.15155 10.9605 2.42294 9.71286 2.93332 8.55339C3.44371 7.39391 4.18239 6.34343 5.10329 5.47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };
  
  // Hiển thị chỉ báo âm lượng
  const getVolumeIndicator = (soundId) => {
    if (!activeSounds[soundId]) return null;
    
    const volume = soundVolumes[soundId] || 1;
    const bars = Math.ceil(volume * 4); // 1-4 thanh dựa vào âm lượng
    
    return (
      <span className="ml-2 flex items-center">
        {[...Array(bars)].map((_, i) => (
          <span 
            key={i} 
            className={`animate-pulse w-1.5 h-${3 + i} bg-white rounded-full mx-0.5`} 
            style={{ animationDelay: `${i * 75}ms` }}
          ></span>
        ))}
      </span>
    );
  };
  
  // Lấy thông tin tooltip dựa vào âm lượng
  const getVolumeTooltip = (soundId) => {
    if (!activeSounds[soundId]) return `Phát ${backgroundSounds.find(s => s.id === soundId)?.name}`;
    
    const volume = soundVolumes[soundId] || 1;
    const volumePercent = Math.round(volume * 100);
    return `Âm lượng: ${volumePercent}%`;
  };
  
  return (
    <div className="mb-8">
      {/* Phần Background Noise - Đã chuyển lên trên */}
      <div className="mb-8">
        <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
          Background Noise
        </h3>
        <div className={`${cardClass} rounded-xl p-4`}>
          <div className="flex flex-wrap gap-3">
            {backgroundSounds.map((sound) => (
              <button
                key={sound.id}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeSounds[sound.id] 
                    ? getVolumeColorClass(sound.id) + ' text-white shadow-lg' 
                    : isDarkTheme 
                      ? 'bg-neutral-700 hover:bg-neutral-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => toggleSound(sound.id)}
                title={getVolumeTooltip(sound.id)}
              >
                <span className="mr-2">
                  {getSoundIcon(sound.icon)}
                </span>
                <span>{sound.name}</span>
                {getVolumeIndicator(sound.id)}
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            Âm thanh nền giúp tăng khả năng tập trung và năng suất làm việc. Nhấn nhiều lần để điều chỉnh âm lượng.
          </div>
        </div>
      </div>
      
      {/* Phần Session History */}
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