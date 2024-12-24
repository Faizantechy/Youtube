import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFromApi } from "../utils/FetchFromApi";

function Feeds({ setVideos, query, isOpen }) {
  const [feeds, setFeeds] = useState([]);


  const [channelID,setChannelId]=useState('')

  useEffect(() => {
    fetchFromApi("trending").then((data) => {
      setFeeds(data.data);
    });
  }, []);

  useEffect(() => {
    fetchFromApi(`search?q=${query}`).then((data) => {
      setFeeds([]);
      setFeeds(data.data);
    });
  }, [query]);

  useEffect(() => {
    if (feeds.length > 0) {
      setVideos(feeds);
    }
  }, [feeds]);

  return (
    <div
      className={`lg:ml-[10.2rem] py-2  gap-y-10 w-full h-[923vh] px-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-0  mt-12 ${
        isOpen ? "bg-black text-white" : "bg-white"
      }`}
    >
      {feeds.map((feed) => {


        const {
          title,
          videoId,
          author,
          viewCount,
          publishedText,
          videoThumbnails,
        } = feed;

        const thumbnail =
          videoThumbnails && videoThumbnails.length > 0
            ? videoThumbnails[0].url
            : "";

        return (
          <Link
            to={`/video/${videoId}`}
            className="card w-[350px] h-auto pb-10 space-y-2  border-1 shadow-xl shadow-gray-600"
            key={videoId}
          >
            <img src={thumbnail} alt={title} className="w-full h-[70%]" />
            <h3 className=" px-2 font-medium text-xl w-full">{title.slice(0,45)}.</h3>
            <h2 className=" px-2 font-medium">{author}</h2>
            <span className=" px-2 mr-2">{viewCount} views</span>
            <span className=" px-2 mr-2">{publishedText}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default Feeds;
