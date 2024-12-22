import React, { useState } from "react";

import home_icon from "../assets/home.png";
import gaming_icon from "../assets/game_icon.png";
import entertainment_icon from "../assets/entertainment.png";
import sports_icon from "../assets/sports.png";
import tech_icon from "../assets/tech.png";
import music_icon from "../assets/music.png";
import blogs_icon from "../assets/blogs.png";
import news_icon from "../assets/news.png";
import automobiles_icon from "../assets/automobiles.png";

const SideBar = ({ sideBar, setQuery, query }) => {
  const categories = [
    { label: "Gaming", icon: gaming_icon },
    { label: "Cars", icon: automobiles_icon },
    { label: "Comedy", icon: sports_icon },
    { label: "Movies", icon: entertainment_icon },
    { label: "Music", icon: music_icon },
    { label: "Technology", icon: tech_icon },
    { label: "News", icon: news_icon },
    { label: "Funny Videos", icon: blogs_icon },
    { label: "Shorts", icon: blogs_icon },
  ];

  const subscribedList = [
    {
      name: "PewDiePie",
      img: "https://hips.hearstapps.com/hmg-prod/images/pewdiepie_gettyimages-501661286.jpg?crop=1xw:1.0xh;center,top&resize=640:*",
    },
    {
      name: "Mr Beast",
      img: "https://hips.hearstapps.com/hmg-prod/images/pewdiepie_gettyimages-501661286.jpg?crop=1xw:1.0xh;center,top&resize=640:*",
    },
    {
      name: "Justin Bieber",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5XV6Ve8QkCDeUG4HyF1ceW53BGfSyyp4gsw&s",
    },
    {
      name: "5 Minutes Craft",
      img: "https://upload.wikimedia.org/wikipedia/en/9/96/5-Minute_Crafts_logo.jpg",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {/* Navbar for small screens */}
      <div
        className={`lg:hidden fixed top-11 left-0 right-0 z-10 bg-white shadow-md h-[50px] px-4 flex items-center justify-between`}
        style={{ boxSizing: "border-box" }}
      >
        <div className="flex gap-8 overflow-x-auto Categories w-full">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer whitespace-nowrap"
              onClick={() => setQuery(category.label)}
            >
              <img src={category.icon} alt={category.label} className="w-[20px]" />
              <span
                className={`text-sm ml-1 ${
                  query === category.label ? "text-red-500 font-bold" : ""
                }`}
              >
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add space below fixed navbar */}
      <div className="lg:hidden h-[50px]"></div>

      {/* Sidebar for larger screens */}
      <div
        className={`fixed top-12 left-0 w-[12vw] h-[calc(100vh-12px)] py-3 shadow-xl lg:block hidden px-1 ${
          isOpen ? "bg-black text-white" : "bg-white"
        }`}
      >
        <div className="categories space-y-5 flex lg:flex-col lg:gap-0 gap-10">
          {categories.map((category, index) => (
            <li key={index} className="flex gap-2 items-center">
              <img
                src={category.icon}
                alt=""
                className={`w-[20px] ${query === category.label ? "border-b-5" : ""}`}
              />
              <span
                className={`${
                  query === category.label
                    ? "text-red-500 font-bold text-xl"
                    : ""
                }`}
                onClick={() => {
                  setQuery(category.label);
                }}
              >
                {category.label}
              </span>
            </li>
          ))}
        </div>

        {/* Subscribed List */}
        <div className="subscribed-list space-y-5 mt-8 ml-2 text-[17px] w-full">
          <h3 className="text-gray-400 font-semibold">SUBSCRIBED</h3>
          {subscribedList.map((item, index) => (
            <li key={index} className="flex gap-2 cursor-pointer">
              <img
                src={item.img}
                alt=""
                className="w-[30px] h-[30px] rounded-full"
              />
              <span
                className={sideBar ? "" : "hidden"}
                onClick={() => {
                  setQuery(item.name);
                }}
              >
                {item.name}
              </span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
