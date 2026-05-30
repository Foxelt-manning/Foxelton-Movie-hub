import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Movie from './MovieCard'
import Loading from './Loading'

const API_URL = import.meta.env.VITE_API_URL
const LAST_SEARCH_KEY = 'foxelton:last-search'

const Search = () => {
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    const navigate = useNavigate()
    const { query } = useParams()
    const [queryParams] = useSearchParams()
    const page = Number(queryParams.get('page')) || 1

    const searchQuery = async (q, currentPage = 1) => {
        if (!q) return

        localStorage.setItem(LAST_SEARCH_KEY, q)
        setLoading(true)
        setHasSearched(true)

        try {
            const res = await axios.get(`${API_URL}/search/${encodeURIComponent(q)}?page=${currentPage}`)
            setMovies(res.data.movies || [])
        } catch (error) {
            console.error(error)
            setMovies([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const savedSearch = localStorage.getItem(LAST_SEARCH_KEY)

        if (query && query.length >= 3) {
            setSearch(query)
            searchQuery(query, page)
            return
        }

        if (!query && savedSearch) {
            setSearch(savedSearch)
        }
    }, [query, page])

    const handleNext = () => {
        navigate(`/search/${encodeURIComponent(query)}?page=${page + 1}`)
    }

    const handlePrevious = () => {
        if (page > 1) {
            navigate(`/search/${encodeURIComponent(query)}?page=${page - 1}`)
        }
    }

    const handleClick = () => {
        const trimmed = search.trim()
        if (trimmed.length >= 3) {
            setMovies([])
            navigate(`/search/${encodeURIComponent(trimmed)}`)
        }
    }

    const showNoResults = hasSearched && !loading && movies.length === 0

    return (
        <>
            <div className="search">
                <div>
                    <img src="/search.svg" alt="search" onClick={handleClick} />
                    <input
                        type="text"
                        placeholder="Search through a multiverse of movies"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                    />
                </div>
            </div>

            <div className="all-movies">
                {loading ? (
                    <Loading />
                ) : movies.length > 0 ? (
                    <ul>
                        {movies.map((movie) => (
                            <div key={movie.subjectId || movie.id}>
                                <Movie movie={movie} />
                            </div>
                        ))}
                    </ul>
                ) : showNoResults ? (
                    <div className="text-center text-gray-300 py-10">
                        <p className="text-lg font-medium">No results found</p>
                        <p className="text-sm text-gray-400 mt-1">Try a different movie title or spelling.</p>
                    </div>
                ) : null}
            </div>

            <div className="flex justify-center">
                {page > 1 && (
                    <button className="watch-btn mt-4" onClick={handlePrevious}>
                        Previous
                    </button>
                )}

                {movies.length >= 30 && (
                    <button className="watch-btn mt-4" onClick={handleNext}>
                        Next
                    </button>
                )}
            </div>
        </>
    )
}

export default Search