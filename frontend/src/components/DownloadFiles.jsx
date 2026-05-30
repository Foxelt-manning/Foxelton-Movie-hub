import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Download, Play, Pause, Check, X, Copy, Film, Settings, Loader2 } from 'lucide-react'

const Downloads = ({ data, allowBatch, setDownloadList, downloadList, season, episode, subjectId }) => {
    const [currentVideo, setCurrentVideo] = useState(null)
    const [videoUrl, setVideoUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [downloadProgress, setDownloadProgress] = useState({})
    const [copiedLink, setCopiedLink] = useState(null)
    const videoRef = useRef(null)

    // Safe data initialization
    useEffect(() => {
        console.log('Received video data:', data)
        if (data && data.length > 0) {
            const firstItem = data[0]
            const videoSource = firstItem.stream?.[0]?.proxyUrl || firstItem.stream_url
            console.log(data);
            setCurrentVideo(firstItem)
            setVideoUrl(videoSource)
        }else {
             const firstItem = data
            const videoSource = firstItem.stream?.[0]?.proxyUrl || firstItem.stream_url
            console.log(data);
            setCurrentVideo(firstItem)
            setVideoUrl(videoSource)
        }
       
    }, [data])

    const handleQualityChange = (url, item) => {
        setVideoUrl(url)
        setCurrentVideo(item)
        setLoading(true)

        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.load()
                videoRef.current.play().catch(() => {})
            }
        }, 100)
    }

    const handleVideoStateChange = (isPlaying) => {
        setIsPlaying(isPlaying)
        setLoading(false)
    }

    const handleCopyLink = async (url, id) => {
        try {
            await navigator.clipboard.writeText(url)
            setCopiedLink(id)
            setTimeout(() => setCopiedLink(null), 2000)
        } catch (error) {
            console.error('Failed to copy link:', error)
        }
    }

    const handleAddToBatch = (download) => {
        if (!setDownloadList) {
            return
        }

        const nextItem = {
            url: download.url,
            resolution: download.resolution,
            size: download.size,
            subjectId,
            season,
            episode,
        }

        if (!downloadList.some(item => item.url === download.url)) {
            setDownloadList(prev => [...prev, nextItem])
        }
    }

    const resolveDownloadUrl = (download) => {
        if (!download) return ''
        // Prefer a matching or available stream directUrl first
        if (currentVideo?.stream && currentVideo.stream.length > 0) {
            // try to match stream by resolution/quality
            const matchByQuality = currentVideo.stream.find(s => {
                if (!s) return false
                const q = s.quality || String(s.quality)
                return String(q) === String(download.resolution) || String(q) === String(download.quality)
            })
            if (matchByQuality && matchByQuality.directUrl) return matchByQuality.directUrl

            // otherwise prefer the first stream that exposes a directUrl
            const firstStreamWithDirect = currentVideo.stream.find(s => s.directUrl)
            if (firstStreamWithDirect) return firstStreamWithDirect.directUrl
        }

        // next prefer an explicit directUrl on the download item
        if (download.directUrl) return download.directUrl

        // last resort: use the provided download.url
        return download.url || ''
    }

    const formatFileSize = (bytes) => {
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    }

    if (!data || data.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <Film className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-white text-xl">No video data available</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Video Player Section */}
                <div className="mb-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <div className="relative">
                            {loading && (
                                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
                                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                                </div>
                            )}
                            
                            <video
                                ref={videoRef}
                                key={videoUrl}
                                className="w-full aspect-video rounded-xl bg-black shadow-2xl"
                                autoPlay
                                controls
                                onWaiting={() => handleVideoStateChange(false)}
                                onPlaying={() => handleVideoStateChange(true)}
                                onPause={() => handleVideoStateChange(false)}
                            >
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                        </div>

                        {/* Quality Selector */}
                        <div className="mt-6">
                            <div className="flex items-center gap-4">
                                <Settings className="w-5 h-5 text-purple-400" />
                                <label className="text-white font-medium">Video Quality</label>
                            </div>
                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                           {     currentVideo?.stream?.map((stream, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQualityChange(stream.proxyUrl || stream.url, currentVideo)}
                                        className="p-3 rounded-xl border transition-all hover:bg-white/10"
                                    >
                                        <div className="text-sm font-medium">{stream.quality || 'Auto'}</div>
                                        {stream.size && (
                                            <div className="text-xs text-gray-400 mt-1">
                                                {formatFileSize(stream.size)}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download Options */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Download className="w-6 h-6 text-purple-400" />
                        Download Options
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentVideo?.downloads?.map((download, index) => (
                            <div
                                key={index}
                                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
                            >
                                {/* Resolution Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
                                        {download.resolution}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {formatFileSize(download.size)}
                                    </span>
                                </div>

                                {/* Download Button */}
                                <div className="space-y-3">
                                    <a
                                        href={resolveDownloadUrl(download)}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl hover:scale-105 transition-transform font-medium"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </a>

                                    {/* Copy Link Button */}
                                    <button
                                        onClick={() => handleCopyLink(resolveDownloadUrl(download), index)}
                                        className="w-full flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-colors font-medium"
                                    >
                                        {copiedLink === index ? (
                                            <>
                                                <Check className="w-4 h-4 text-green-400" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy Link
                                            </>
                                        )}
                                    </button>

                                    {/* Batch Download Button */}
                                    {allowBatch && (
                                        <button
                                            onClick={() => handleAddToBatch({ ...download, url: resolveDownloadUrl(download) })}
                                            disabled={downloadList.some(item => item.url === resolveDownloadUrl(download))}
                                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                                                downloadList.some(item => item.url === resolveDownloadUrl(download))
                                                    ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                                                    : 'bg-blue-500/20 text-blue-400 border border-blue-400/30 hover:bg-blue-500/30'
                                            }`}
                                        >
                                            {downloadList.some(item => item.url === resolveDownloadUrl(download)) ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    In Batch
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-4 h-4" />
                                                    Add to Batch
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Batch Download Summary */}
                    {allowBatch && downloadList.length > 0 && (
                        <div className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-xl">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-green-400" />
                                    <span className="text-green-400 font-medium">
                                        {downloadList.length} items selected
                                    </span>
                                </div>
                                <button
                                    onClick={() => setDownloadList([])}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Downloads