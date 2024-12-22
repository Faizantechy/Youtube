import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFromApi } from "../utils/FetchFromApi";

function Feeds({ setVideos, query, isOpen }) {
  const [feeds, setFeeds] = useState([]);

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
      className={`lg:ml-[10.2rem] py-2  gap-y-4 w-full h-[923vh] px-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-0  mt-12 ${
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
            className="card w-[360px] h-[auto] border-1 shadow-2xl shadow-gray-600"
            key={videoId}
          >
            <img src={thumbnail} alt={title} className="w-full" />
            <h3 className="font-medium text-xl w-full">{title}</h3>
            <h2 className="font-medium">{author}</h2>
            <span className="mr-2">{viewCount} views</span>
            <span className="mr-2">{publishedText}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default Feeds;
