import React from 'react'
import { Routes,Router,Route   } from 'react-router-dom'
import Homepage from './pages/Homepage'
import MovieDetails from './pages/MovieDetails'
import StreamAndDownload from './pages/StreamAndDownload'
import Search from './components/Search'
import NavBar from './components/NavBar'


const App = () => {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/movie/:subjectId" element={<MovieDetails/>}/>
        <Route path="/stream-download/:subjectId" element={<StreamAndDownload/>}/>
        <Route path="/search/:query" element={<Search/>}/>
      </Routes>
    </>
    
  )
}

export default App