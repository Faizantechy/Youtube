import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/FetchFromApi";
import axios from "axios";

const VideoPlayer = ({ videos, isOpen }) => {
  const { videoId } = useParams();

  const [userComments, setUserComments] = useState([]);
  const [feeds, setFeeds] = useState([]);

  const [channelId,setChannelId]=useState('')

  const selectedVideo = videos.filter(
    (video) => String(video.videoId) === videoId
  );

  const recommendations = [
    {
      title: "How to Build a Gaming PC",
      thumbnail: "https://i.ytimg.com/vi/8svJ8b9Cx2M/maxresdefault.jpg",
      channel: "TechGuru",
      views: "1.2M views",
    },
    {
      title: "10 Life-Changing Productivity Hacks",
      thumbnail: "https://i.ytimg.com/vi/nl-MGDC8UoY/maxresdefault.jpg",
      channel: "LifeHacker",
      views: "3.4M views",
    },
    {
      title: "Top 5 Smartphone Reviews",
      thumbnail: "https://i.ytimg.com/vi/9xJmMi66Fl0/maxresdefault.jpg",
      channel: "TechWorld",
      views: "2.1M views",
    },
  ];

  const getComments = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyAIP2ObIY0Iv4v97RaEbm5UeHNIuTC0eDQ`
    );

    const fetchedData = response.data.items.map((item) => ({
      name: item.snippet.topLevelComment.snippet.authorDisplayName,
      comment: item.snippet.topLevelComment.snippet.textDisplay,
      profilePic: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
    }));

    if (fetchedData.length > 0) {
      setUserComments(fetchedData);
    }
  };



  useEffect(() => {
    getComments();
  }, [videoId]);

  useEffect(() => {
    fetchFromApi("trending").then((data) => {
      setFeeds(data.data);
    });
  }, []);

  return (
    <div className={`flex flex-col lg:flex-row w-full ${isOpen?'bg-black text-white':'bg-white'}`}>
      {/* Video and Comments Section */}
      <div className="flex flex-col lg:w-2/3 w-full bg-white  lg:mt-12">
        {/* Video Section */}
        <div className="aspect-w-16 aspect-h-9 bg-black mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            className="w-full  lg:h-[420px] h-[240px] object-cover rounded-xl"
          ></iframe>
        </div>

        <h1 className="text-xl font-semibold mb-2">{selectedVideo.title}</h1>
        <div className="flex lg:flex-row flex-col items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjk9ZnVHLvlJKay80hXEPCBZpYpxPKD8oG3A&s`}
                alt="Channel Icon"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex gap-[4rem]">
                <div className="div flex items-center">
                  <h2 className="font-semibold">{selectedVideo.author}</h2>
                  <span className="text-gray-600 text-medium font-semibold">
                    1.5M subscribers
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <button className="bg-red-600 text-white rounded-xl px-4 py-2 hover:bg-red-900 active:scale-90 text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-gray-700 font-bold lg:mt-0 mt-5">
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800 active:scale-90">
              <i className="ri-thumb-up-line"></i> <span>Like</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800 active:scale-90">
              <i className="ri-thumb-down-line"></i> <span>Dislike</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800 active:scale-90">
              <i className="ri-share-line"></i> <span>Share</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800 active:scale-90">
              <i className="ri-save-line"></i> <span>Save</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="lg:w-full bg-gray-100 p-4 overflow-y-auto mt-6 lg:mt-0 lg:h-[1300px]">
          <h2 className="text-lg font-semibold mb-4">
            {userComments.length} Comments
          </h2>
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full border rounded p-2 mb-4"
          />
          <ul className="space-y-4 overflow-hidden">
            {userComments.map((comment, index) => (
              <li key={index} className="border-b pb-4">
                <div className="flex gap-4 items-start">
                  <img
                    src={comment.profilePic}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{comment.name}</h3>
                    <p className="text-sm text-gray-700">{comment.comment}</p>
                    <div className="flex items-center space-x-4 text-gray-600 text-sm mt-2">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <i className="ri-thumb-up-line"></i> <span>12</span>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <i className="ri-thumb-down-line"></i> <span>3</span>
                      </div>
                      <span className="cursor-pointer">Reply</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="lg:w-1/3 bg-gray-100 p-4 mt-4 lg:mt-0 overflow-y-auto h-[1300px]">
        <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
        <ul className="space-y-6">
          {feeds.map((video, index) => (
            <Link to={`/video/${video.videoId}`} key={index} className="flex flex-col gap-4 items-start border-b pb-4">
              <div className="w-full bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="w-full h-[200px] object-cover rounded"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="flex gap-4 w-full">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-xs text-gray-600">{video.channel}</p>
                  <p className="text-xs text-gray-600">{video.views}</p>
                  <p className="text-xs text-gray-600">{video.duration}</p>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPlayer;
