import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userImg from "../images/default_profile.png";
import { AppContext } from "../App";
import "./header.css";

function Header({ toggleActive, sectionActive }) {
  const navigate = useNavigate();
  const { library } = useContext(AppContext);
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState({
    profileImage: null,
    fullName: "Update Profile"
  });

  useEffect(() => {
    if (!userId) return;
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/profiles/users/${userId}`);
        if (response.data) {
          setProfile({
            profileImage: response.data.profileImagePath 
              ? response.data.profileImagePath.replace(/\\/g, "/") 
              : null,
            fullName: response.data.firstName && response.data.lastName
              ? `${response.data.firstName} ${response.data.lastName}`
              : "Update Profile"
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <header>
      <a href="#" className="menu" onClick={toggleActive}></a>
      <div className="userItems">
        <a href="#" className="icon">
          <i className="bi bi-heart-fill"></i> <span className="like">{library.length}</span>
        </a>
        <div className="avatar">
          <a href="#">
            <img src={profile.profileImage || userImg} alt="User Image" />
          </a>
          <div className="user" onClick={() => sectionActive("Profile")}>
            <a href="#"><span>{profile.fullName}</span></a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
