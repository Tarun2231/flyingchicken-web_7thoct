'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/vendors', label: 'Vendors' },
  { href: '/plans', label: 'Plans' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !isHomePage || isScrolled ? 'glass-effect shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-16 h-16 group-hover:scale-110 transition-transform">
              <Image
                src="/logo.png"
                alt="Flying Chicken Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`text-2xl font-bold transition-all duration-300 ${
                !isHomePage || isScrolled ? 'text-textPrimary' : 'text-white drop-shadow-lg'
              }`}
            >
              Flying Chicken
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium relative group ${
                  !isHomePage || isScrolled
                    ? 'text-textPrimary hover:text-primary'
                    : 'text-white hover:text-white/80 drop-shadow-md'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/register-vendor"
              className="px-6 py-2 rounded-full gradient-primary text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Join as Vendor
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-textPrimary" />
            ) : (
              <Menu className="w-6 h-6 text-textPrimary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`transition-colors font-medium px-4 py-2 rounded-lg ${
                      !isHomePage || isScrolled
                        ? 'text-textPrimary hover:text-primary hover:bg-primary/5'
                        : 'text-white hover:text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/register-vendor"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 rounded-full gradient-primary text-white font-semibold text-center hover:shadow-lg transition-all duration-300"
                >
                  Join as Vendor
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
