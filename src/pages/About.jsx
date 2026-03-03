import { useRef, useEffect } from 'react'

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

export default function About() {
  return (
    <main className="pt-20">
      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] grain overflow-hidden">
        <img
          src="https://picsum.photos/seed/ask-portrait/1400/900"
          alt="Ask in the studio"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/10 to-charcoal/70" />
        <div className="absolute inset-0 bg-terracotta/8 mix-blend-multiply" />
        <div className="absolute bottom-10 left-6 md:left-14">
          <Reveal>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.9] tracking-tightest text-canvas">
              About
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Bio block ───────────────────────────────── */}
      <section className="px-6 md:px-14 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24 items-start">

          {/* Left: portrait + quick facts */}
          <div className="space-y-8">
            <Reveal>
              <div className="relative overflow-hidden bg-linen aspect-[3/4] max-w-xs">
                <img
                  src="https://picsum.photos/seed/ask-face/600/800"
                  alt="Ask"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-5">
                {[
                  ['Born', '1987, Denmark'],
                  ['Lives & works', 'Copenhagen'],
                  ['Education', 'Royal Danish Academy of Fine Arts, Copenhagen\nKunstakademiet, Oslo (exchange)'],
                  ['Represented by', 'Self-represented'],
                ].map(([label, value]) => (
                  <div key={label} className="border-t border-charcoal/10 pt-4">
                    <p className="font-body text-[10px] tracking-widest uppercase text-dust mb-1">{label}</p>
                    <p className="font-body text-sm text-ash leading-relaxed whitespace-pre-line">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Social links */}
            <Reveal delay={200}>
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 flex items-center justify-center border border-charcoal/20 group-hover:border-charcoal transition-colors duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </span>
                  <span className="font-body text-xs tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                    Instagram ↗
                  </span>
                </a>

                <a
                  href="mailto:ask@example.com"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 flex items-center justify-center border border-charcoal/20 group-hover:border-charcoal transition-colors duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <span className="font-body text-xs tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                    ask@example.com ↗
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: artist statement */}
          <div className="space-y-12">
            <Reveal>
              <p className="font-body text-[10px] tracking-widest uppercase text-dust mb-6">Artist statement</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light tracking-tight leading-[1.1]">
                "I paint the world as I find it — uncertain, luminous, and almost gone."
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <div className="space-y-6 font-body text-sm text-ash leading-[1.8]">
                <p>
                  Ask is a Copenhagen-based painter working primarily in oil on linen and canvas. Her practice is grounded in direct observation — coastal landscapes, interiors, the human figure — rendered through sustained attention and a restrained palette drawn from the natural world.
                </p>
                <p>
                  Trained at the Royal Danish Academy of Fine Arts and the Kunstakademiet in Oslo, she spent several years working in residencies across Scandinavia before settling in Copenhagen. Her studio is a converted warehouse on the waterfront, where she works in silence, usually for long, uninterrupted stretches.
                </p>
                <p>
                  The work is not illustrative. Ask paints the condition of looking — the moment before recognition collapses into naming. A painting is finished, she says, when it starts to resist her. When there is nothing left to adjust, only to sit with.
                </p>
                <p>
                  She shows occasionally, sells directly from the studio, and takes on a small number of commissions each year. She does not have gallery representation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="border-l-2 border-charcoal/20 pl-6">
                <p className="font-display italic text-xl font-light leading-relaxed text-ash">
                  "There is a painting underneath every painting. I try to let both show."
                </p>
              </div>
            </Reveal>

            {/* Selected exhibitions */}
            <Reveal delay={300}>
              <div>
                <p className="font-body text-[10px] tracking-widest uppercase text-dust mb-6">Selected exhibitions</p>
                <ul className="space-y-4">
                  {[
                    ['2024', 'Two-person show', 'Galleri Asbæk, Copenhagen'],
                    ['2023', 'Nordic Light', 'Kunsthal Aarhus, Aarhus'],
                    ['2022', 'Studio Open', 'Copenhagen, DK'],
                    ['2021', 'After Summer', 'Galleri Christoffer Egelund, Copenhagen'],
                    ['2019', 'New Acquisitions', 'SMK – National Gallery of Denmark'],
                  ].map(([year, title, venue]) => (
                    <li key={year + title} className="flex gap-6 border-t border-charcoal/8 pt-4">
                      <span className="font-mono text-xs text-dust/60 w-10 flex-shrink-0 pt-0.5">{year}</span>
                      <div>
                        <p className="font-body text-sm font-medium text-charcoal">{title}</p>
                        <p className="font-body text-xs text-dust">{venue}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Contact strip ───────────────────────────── */}
      <section className="bg-charcoal grain px-6 md:px-14 py-20 mt-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-light tracking-tightest leading-[0.95] text-canvas">
              Get in touch.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-col gap-4 items-start md:items-end">
              <p className="font-body text-sm text-canvas/60 max-w-xs leading-prose">
                For commissions, studio visits, or to inquire about a specific work.
              </p>
              <a
                href="mailto:ask@example.com"
                className="font-body text-xs tracking-widest uppercase text-canvas border border-canvas/30 px-7 py-3.5 hover:bg-canvas hover:text-charcoal transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal active:scale-[0.98]"
              >
                Write to Ask →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
