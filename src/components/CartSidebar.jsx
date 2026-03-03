import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function CartSidebar() {
  const { items, removeItem, clearCart, total, isOpen, setIsOpen } = useCart()

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const fmt = (n) =>
    new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK', maximumFractionDigits: 0 }).format(n)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-md bg-warmwhite flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-charcoal/10">
          <span className="font-display text-2xl font-light tracking-tight">Cart</span>
          <button
            onClick={() => setIsOpen(false)}
            className="font-body text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Close cart"
          >
            Close ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 opacity-40">
              <span className="font-display text-6xl font-light">∅</span>
              <p className="font-body text-sm tracking-wide">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 items-start border-b border-charcoal/8 pb-6">
                  <img
                    src={item.thumbImg}
                    alt={item.title}
                    className="w-16 h-20 object-cover flex-shrink-0 grayscale-[20%]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg font-light leading-tight">{item.title}</p>
                    <p className="font-body text-xs text-dust mt-0.5">{item.medium}</p>
                    <p className="font-body text-xs text-dust">{item.dimensions}</p>
                    <p className="font-mono text-sm mt-2 font-light">{fmt(item.price)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-body text-xs tracking-widest opacity-30 hover:opacity-80 transition-opacity pt-0.5"
                    aria-label={`Remove ${item.title}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-7 border-t border-charcoal/10 space-y-5">
            <div className="flex justify-between items-baseline">
              <span className="font-body text-xs tracking-widest uppercase opacity-60">Total</span>
              <span className="font-mono text-xl font-light">{fmt(total)}</span>
            </div>
            <p className="font-body text-xs text-dust leading-relaxed">
              All prices in DKK. Shipping and taxes calculated at checkout. Each work is unique — inquire for international shipping.
            </p>
            <button className="w-full border border-charcoal text-charcoal font-body text-xs tracking-widest uppercase py-4 hover:bg-charcoal hover:text-warmwhite transition-colors duration-300">
              Proceed to Checkout →
            </button>
            <button
              onClick={clearCart}
              className="w-full text-center font-body text-xs tracking-widest uppercase opacity-30 hover:opacity-70 transition-opacity"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
