import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 px-6 md:px-10 py-12 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <Link to="/" className="font-display text-2xl font-light tracking-tighter text-charcoal">Ask</Link>
          <p className="font-body text-xs text-dust mt-1 tracking-wide">Original paintings. Copenhagen.</p>
        </div>

        <nav className="flex flex-wrap gap-8">
          <Link to="/" className="font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">Home</Link>
          <Link to="/shop" className="font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">Shop</Link>
          <Link to="/about" className="font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">About</Link>
          <a href="mailto:ask@example.com" className="font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
            Contact ↗
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
            Instagram ↗
          </a>
        </nav>

        <p className="font-body text-xs text-dust/60">© {new Date().getFullYear()} Ask</p>
      </div>
    </footer>
  )
}
