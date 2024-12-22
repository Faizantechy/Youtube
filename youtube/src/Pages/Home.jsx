import React from 'react'
import SideBar from '../components/SideBar'
import Feeds from '../components/Feeds'



const Home = ({sideBar,setVideos, setQuery, query, setIsopen, isOpen}) => {
  return (
    <div className='flex w-screen h-screen'>

      <SideBar sideBar={sideBar} setQuery={setQuery} query={query} isOpen={isOpen}  />

      <Feeds setVideos={setVideos} query={query} setIsopen={setIsopen} isOpen={isOpen}/>

    </div>
  )
}

export default Home
