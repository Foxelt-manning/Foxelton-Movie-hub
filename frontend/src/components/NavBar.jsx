import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Home, TrendingUp, Compass, User, Info, Search as SearchIcon } from 'lucide-react'

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Trending', href: '/trending', icon: TrendingUp },
        { name: 'Discover', href: '/discover', icon: Compass },
        { name: 'Profile', href: '/profile', icon: User },
        { name: 'About', href: '/about', icon: Info }
    ]

    const isActiveLink = (href) => {
        if (href === '/') {
            return location.pathname === '/'
        }
        return location.pathname.startsWith(href)
    }

    const handleSearch = (event) => {
        event.preventDefault()

        const query = searchTerm.trim()
        if (!query) {
            return
        }

        navigate(`/search/${encodeURIComponent(query)}`)
        setIsMobileMenuOpen(false)
        setSearchTerm('')
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/Logo%20image.png"
                            alt="Foxelton logo"
                            className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-purple-500/20 ring-1 ring-white/10 group-hover:scale-105 transition-transform"
                        />
                        <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                            
                        </span>
                    </Link>

                    

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                            <SearchIcon className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search movies"
                                className="w-40 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
                            />
                        </form>

                        <div className="flex items-center space-x-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                            isActiveLink(item.href)
                                                ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/10">
                        <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                            <SearchIcon className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search movies"
                                className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
                            />
                        </form>

                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                            isActiveLink(item.href)
                                                ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar
