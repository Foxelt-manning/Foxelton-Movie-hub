import axios from 'axios'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const AUTH_HEADER = {
  accept: 'application/json',
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzU3NzU3ZWI1NDUzMGRjZTYxYjc0YWYxYTIwMWVkNyIsIm5iZiI6MTc2MTY1NDAzMi4zNDcwMDAxLCJzdWIiOiI2OTAwYjUxMDJjYjIxZjkzMGFiYzA2OTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R9SaOopKE5jg_LyTYu_qBVwpDFkrgvR9yB7Dg8B6Pys`
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || null

export async function searchAndFind(title, year) {
  if (!title) return null
  const url = `${TMDB_BASE}/search/movie`
  const params = { query: title, language: 'en-US', include_adult: false }
  if (API_KEY) params.api_key = API_KEY
  const res = await axios.get(url, API_KEY ? { params } : { params, headers: AUTH_HEADER })
  const items = res.data.results || []
  // prefer exact title match
  const ql = title.toLowerCase()
  let filtered = items.filter(it => ((it.title || it.original_title || '').toLowerCase() === ql))
  if (year) {
    filtered = filtered.filter(it => it.release_date && new Date(it.release_date).getFullYear() === Number(year))
  }
  const pick = filtered.length > 0 ? filtered[0] : (items.length > 0 ? items[0] : null)
  return pick
}

export async function getMovieDetailsById(id) {
  if (!id) return null
  const url = `${TMDB_BASE}/movie/${id}`
  const params = { language: 'en-US' }
  if (API_KEY) params.api_key = API_KEY
  const res = await axios.get(url, API_KEY ? { params } : { params, headers: AUTH_HEADER })
  return res.data
}

export const IMG_BASE = 'https://image.tmdb.org/t/p/w500' 
