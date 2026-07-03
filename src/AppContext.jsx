import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [toasts, setToasts] = useState([]);

  // Load user session and theme from localStorage on start
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
    // Normal admin credentials check
    if (email === 'admin@gmail.com' && password === '123') {
      const adminSession = {
        name: 'Administrator',
        email: 'admin@gmail.com',
        role: 'admin',
        xp: 9999,
        level: 99,
        streak: 30,
        enrolledCourses: [],
        completedProjects: [],
        progress: {}
      };
      setUser(adminSession);
      localStorage.setItem('user_session', JSON.stringify(adminSession));
      addToast('Admin logged in successfully!', 'success');
      return { success: true, isAdmin: true };
    }

    // Mock student credentials verification
    const studentSession = {
      name: email.split('@')[0],
      email,
      role: 'student',
      xp: 250,
      level: 1,
      streak: 1,
      enrolledCourses: [],
      completedProjects: [],
      progress: {}
    };
    setUser(studentSession);
    localStorage.setItem('user_session', JSON.stringify(studentSession));
    addToast('Logged in successfully!', 'success');
    return { success: true, isAdmin: false };
  };

  const signup = (name, email, password) => {
    const studentSession = {
      name,
      email,
      role: 'student',
      xp: 0,
      level: 1,
      streak: 0,
      enrolledCourses: [],
      completedProjects: [],
      progress: {}
    };
    setUser(studentSession);
    localStorage.setItem('user_session', JSON.stringify(studentSession));
    addToast('Account created successfully!', 'success');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    localStorage.removeItem('token');
    addToast('Logged out successfully.', 'info');
  };

  const enrollInProject = (projectId) => {
    if (!user) {
      addToast('Please login to enroll in courses.', 'warning');
      return false;
    }

    if (user.enrolledCourses.includes(projectId)) {
      return true; // Already enrolled
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
    if (progressPercent === 100 && !updatedCompleted.includes(projectId)) {
      updatedCompleted.push(projectId);
    }
    const updatedUser = {
      ...user,
      progress: updatedProgress,
      completedProjects: updatedCompleted,
      xp: user.xp + (progressPercent === 100 ? 250 : 50)
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
      enrollInProject,
      updateProjectProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};
