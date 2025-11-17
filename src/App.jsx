import React from 'react'
import { Routes,Router,Route   } from 'react-router-dom'
import Homepage from './pages/Homepage'
import MovieDetails from './pages/MovieDetails'
import StreamAndDownload from './pages/StreamAndDownload'


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/movie/:subjectId" element={<MovieDetails/>}/>
        <Route path="/stream-download/:subjectId" element={<StreamAndDownload/>}/>
      </Routes>
    
  )
}

export default App