import React, { createContext, useState, useEffect } from 'react';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const addToast = (text, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const login = async (email, password) => {
    // Admin override
    if (email === 'mailadmin@gmail.com' && password === '123') {
      const adminSession = {
        id: 999,
        name: 'Administrator',
        email: 'mailadmin@gmail.com',
        role: 'admin',
        xp: 9999,
        level: 99,
        streak: 30,
        enrolledCourses: [],
        completedProjects: [],
        progress: {},
        bookmarks: [],
        achievements: ['Admin Console Key'],
        certificates: []
      };
      setUser(adminSession);
      localStorage.setItem('user_session', JSON.stringify(adminSession));
      addToast('Admin session unlocked successfully!', 'success');
      return { success: true, isAdmin: true };
    }

    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        // Fetch full profile info
        const profileRes = await fetch('http://localhost:5001/api/auth/user', {
          headers: { 'Authorization': `Bearer ${data.token}` }
        });
        const profile = await profileRes.json();
        const formattedUser = {
          ...profile,
          role: 'student',
          enrolledCourses: profile.enrolledCourses || [],
          completedProjects: profile.completedProjects || [],
          progress: profile.progress || {},
          bookmarks: profile.bookmarks || [],
          achievements: profile.achievements || [],
          certificates: profile.certificates || []
        };
        setUser(formattedUser);
        localStorage.setItem('user_session', JSON.stringify(formattedUser));
        addToast(`Welcome back, ${formattedUser.name}!`, 'success');
        return { success: true, isAdmin: false };
      } else {
        addToast(data.msg || 'Invalid credentials.', 'error');
        return { success: false, msg: data.msg };
      }
    } catch (err) {
      console.warn('Backend login connection failed. Using local fallback.');
      const studentSession = {
        id: 'mock-session-id',
        name: email.split('@')[0],
        email,
        role: 'student',
        xp: 650,
        level: 2,
        streak: 5,
        enrolledCourses: ['html-calculator', 'css-styling'],
        completedProjects: [],
        progress: { 'html-calculator': 50, 'css-styling': 10 },
        bookmarks: [],
        achievements: ['First Steps', 'Explorer'],
        certificates: []
      };
      setUser(studentSession);
      localStorage.setItem('user_session', JSON.stringify(studentSession));
      addToast(`Welcome back (Fallback Simulation), ${studentSession.name}!`, 'success');
      return { success: true, isAdmin: false };
    }
  };

  const socialLogin = async (provider) => {
    const mockEmail = `${provider.toLowerCase()}_dev_${Math.floor(Math.random() * 1000)}@gmail.com`;
    const mockName = `${provider} Developer`;
    
    try {
      const res = await fetch('http://localhost:5001/api/auth/social-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: mockName, email: mockEmail, provider })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        const formattedUser = {
          ...data.user,
          role: 'student',
          enrolledCourses: data.user.enrolledCourses || [],
          completedProjects: data.user.completedProjects || [],
          progress: data.user.progress || {},
          bookmarks: data.user.bookmarks || [],
          achievements: data.user.achievements || [],
          certificates: data.user.certificates || []
        };
        setUser(formattedUser);
        localStorage.setItem('user_session', JSON.stringify(formattedUser));
        addToast(`Successfully authenticated with ${provider}!`, 'success');
        return { success: true };
      } else {
        addToast(data.msg || `Social registration failed.`, 'error');
        return { success: false, msg: data.msg };
      }
    } catch (err) {
      console.warn('Backend social-auth connection failed. Using local fallback.');
      const studentSession = {
        id: 'mock-social-id',
        name: mockName,
        email: mockEmail,
        role: 'student',
        xp: 150,
        level: 1,
        streak: 1,
        enrolledCourses: [],
        completedProjects: [],
        progress: {},
        bookmarks: [],
        achievements: [`Linked ${provider}`],
        certificates: []
      };
      setUser(studentSession);
      localStorage.setItem('user_session', JSON.stringify(studentSession));
      addToast(`Successfully authenticated with ${provider} (Fallback)!`, 'success');
      return { success: true };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        // Fetch full profile info
        const profileRes = await fetch('http://localhost:5001/api/auth/user', {
          headers: { 'Authorization': `Bearer ${data.token}` }
        });
        const profile = await profileRes.json();
        const formattedUser = {
          ...profile,
          role: 'student',
          enrolledCourses: profile.enrolledCourses || [],
          completedProjects: profile.completedProjects || [],
          progress: profile.progress || {},
          bookmarks: profile.bookmarks || [],
          achievements: profile.achievements || [],
          certificates: profile.certificates || []
        };
        setUser(formattedUser);
        localStorage.setItem('user_session', JSON.stringify(formattedUser));
        addToast('Registered successfully! Welcome to CodeJourney.', 'success');
        return { success: true };
      } else {
        addToast(data.msg || 'Registration failed.', 'error');
        return { success: false, msg: data.msg };
      }
    } catch (err) {
      console.warn('Backend registration failed. Using local fallback.');
      const studentSession = {
        id: 'mock-signup-id',
        name,
        email,
        role: 'student',
        xp: 0,
        level: 1,
        streak: 1,
        enrolledCourses: [],
        completedProjects: [],
        progress: {},
        bookmarks: [],
        achievements: [],
        certificates: []
      };
      setUser(studentSession);
      localStorage.setItem('user_session', JSON.stringify(studentSession));
      addToast('Registered successfully (Fallback)! Welcome to CodeJourney.', 'success');
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    localStorage.removeItem('token');
    addToast('Logged out successfully.', 'info');
  };

  const isProjectLocked = (projectId) => {
    const targetProject = PROJECTS_CURRICULUM.find(p => p.id === projectId);
    if (!targetProject || !targetProject.prereqId) {
      return false; 
    }
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

  const updateProjectProgress = async (projectId, progressPercent) => {
    if (!user) return;
    const updatedProgress = { ...user.progress, [projectId]: progressPercent };
    const updatedCompleted = [...user.completedProjects];
    let xpGain = 50;
    const newAchievements = [...(user.achievements || [])];

    if (progressPercent === 100 && !updatedCompleted.includes(projectId)) {
      updatedCompleted.push(projectId);
      xpGain += 200;
      addToast(`🎉 Project completed! Unlocked next milestone.`, 'success');
      
      if (updatedCompleted.length === 1 && !newAchievements.includes('First Milestone')) {
        newAchievements.push('First Milestone');
        addToast('🏆 Achievement Unlocked: First Milestone!', 'success');
      }
    }

    const updatedUser = {
      ...user,
      progress: updatedProgress,
      completedProjects: updatedCompleted,
      xp: user.xp + xpGain,
      level: Math.floor((user.xp + xpGain) / 500) + 1,
      achievements: newAchievements
    };
    setUser(updatedUser);
    localStorage.setItem('user_session', JSON.stringify(updatedUser));

    // Try posting progress to backend if token exists
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch('http://localhost:5001/api/progress/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            projectId,
            tech: projectId.includes('html') ? 'HTML' : (projectId.includes('css') ? 'CSS' : 'JavaScript'),
            progressPercentage: progressPercent,
            lastCompletedMilestone: progressPercent === 100 ? 'completed' : 'in-progress'
          })
        });
      } catch (err) {
        console.warn('Unable to sync progress with backend server.');
      }
    }
  };

  const toggleBookmark = (projectId) => {
    if (!user) {
      addToast('Authentication required to bookmark projects.', 'warning');
      return;
    }
    const currentBookmarks = user.bookmarks || [];
    const isBookmarked = currentBookmarks.includes(projectId);
    const updatedBookmarks = isBookmarked
      ? currentBookmarks.filter(id => id !== projectId)
      : [...currentBookmarks, projectId];

    const updatedUser = {
      ...user,
      bookmarks: updatedBookmarks
    };
    setUser(updatedUser);
    localStorage.setItem('user_session', JSON.stringify(updatedUser));
    addToast(isBookmarked ? 'Bookmark removed.' : 'Project bookmarked!', 'success');
  };

  const claimCertificate = (courseName) => {
    if (!user) return;
    const currentCerts = user.certificates || [];
    if (currentCerts.includes(courseName)) {
      addToast('Certificate already claimed.', 'info');
      return;
    }
    const updatedUser = {
      ...user,
      certificates: [...currentCerts, courseName]
    };
    setUser(updatedUser);
    localStorage.setItem('user_session', JSON.stringify(updatedUser));
    addToast(`🎓 Congratulations! Certificate claimed for ${courseName}.`, 'success');
  };

  return (
    <AuthContext.Provider value={{
      user,
      toasts,
      addToast,
      login,
      socialLogin,
      signup,
      logout,
      isProjectLocked,
      enrollInProject,
      updateProjectProgress,
      toggleBookmark,
      claimCertificate
    }}>
      {children}
    </AuthContext.Provider>
  );
};
