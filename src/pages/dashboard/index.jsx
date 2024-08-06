import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/sidebar';
import CoursesSection from '../../components/courseSection';
import WithdrawalsSection from '../../components/withdrawalSection';
import './dashboard.css';

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState('courses'); 
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="admin-dashboard">
      <Sidebar 
        handleSectionChange={handleSectionChange} 
        activeSection={activeSection} 
        className={sidebarVisible ? '' : 'hidden'} 
      />
      <button className="toggle-btn" onClick={handleToggleSidebar}>
        {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <main className={`content1 ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
        {activeSection === 'courses' && <CoursesSection userId={currentUser?.user?._id} />}
        {activeSection === 'withdrawals' && <WithdrawalsSection userId={currentUser.user._id} />}
      </main>
    </div>
  );
};

export default DashboardPage;
