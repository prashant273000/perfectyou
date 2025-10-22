import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Helper function to style the active link
  const getLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded-md transition-all duration-200 ${
      isActive
        ? 'bg-brand-plum text-white'
        : 'text-brand-charcoal hover:bg-brand-lavender/50'
    }`;

  return (
    <div className="bg-white w-60 h-screen p-4 shadow-lg">
      <ul className="space-y-2">
        <li><NavLink to="/hairstyle" className={getLinkClass}>Hairstyle</NavLink></li>
        <li><NavLink to="/pimples" className={getLinkClass}>Pimples</NavLink></li>
        <li><NavLink to="/moustache" className={getLinkClass}>Moustache</NavLink></li>
        <li><NavLink to="/spectacles" className={getLinkClass}>Spectacles</NavLink></li>
        <li><NavLink to="/hair" className={getLinkClass}>Hair</NavLink></li>
        <li><NavLink to="/clothing" className={getLinkClass}>Clothing</NavLink></li>
        <li><NavLink to="/fitness" className={getLinkClass}>Fitness</NavLink></li>
        <li><NavLink to="/diet" className={getLinkClass}>Diet</NavLink></li>
        <li><NavLink to="/disease" className={getLinkClass}>Disease</NavLink></li>
        <li><NavLink to="/confidence" className={getLinkClass}>Confidence</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;