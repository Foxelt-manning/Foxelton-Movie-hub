import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IMG_BASE } from '../utils/tmdb'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const AUTH_HEADER = {
  accept: 'application/json',
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzU3NzU3ZWI1NDUzMGRjZTYxYjc0YWYxYTIwMWVkNyIsIm5iZiI6MTc2MTY1NDAzMi4zNDcwMDAxLCJzdWIiOiI2OTAwYjUxMDJjYjIxZjkzMGFiYzA2OTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R9SaOopKE5jg_LyTYu_qBVwpDFkrgvR9yB7Dg8B6Pys`
}

const Ttmdb_description = ({ title, year, onSelect }) => {
  const [query, setQuery] = useState(title || '')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [main, setMain] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (title) {
      setQuery(title)
      doSearch(title)
    }
  }, [title])

  const navigate = useNavigate()

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY || null

  const doSearch = async (q) => {
    if (!q) return
    setLoading(true)
    setError(null)
    try {
      const url = `${TMDB_BASE}/search/movie`
      const params = { query: q, language: 'en-US', include_adult: false }
      if (API_KEY) params.api_key = API_KEY

      const res = await axios.get(url, API_KEY ? { params } : { params, headers: AUTH_HEADER })
      const items = res.data.results || []
      // Prefer exact title (case-insensitive) and matching year if available
      let filtered = items.filter(it => {
        const t = (it.title || it.original_title || '').toLowerCase()
        const ql = q.toLowerCase()
        if (t === ql) return true
        return false
      })
      if (year) {
        filtered = filtered.filter(it => {
          if (!it.release_date) return false
          return new Date(it.release_date).getFullYear() === Number(year)
        })
      }

      const pick = (filtered.length > 0 ? filtered[0] : (items.length > 0 ? items[0] : null))
      setResults(items)
      if (pick) {
        const id = pick.id
        const paramsDetail = { language: 'en-US' }
        if (API_KEY) paramsDetail.api_key = API_KEY
        const detailRes = await axios.get(`${TMDB_BASE}/movie/${id}`, API_KEY ? { params: paramsDetail } : { params: paramsDetail, headers: AUTH_HEADER })
        setMain(detailRes.data)
      } else {
        setMain(null)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch TMDB results')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    doSearch(query)
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-3">TMDB — Search</h3>
      <form onSubmit={onSubmit} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search TMDB by title"
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white"
        />
        <button className="px-4 py-2 bg-purple-600 rounded-lg">Search</button>
      </form>

      {loading && <p className="text-gray-300">Searching TMDB...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {main && (
        <div className="mb-4">
          <img src={main.backdrop_path ? IMG_BASE + main.backdrop_path : (main.poster_path ? IMG_BASE + main.poster_path : '/no-movie.png')} alt={main.title} className="w-full rounded-lg mb-3" />
          <h4 className="text-white font-semibold">{main.title} <span className="text-gray-400">({new Date(main.release_date || '').getFullYear() || 'N/A'})</span></h4>
          <p className="text-gray-300 text-sm mt-2">{main.tagline}</p>
          <p className="text-gray-300 text-sm mt-2">{main.overview}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {(main.genres || []).map((g) => (
              <span key={g.id} className="px-3 py-1 bg-white/5 text-white rounded-full text-xs">{g.name}</span>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-2">Runtime: {main.runtime ? `${main.runtime} min` : 'N/A'}</p>
          {onSelect && (
            <div className="mt-3">
              <button onClick={() => onSelect(main.overview)} className="px-3 py-2 bg-green-600 rounded-lg text-sm">Use as description</button>
            </div>
          )}
        </div>
      )}

      <div>
        <h4 className="text-white font-medium mb-2">Related Results</h4>
        {results.length === 0 && !loading && <p className="text-gray-300">No results found.</p>}
        <div className="grid grid-cols-2 gap-3">
          {results.slice(0, 8).map((r) => (
            <a key={r.id} href={`/movie/tmdb-${r.id}`} className="block bg-white/5 p-2 rounded-lg hover:bg-white/10" onClick={(e)=>{e.preventDefault(); navigate(`/movie/tmdb-${r.id}`)}}>
              <img src={r.poster_path ? IMG_BASE + r.poster_path : '/no-movie.png'} alt={r.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <p className="text-white text-sm font-medium truncate">{r.title}</p>
              <p className="text-gray-400 text-xs">{r.release_date ? new Date(r.release_date).getFullYear() : ''}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ttmdb_description