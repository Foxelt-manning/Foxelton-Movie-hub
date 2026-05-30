import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TMDB_CARD from '../components/TMDB_Card'
import Footer from '../components/Footer'
import { getFromCache, saveHomepageCache } from '../utils/save_To_local'
import { Compass, ArrowLeft } from 'lucide-react'

const Discover = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        setLoading(true)
        const cachedDiscover = getFromCache('Discover_page')

        if (cachedDiscover) {
          setMovies(cachedDiscover)
          return
        }

        const url = 'https://api.themoviedb.org/3/discover/movie'
        const options = {
          params: {
            include_video: true,
            include_adult: false,
            language: 'en-US',
            sort_by: 'popularity.desc',
          },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzU3NzU3ZWI1NDUzMGRjZTYxYjc0YWYxYTIwMWVkNyIsIm5iZiI6MTc2MTY1NDAzMi4zNDcwMDAxLCJzdWIiOiI2OTAwYjUxMDJjYjIxZjkzMGFiYzA2OTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R9SaOopKE5jg_LyTYu_qBVwpDFkrgvR9yB7Dg8B6Pys`,
          },
        }

        const res = await axios.get(url, options)
        const newData = res.data.results || []
        setMovies(newData)
        saveHomepageCache('Discover_page', newData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscover()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-lg animate-pulse">Loading discover titles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Compass className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Discover
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              The same discover feed from the home page, expanded into its own page.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="transform hover:scale-105 transition-transform duration-300">
                <TMDB_CARD movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Discover
