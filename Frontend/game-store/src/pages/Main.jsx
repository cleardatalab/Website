import React, { useEffect, useState, useRef, useContext } from "react";
import "./main.css";
import SideMenu from "../components/SideMenu";
import Header from "./Header";
import Home from "./Home";
import Categories from "./Categories";
import MyLibrary from "./MyLibrary";
import { AppContext } from "../App";
import Profile from "../components/Profile";

function Main() {
  const [games, setGames] = useState([]);
  const { library } = useContext(AppContext);

  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const profileRef = useRef();

  const [sections, setSections] = useState([
    { name: "Home", ref: homeRef, active: true },
    { name: "Categories", ref: categoriesRef, active: false },
    { name: "My Library", ref: libraryRef, active: false },
    { name: "Profile", ref: profileRef, active: false },
  ]);

  const handleSectionActive = (target) => {
    sections.forEach((section) => {
      if (section.ref.current) {
        if (section.ref.current.id === target) {
          section.ref.current.style.display = "block";
          setTimeout(() => {
            section.ref.current.classList.add("active");
          }, 50);
        } else {
          section.ref.current.classList.remove("active");
          setTimeout(() => {
            section.ref.current.style.display = "none";
          }, 500);
        }
      }
    });
  };
  

  const fetchData = () => {
    fetch("http://localhost:3000/api/freegames.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <SideMenu sectionActive={handleSectionActive} />
      <div className="mainContent">
        <Header sectionActive={handleSectionActive} />
        {games.length > 0 && (
          <>
            <Home games={games} reference={homeRef} id="Home" />
            <Categories games={games} reference={categoriesRef} id="Categories" />
            <MyLibrary games={library} reference={libraryRef} id="My Library" />
            <Profile reference={profileRef} id="Profile" />
          </>
        )}
      </div>
    </div>
  );
}

export default Main;
