import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import MovieDetails from './pages/MovieDetails'
import StreamAndDownload from './pages/StreamAndDownload'
import Search from './components/Search'
import NavBar from './components/NavBar'
import PwaInstallPopup from './components/PwaInstallPopup'
import NotFound from './pages/NotFound'
import Trending from './pages/Trending'
import Discover from './pages/Discover'


const App = () => {
  return (
    <>
      <NavBar/>
      <PwaInstallPopup />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/movie/:subjectId" element={<MovieDetails/>}/>
        <Route path="/stream-download/:subjectId" element={<StreamAndDownload/>}/>
        <Route path="/search/:query" element={<Search/>}/>
        <Route path="/trending" element={<Trending/>} />
        <Route path="/discover" element={<Discover/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
    
  )
}

export default App