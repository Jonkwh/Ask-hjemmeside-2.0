import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Nav() {
  const { count, setIsOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `font-body text-xs tracking-widest uppercase transition-opacity duration-200 ${
      isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
    }`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-warmwhite/90 backdrop-blur-sm border-b border-charcoal/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-10 h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl font-light tracking-tighter text-charcoal leading-none"
          >
            Ask
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/shop" className={linkClass}>Shop</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              Instagram ↗
            </a>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsOpen(true)}
              className="relative font-body text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity duration-200"
              aria-label="Open cart"
            >
              Cart
              {count > 0 && (
                <span className="absolute -top-1 -right-3 bg-charcoal text-warmwhite text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-end gap-[5px] w-6 h-5 opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
              <span className={`block h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`block h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-warmwhite flex flex-col justify-center items-center gap-10 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {[['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About']].map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `font-display text-5xl font-light tracking-tight transition-opacity duration-200 ${
                isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity duration-200 mt-4"
        >
          Instagram ↗
        </a>
      </div>
    </>
  )
}
