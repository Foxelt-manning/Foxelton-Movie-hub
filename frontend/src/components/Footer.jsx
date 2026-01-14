import React from 'react'
import { Film, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' }
    ]

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Trending', href: '/trending' },
        { name: 'Discover', href: '/discover' },
        { name: 'About Us', href: '/about' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
    ]

    return (
        <footer className="bg-black/80 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Film className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Foxelton</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Your ultimate destination for amazing movies and TV shows. Discover, watch, and enjoy premium entertainment.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-purple-500/20 hover:text-purple-400 transition-all"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-purple-400" />
                                <a href="mailto:minusahsaaka@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                                   minusahsaaka@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-purple-400" />
                                <span className="text-gray-400" > +233 202 743 455</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href="https://wa.me/233202743455">
                                    <Phone className="w-5 h-5 text-white border border-green-500 rounded-full bg-green-800 p-0.5" />
                                    <span className="text-gray-400">+233202743455</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest movies and exclusive offers.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:scale-105 transition-transform"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Foxelton Movie Hub. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                Terms of Service
                            </a>
                            <a href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer