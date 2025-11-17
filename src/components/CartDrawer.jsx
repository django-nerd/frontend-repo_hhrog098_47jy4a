import { useMemo } from 'react'
import { X, Trash2, ArrowRight } from 'lucide-react'

export default function CartDrawer({ open, onClose, items, onRemove, onCheckout }) {
  const { subtotal, shipping, total } = useMemo(() => {
    const sub = items.reduce((acc, it) => acc + it.price * it.quantity, 0)
    const ship = sub < 75 && sub > 0 ? 5 : 0
    return { subtotal: sub, shipping: ship, total: sub + ship }
  }, [items])

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Your Cart</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="p-4 divide-y max-h-[calc(100%-180px)] overflow-auto">
          {items.length === 0 && <p className="text-slate-500">Your cart is empty.</p>}
          {items.map((it, idx) => (
            <div key={idx} className="py-3 flex gap-3">
              <img src={it.image} alt={it.title} className="h-16 w-16 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">{it.title}</p>
                <p className="text-sm text-slate-600">Finish: {it.finish || '—'}</p>
                {it.engraving_text && (
                  <p className="text-sm text-slate-600">Engraving: {it.engraving_text}</p>
                )}
                <p className="text-sm text-slate-600">Qty: {it.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${it.price}</p>
                <button onClick={() => onRemove(idx)} className="mt-2 inline-flex items-center gap-1 text-red-600 text-sm hover:underline">
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping ? `$${shipping.toFixed(2)}` : 'Free'}</span></div>
          <div className="flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button onClick={onCheckout} className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700">
            Proceed to Checkout <ArrowRight size={18} />
          </button>
        </div>
      </aside>
    </div>
  )
}
