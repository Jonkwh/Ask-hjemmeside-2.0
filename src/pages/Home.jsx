import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { paintings } from '../data/paintings'

// Simple scroll-reveal wrapper
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`
          el.classList.add('reveal')
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} style={{ opacity: 0 }} className={className}>
      {children}
    </div>
  )
}

const featured = paintings.filter(p => p.featured)

export default function Home() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex flex-col grain overflow-hidden">
        {/* Background image */}
        <img
          src="https://picsum.photos/seed/ask-hero/1600/1000"
          alt="Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Warm dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/20 to-charcoal/70" />
        {/* Colour treatment */}
        <div className="absolute inset-0 bg-terracotta/10 mix-blend-multiply" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-14 pb-16 md:pb-20 gap-6">
          <div>
            <p className="reveal font-body text-xs tracking-widest uppercase text-canvas/70 mb-4">
              Original paintings
            </p>
            <h1 className="reveal delay-100 font-display text-[clamp(4rem,12vw,11rem)] font-light leading-[0.9] tracking-tightest text-canvas">
              Ask
            </h1>
          </div>
          <p className="reveal delay-200 font-display italic text-canvas/80 text-xl md:text-2xl font-light max-w-sm leading-relaxed">
            Paintings that stay with you.
          </p>
          <div className="reveal delay-300 flex items-center gap-8">
            <Link
              to="/shop"
              className="font-body text-xs tracking-widest uppercase text-canvas/90 hover:text-canvas underline underline-offset-4 decoration-canvas/40 hover:decoration-canvas transition-colors duration-200"
            >
              View shop →
            </Link>
            <Link
              to="/about"
              className="font-body text-xs tracking-widest uppercase text-canvas/60 hover:text-canvas/90 transition-colors duration-200"
            >
              About the artist
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-canvas animate-pulse" />
          <span className="font-body text-[10px] tracking-widest uppercase text-canvas rotate-90 mt-2">Scroll</span>
        </div>
      </section>

      {/* ── Featured works ────────────────────────────── */}
      <section className="px-6 md:px-14 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <Reveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-dust mb-3">Selected works</p>
                <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light tracking-tightest leading-none">
                  Recent paintings
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden md:inline font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity underline underline-offset-4"
              >
                All works →
              </Link>
            </div>
          </Reveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} className="group">
                <Link to="/shop" className="block">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-linen aspect-[3/4]">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {p.sold && (
                      <span className="absolute top-4 left-4 font-body text-[10px] tracking-widest uppercase bg-charcoal text-canvas px-2 py-1">
                        Sold
                      </span>
                    )}
                    <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <span className="font-body text-xs tracking-widest uppercase text-canvas">
                        View work →
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="mt-4 space-y-1">
                    <p className="font-display text-xl font-light tracking-tight">{p.title}</p>
                    <p className="font-body text-xs text-dust">{p.medium} · {p.dimensions}</p>
                    <p className="font-mono text-sm font-light text-ash">
                      {p.sold ? '—' : `DKK ${p.price.toLocaleString('da-DK')}`}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 md:hidden">
            <Link
              to="/shop"
              className="font-body text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity underline underline-offset-4"
            >
              All works →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Statement band ────────────────────────────── */}
      <section className="relative grain overflow-hidden py-28 px-6 md:px-14 mt-12 bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-ash/80 to-charcoal" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-body text-xs tracking-widest uppercase text-canvas/40 mb-8">Artist statement</p>
            <blockquote className="font-display text-[clamp(1.6rem,4vw,3rem)] font-light italic leading-[1.25] tracking-tight text-canvas/90 text-balance">
              "I paint because the world offers more than language can contain. Paint is slower than speech — and truer."
            </blockquote>
            <Link
              to="/about"
              className="inline-block mt-12 font-body text-xs tracking-widest uppercase text-canvas/50 hover:text-canvas/90 transition-colors underline underline-offset-4 decoration-canvas/30"
            >
              About Ask →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Full-bleed secondary image ─────────────────── */}
      <section className="relative h-[60vh] grain overflow-hidden">
        <img
          src="https://picsum.photos/seed/ask-studio/1600/900"
          alt="Studio detail"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
        <div className="absolute inset-0 bg-linen/10 mix-blend-multiply" />
        <Reveal className="absolute bottom-10 left-6 md:left-14">
          <p className="font-body text-[10px] tracking-widest uppercase text-canvas/60">
            Copenhagen studio, 2024
          </p>
        </Reveal>
      </section>

      {/* ── Shop CTA ──────────────────────────────────── */}
      <section className="px-6 md:px-14 py-28">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light tracking-tightest leading-[0.95]">
              Every work<br />is unique.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col gap-4 items-start md:items-end">
              <p className="font-body text-sm text-dust leading-prose max-w-xs text-balance">
                Original paintings available to purchase. Works ship worldwide.
              </p>
              <Link
                to="/shop"
                className="font-body text-xs tracking-widest uppercase border border-charcoal px-8 py-4 hover:bg-charcoal hover:text-warmwhite transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                Enter shop →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
