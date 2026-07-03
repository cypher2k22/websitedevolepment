import React, { createContext, useState, useEffect } from 'react';
import { PROJECTS_CURRICULUM } from './curriculumData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedTheme = localStorage.getItem('theme_preference');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme_preference', newTheme);
  };

  const addToast = (text, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const login = (email, password) => {
    if (email === 'mailadmin@gmail.com' && password === '123') {
      const adminSession = {
        name: 'Administrator',
        email: 'mailadmin@gmail.com',
        role: 'admin',
        xp: 9999,
        level: 99,
        streak: 30,
        enrolledCourses: [],
        completedProjects: ['calculator-ui'],
        progress: {}
      };
      setUser(adminSession);
      localStorage.setItem('user_session', JSON.stringify(adminSession));
      addToast('Admin session unlocked successfully!', 'success');
      return { success: true, isAdmin: true };
    }

    const studentSession = {
      name: email.split('@')[0],
      email,
      role: 'student',
      xp: 250,
      level: 2,
      streak: 5,
      enrolledCourses: ['calculator-ui'],
      completedProjects: [],
      progress: { 'calculator-ui': 66 }
    };
    setUser(studentSession);
    localStorage.setItem('user_session', JSON.stringify(studentSession));
    addToast(`Welcome back, ${studentSession.name}!`, 'success');
    return { success: true, isAdmin: false };
  };

  const signup = (name, email, password) => {
    const studentSession = {
      name,
      email,
      role: 'student',
      xp: 0,
      level: 1,
      streak: 1,
      enrolledCourses: [],
      completedProjects: [],
      progress: {}
    };
    setUser(studentSession);
    localStorage.setItem('user_session', JSON.stringify(studentSession));
    addToast('Registered successfully! Let\'s build.', 'success');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    localStorage.removeItem('token');
    addToast('Logged out successfully.', 'info');
  };

  // Check if a project is locked based on prerequisite completion status
  const isProjectLocked = (projectId) => {
    const targetProject = PROJECTS_CURRICULUM.find(p => p.id === projectId);
    if (!targetProject || !targetProject.prereqId) {
      return false; // First project or not found
    }
    // Return true (locked) if prereqId is not in completedProjects list
    return !user?.completedProjects?.includes(targetProject.prereqId);
  };

  const enrollInProject = (projectId) => {
    if (!user) {
      addToast('Authentication required to enroll in projects.', 'warning');
      return false;
    }

    if (isProjectLocked(projectId)) {
      addToast('Please complete the prerequisite projects first.', 'warning');
      return false;
    }

    if (user.enrolledCourses.includes(projectId)) {
      return true;
    }

    const updatedUser = {
      ...user,
      enrolledCourses: [...user.enrolledCourses, projectId],
      progress: { ...user.progress, [projectId]: 0 }
    };
    setUser(updatedUser);
    localStorage.setItem('user_session', JSON.stringify(updatedUser));
    addToast('Enrolled successfully! Ready to code.', 'success');
    return true;
  };

  const updateProjectProgress = (projectId, progressPercent) => {
    if (!user) return;
    const updatedProgress = { ...user.progress, [projectId]: progressPercent };
    const updatedCompleted = [...user.completedProjects];
    let xpGain = 50;

    if (progressPercent === 100 && !updatedCompleted.includes(projectId)) {
      updatedCompleted.push(projectId);
      xpGain += 200; // Extra completion XP
      addToast(`🎉 Project completed! Unlocked next milestone.`, 'success');
    }

    const updatedUser = {
      ...user,
      progress: updatedProgress,
      completedProjects: updatedCompleted,
      xp: user.xp + xpGain,
      level: Math.floor((user.xp + xpGain) / 500) + 1
    };
    setUser(updatedUser);
    localStorage.setItem('user_session', JSON.stringify(updatedUser));
  };

  return (
    <AppContext.Provider value={{
      user,
      theme,
      toasts,
      toggleTheme,
      addToast,
      login,
      signup,
      logout,
      isProjectLocked,
      enrollInProject,
      updateProjectProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};
