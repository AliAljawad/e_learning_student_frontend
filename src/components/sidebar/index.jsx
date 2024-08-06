import React from 'react';
import './sidebar.css'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../data_source/redux/userSlice/slice';

const Sidebar = ({ handleSectionChange, activeSection, className }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className={`sidebar ${className}`}>
      <h1>Dashboard</h1>
      <ul>
        <li
          
          onClick={() => navigate('/courses')}
        >
          All courses
        </li>
        <li
          className={activeSection === 'courses' ? 'active' : ''}
          onClick={() => handleSectionChange('courses')}
        >
          My courses
        </li>
        <li
          className={activeSection === 'withdrawals' ? 'active' : ''}
          onClick={() => handleSectionChange('withdrawals')}
        >
          Withdrawals
        </li>
        <li
          className={activeSection === 'logout' ? 'active' : ''}
          onClick={() => handlelogout('logout')}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
