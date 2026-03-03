import { useState, useMemo } from 'react'
import { paintings, categories } from '../data/paintings'
import { useCart } from '../context/CartContext'

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

function PaintingCard({ painting }) {
  const { addItem, items } = useCart()
  const inCart = items.some(i => i.id === painting.id)

  return (
    <article className="group flex flex-col">
      {/* Image wrapper */}
      <div className="relative overflow-hidden bg-linen" style={{ aspectRatio: '3/4' }}>
        <img
          src={painting.thumbImg}
          alt={painting.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Sold badge */}
        {painting.sold && (
          <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
            <span className="font-body text-xs tracking-widest uppercase bg-charcoal text-canvas px-3 py-1.5">
              Sold
            </span>
          </div>
        )}

        {/* Quick description on hover */}
        {!painting.sold && (
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <p className="font-body text-xs text-canvas/80 leading-relaxed line-clamp-2">
              {painting.description}
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-4 flex flex-col gap-1 flex-1">
        <h3 className="font-display text-xl font-light tracking-tight leading-tight">{painting.title}</h3>
        <p className="font-body text-xs text-dust">{painting.medium}</p>
        <p className="font-body text-xs text-dust/70">{painting.dimensions}</p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-charcoal/8">
          <span className="font-mono text-sm font-light text-ash">
            {painting.sold ? '—' : `DKK ${painting.price.toLocaleString('da-DK')}`}
          </span>

          {!painting.sold && (
            <div className="flex items-center gap-4">
              <a
                href="mailto:ask@example.com?subject=Inquiry: Ask — artwork"
                className="font-body text-[11px] tracking-widest uppercase opacity-40 hover:opacity-80 transition-opacity underline underline-offset-2"
              >
                Inquire ↗
              </a>
              <button
                onClick={() => addItem(painting)}
                disabled={inCart}
                className={`font-body text-[11px] tracking-widest uppercase transition-all duration-200 border px-3 py-1.5 focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 active:scale-[0.97] ${
                  inCart
                    ? 'border-charcoal/30 text-charcoal/30 cursor-default'
                    : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-warmwhite'
                }`}
              >
                {inCart ? 'In cart ✓' : 'Add to cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? [...paintings]
      : paintings.filter(p => p.category === activeCategory)

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)

    return list
  }, [activeCategory, sortBy])

  const available = filtered.filter(p => !p.sold).length

  return (
    <main className="pt-20">
      {/* ── Page header ─────────────────────────────── */}
      <section className="px-6 md:px-14 pt-16 pb-12 border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs tracking-widest uppercase text-dust mb-4 reveal">
            Original works
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-light tracking-tightest leading-[0.9] reveal delay-100">
            Shop
          </h1>
          <p className="font-body text-sm text-dust mt-4 reveal delay-200">
            {available} {available === 1 ? 'work' : 'works'} available
          </p>
        </div>
      </section>

      {/* ── Filter / Sort bar ───────────────────────── */}
      <section className="sticky top-16 z-30 bg-warmwhite/90 backdrop-blur-sm border-b border-charcoal/10 px-6 md:px-14 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category filters */}
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`font-body text-[11px] tracking-widest uppercase px-3 py-1.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-1 active:scale-[0.97] ${
                  activeCategory === cat.value
                    ? 'bg-charcoal text-warmwhite'
                    : 'text-charcoal opacity-40 hover:opacity-80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="font-body text-[11px] tracking-widest uppercase opacity-40">
              Sort
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="font-body text-[11px] tracking-widest uppercase bg-transparent border-b border-charcoal/30 pb-0.5 pr-4 cursor-pointer focus:outline-none focus:border-charcoal"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ── Grid ────────────────────────────────────── */}
      <section className="px-6 md:px-14 py-14">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="font-display italic text-2xl text-dust/60 py-20 text-center">
              No works found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {filtered.map(p => (
                <PaintingCard key={p.id} painting={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Shipping note ───────────────────────────── */}
      <section className="px-6 md:px-14 pb-20 border-t border-charcoal/10 pt-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            { heading: 'Shipping', body: 'Works are carefully packed and shipped worldwide. Larger works are shipped rolled or crated. Delivery within 7–14 business days.' },
            { heading: 'Returns', body: 'Each work is unique and sold as-is. Inquire before purchasing if you have questions about condition or provenance.' },
            { heading: 'Inquiries', body: 'For studio visits, commissions, or questions about specific works, write to ask@example.com or via Instagram.' },
          ].map(item => (
            <div key={item.heading}>
              <h3 className="font-body text-xs tracking-widest uppercase text-dust mb-3">{item.heading}</h3>
              <p className="font-body text-sm text-ash leading-prose">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
