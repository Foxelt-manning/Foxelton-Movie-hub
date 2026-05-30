import axios from 'axios'
import Movie from '../models/Movies.js'
import { BASE_API } from '../config/env.js'

export async function StoreMoviesInDb(search, page = 1) {
    const url = `${BASE_API}search/${encodeURIComponent(search)}?page=${page}`
    const dataFromApi = await axios.get(url)
    const moviesData = dataFromApi.data?.data?.items || []

    const enrichedMovies = moviesData.map((movie) => ({
        ...movie,
        page,
        searchQuery: search,
    }))

    const existingMovies = await Movie.find({
        subjectId: { $in: enrichedMovies.map((movie) => movie.subjectId) },
    }).distinct('subjectId')

    const newMovies = enrichedMovies.filter((movie) => !existingMovies.includes(movie.subjectId))

    if (newMovies.length > 0) {
        await Movie.insertMany(newMovies, { ordered: false })
    }

    return enrichedMovies
}




