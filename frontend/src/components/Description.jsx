import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'
import { Play, Star, Calendar, Clock, Globe, Users, ChevronDown, ChevronUp, Film } from 'lucide-react'

const Description = ({ descriptionData }) => {
    const [expandedSynopsis, setExpandedSynopsis] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')

    if (!descriptionData || descriptionData.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white text-lg animate-pulse">Loading movie details...</p>
                </div>
            </div>
        )
    }

    const data = Array.isArray(descriptionData) ? descriptionData[0] : descriptionData
    const { subjectId, title, genre, releaseDate, metadata, trailer, stars, seasons, imdbRatingValue, duration, countryName } = data

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Film },
        { id: 'trailer', label: 'Trailer', icon: Play },
        { id: 'cast', label: 'Cast', icon: Users },
        { id: 'seasons', label: 'Seasons', icon: Calendar }
    ]

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating / 2)
        const hasHalfStar = rating % 2 >= 1
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
        }
        if (hasHalfStar && fullStars < 5) {
            stars.push(<Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />)
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<Star key={i} className="w-4 h-4 text-gray-600" />)
        }
        return stars
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Background */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${metadata?.image || '/no-movie.png'})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
                </div>
                
                {/* Floating Movie Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in-up">
                            {title}
                        </h1>
                        
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="text-white font-semibold">{imdbRatingValue}/10</span>
                            </div>
                            
                            {duration > 0 && (
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Clock className="w-5 h-5 text-white" />
                                    <span className="text-white">{Math.floor(duration / 3600)}h {Math.floor((duration % 3600) / 60)}m</span>
                                </div>
                            )}
                            
                            {releaseDate && (
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Calendar className="w-5 h-5 text-white" />
                                    <span className="text-white">{new Date(releaseDate).getFullYear()}</span>
                                </div>
                            )}
                        </div>
                        
                        {genre && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {genre.map((g, i) => (
                                    <span 
                                        key={i} 
                                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
                                        activeTab === tab.id
                                            ? 'text-purple-400 border-purple-400 bg-white/5'
                                            : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Synopsis */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
                                <div className="text-gray-300 leading-relaxed">
                                    {expandedSynopsis || metadata?.description?.length < 300 
                                        ? metadata?.description 
                                        : `${metadata?.description?.substring(0, 300)}...`
                                    }
                                    {metadata?.description?.length > 300 && (
                                        <button
                                            onClick={() => setExpandedSynopsis(!expandedSynopsis)}
                                            className="ml-2 text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                                        >
                                            {expandedSynopsis ? (
                                                <>
                                                    Show less <ChevronUp className="w-4 h-4" />
                                                </>
                                            ) : (
                                                <>
                                                    Read more <ChevronDown className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Movie Info */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                <h2 className="text-2xl font-bold text-white mb-4">Details</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-purple-400" />
                                        <div>
                                            <p className="text-gray-400 text-sm">Country</p>
                                            <p className="text-white font-medium">
                                                {Array.isArray(countryName) ? countryName.join(', ') : countryName || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="w-5 h-5 text-purple-400" />
                                        <div>
                                            <p className="text-gray-400 text-sm">Rating</p>
                                            <div className="flex items-center gap-1">
                                                {renderStars(parseFloat(imdbRatingValue))}
                                                <span className="text-white font-medium ml-2">{imdbRatingValue}/10</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Watch Button */}
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                                <Play className="w-12 h-12 text-white mx-auto mb-3" />
                                <h3 className="text-xl font-bold text-white mb-2">Watch Now</h3>
                                {seasons?.length > 0 ? (
                                    <p className="text-white/80">{seasons.length} Seasons Available</p>
                                ) : (
                                    <p className="text-white/80">Movie Available</p>
                                )}
                            </div>

                            {/* Poster */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                <img
                                    src={metadata?.image || '/no-movie.png'}
                                    alt={title}
                                    className="w-full rounded-xl shadow-2xl"
                                />
                            </div>

                            {/* Watch Options */}
                            {seasons && seasons.length > 0 && (
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-4">Watch Options</h3>
                                    <div className="space-y-3">
                                        {seasons.map((season, index) => (
                                            <Link
                                                key={index}
                                                to={`/stream-download/${subjectId}?season=${season.se}&episode=${season.se}&maxEp=${season.maxEp}`}
                                                className="block p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-white font-medium">
                                                            {season.se > 0 ? `Season ${season.se}` : 'Movie'}
                                                        </p>
                                                        <p className="text-gray-400 text-sm">
                                                            {season.se > 0 ? `${season.maxEp} Episodes` : 'Feature Film'}
                                                        </p>
                                                    </div>
                                                    <Play className="w-5 h-5 text-purple-400" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Trailer Tab */}
                {activeTab === 'trailer' && trailer && (
                    <div className="animate-fade-in">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6">Trailer</h2>
                            <div className="grid lg:grid-cols-2 gap-6">
                                <div>
                                    <video 
                                        controls 
                                        className="w-full aspect-video rounded-xl bg-black"
                                        poster={trailer.cover?.url}
                                    >
                                        <source src={trailer.videoAddress?.url} type="video/mp4" />
                                    </video>
                                </div>
                                <div>
                                    <img 
                                        src={trailer.cover?.url || '/no-movie.png'} 
                                        alt="Trailer thumbnail" 
                                        className="w-full aspect-video rounded-xl object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cast Tab */}
                {activeTab === 'cast' && stars && (
                    <div className="animate-fade-in">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6">Cast & Crew</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                {stars.map((person, index) => (
                                    <div 
                                        key={index} 
                                        className="group cursor-pointer hover:scale-105 transition-all"
                                    >
                                        <div className="bg-white/10 rounded-xl overflow-hidden">
                                            <img
                                                src={person.avatarUrl || '/no-movie.png'}
                                                alt={person.name}
                                                className="w-full aspect-[2/3] object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-white font-medium text-sm truncate">{person.name}</p>
                                            <p className="text-gray-400 text-xs truncate">as {person.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Seasons Tab */}
                {activeTab === 'seasons' && seasons && (
                    <div className="animate-fade-in">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6">Seasons</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {seasons.map((season, index) => (
                                    <div 
                                        key={index}
                                        className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors border border-white/10"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">
                                                    {season.se > 0 ? `Season ${season.se}` : 'Movie'}
                                                </h3>
                                                <p className="text-gray-400">
                                                    {season.se > 0 ? `${season.maxEp} Episodes` : 'Feature Film'}
                                                </p>
                                            </div>
                                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                                <Play className="w-6 h-6 text-purple-400" />
                                            </div>
                                        </div>
                                        
                                        {season.resolutions && (
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-400 mb-3">Available Resolutions:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {season.resolutions.map((res, i) => (
                                                        <span 
                                                            key={i} 
                                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                                                        >
                                                            {res.resolution}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    )
}

export default Description