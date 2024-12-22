import React, { useState } from "react";

import menu_icon from "../assets/menu.png";
import logo from "../assets/logo.png";
import more from "../assets/more.png";
import upload from "../assets/upload.png";
import jack from "../assets/jack.png";

const NavBar = ({ setSideBar, setQuery, setIsopen, isOpen }) => {
  const [value, setValue] = useState("");


  if (value.length > 0) {
    setQuery(value);
  }

  return (
    <div className={`w-full flex items-center justify-between lg:px-4 py-2 border-b-1 shadow-xl fixed ${isOpen ? 'bg-black text-white' : 'bg-white'}`}>
<div className="logo-menu flex gap-2 items-center">
  {isOpen ? (
    <div className="flex items-center gap-2">
      <i className="ri-play-circle-fill text-4xl font-bold text-[rgb(237,56,51)]"></i>
      <span className="text-2xl font-bold text-white font-[arial]">
        VidTube
      </span>
    </div>
  ) : (
    <img
      src={logo}
      alt="Logo"
      className="lg:w-[130px] w-[100px] hidden sm:block"
    />
  )}
</div>



      {/* Red "V" for very small screens */}
      <div className="logo-menu flex gap-2 items-center sm:hidden">
        <span className="text-red-500 font-bold text-2xl">ViD</span>
      </div>

      {/* Search Bar */}
      <div className="searchbar lg:mr-0 mr-5">
        <div className="lg:w-[440px] h-[350px] sm:w-[120px] px-2 rounded-xl flex border-2 border-gray-400">
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none"
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <i className="ri-search-line"></i>
        </div>
      </div>

      {/* Icons for Larger Screens */}
      <div className="nav-icons hidden lg:flex items-center gap-4">
        <img src={upload} alt="Upload" className="w-[30px]" />
        <img src={more} alt="More" className="w-[30px]" />
        <i className="ri-notification-2-fill"></i>
        <img src={jack} alt="Profile" className="w-[30px] rounded-full" />


        <div className="darkMode active:scale-90 text-xl font-bold" onClick={()=>{

          setIsopen((prev)=> !prev)
        }}>

        {isOpen ? (
          <i className="ri-moon-fill text-orange-500"></i>
        ) : (
          <i className="ri-moon-line "></i>
        )}

        </div>

       
      </div>
    </div>
  );
};

export default NavBar;
