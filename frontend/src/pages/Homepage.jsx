import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Movie from '../components/MovieCard'
// Carousel intentionally not used here — using grid like Discover
import Search from '../components/Search'
import TMDB_CARD from '../components/TMDB_Card'
import Footer from '../components/Footer'
import { getFromCache, saveHomepageCache } from '../utils/save_To_local'
import { Film, TrendingUp, Compass, Star, Play } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL
const TMDB_TOKEN = import.meta.env.TMDB_API_TOKEN

const Homepage = () => {
    const [movies, setMovies] = useState([])
    const [trending, setTrending] = useState([])
    const [tmdb, setTmdb] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                
                // Check cache first
                const cachedTopPicks = getFromCache('Homepage_topPicks')
                if (cachedTopPicks) {
                    setMovies(cachedTopPicks)
                }
                
                const cachedTrending = getFromCache('Homepage_trending')
                if (cachedTrending) {
                    setTrending(cachedTrending)
                }
                
                const cachedDiscover = getFromCache('Homepage_discover')
                if (cachedDiscover) {
                    setTmdb(cachedDiscover)
                }

                // Fetch data if not cached
                if (!cachedTopPicks) {
                    const fetchHomepage = async () => {
                        const res = await axios.get(`${API_URL}/home`)
                        setMovies(res.data.movies)
                        saveHomepageCache('Homepage_topPicks', res.data.movies)
                    }
                    await fetchHomepage()
                }
                
                await new Promise(r => setTimeout(r, 200))
                
                if (!cachedTrending) {
                    const fetchTrending = async () => {
                        const res = await axios.get(`${API_URL}/trending`)
                        const newData = res.data.trendingData
                        setTrending(newData)
                        saveHomepageCache('Homepage_trending', newData)
                    }
                    await fetchTrending()
                }

                if (!cachedDiscover) {
                    const fetchTMDB = async () => {
                        const url = "https://api.themoviedb.org/3/discover/movie"
                        const options = {
                            params: {
                                include_video: true,
                                include_adult: false,
                                language: "en-US",
                                sort_by: "popularity.desc"
                            },
                            headers: {
                                accept: "application/json",
                                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzU3NzU3ZWI1NDUzMGRjZTYxYjc0YWYxYTIwMWVkNyIsIm5iZiI6MTc2MTY1NDAzMi4zNDcwMDAxLCJzdWIiOiI2OTAwYjUxMDJjYjIxZjkzMGFiYzA2OTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R9SaOopKE5jg_LyTYu_qBVwpDFkrgvR9yB7Dg8B6Pys`
                            }
                        }
                        const res = await axios.get(url, options)
                        const TMDB = res.data.results
                        setTmdb(TMDB)
                        saveHomepageCache('Homepage_discover', TMDB)
                    }
                    await fetchTMDB()
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white text-lg animate-pulse">Loading amazing content...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                <Film className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Foxelton Movie Hub
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Discover amazing movies and TV shows from around the world
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <Search />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {/* Top Picks Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Top Picks</h2>
                            <p className="text-gray-400">Handpicked just for you</p>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {movies.map((item) => (
                                <div key={item.subjectId || item.id} className="transform hover:scale-105 transition-transform duration-300">
                                    <Movie movie={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trending Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Trending Now</h2>
                            <p className="text-gray-400">What everyone's watching</p>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {trending.map((item) => (
                                <div key={item.subjectId || item.id} className="transform hover:scale-105 transition-transform duration-300">
                                    <Movie movie={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Discover Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <Compass className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Discover</h2>
                            <p className="text-gray-400">Explore new horizons</p>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {tmdb.map((movie) => (
                                <div key={movie.id} className="transform hover:scale-105 transition-transform duration-300">
                                    <TMDB_CARD movie={movie} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}

export default Homepage