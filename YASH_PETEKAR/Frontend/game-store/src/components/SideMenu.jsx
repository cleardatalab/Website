import React, { useState } from 'react';
import './sideMenu.css';
import NavListItem from './NavListItem';
import navListData from '../data/navListData';
import SocialListItem from './SocialListItem';
import socialListData from '../data/socialListData';
import { useNavigate } from "react-router-dom";

function SideMenu({ active, sectionActive }) {
  const [navData, setNavData] = useState(navListData);
  const [socialData, setSocialData] = useState(socialListData)
  const navigate = useNavigate();

  const handleNavonClick = (id,target) => {
    const newNavData = navData.map(nav => ({
      ...nav, 
      active: nav.id === id 
    }));
    setNavData(newNavData); 
    sectionActive(target);	
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); 
    localStorage.removeItem("userId");
    navigate("/login"); 
  };
  return (
    <div className={`sideMenu ${active ? 'active' : ""}`}>
      <a href="#" className="logo">
        <i className="bi bi-controller"></i>
        <span className="brand">Game Store</span>
      </a>
      <ul className="nav">
        {navData.map((item) => (
          <NavListItem 
          key={item.id} 
          item={item} 
          navOnClick = {handleNavonClick} />
        ))}
      </ul>
      <ul className="social">
        <button onClick={handleLogout} className="logout-button">
          <i className="bi bi-box-arrow-right logout-icon"></i>
        </button>
        {/* {socialData.map((item) => (
          <SocialListItem key={item.id} item={item} />
        ))} */}
      </ul>
    </div>
  );
}

export default SideMenu;

