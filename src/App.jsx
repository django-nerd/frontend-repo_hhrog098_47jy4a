import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StylesGrid from './components/StylesGrid'
import Customizer from './components/Customizer'
import CartDrawer from './components/CartDrawer'

function App() {
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  const cartCount = useMemo(() => cart.reduce((acc, it) => acc + it.quantity, 0), [cart])

  const addToCart = (item) => {
    setCart((prev) => [...prev, item])
    setCartOpen(true)
  }
  const removeFromCart = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx))

  const checkout = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const payload = {
      items: cart.map(({ product_id, quantity, finish, engraving_text, upload_id }) => ({
        product_id, quantity, finish, engraving_text, upload_id,
      })),
      customer: {
        name: 'Guest',
        email: 'guest@example.com',
        address_line1: '123 Demo St',
        city: 'Demo City', state: 'CA', postal_code: '90001', country: 'US',
      }
    }
    try {
      const res = await fetch(`${baseUrl}/api/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (res.ok) {
        alert(`Order placed! ID: ${data.order_id}`)
        setCart([])
        setCartOpen(false)
      } else {
        alert(data.detail || 'Checkout failed')
      }
    } catch (e) {
      alert('Checkout error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main className="max-w-6xl mx-auto px-4">
        <Hero />
        <section className="py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Choose Your Style</h2>
          <StylesGrid onSelect={setSelected} />
        </section>
        {selected && (
          <section className="py-12 border-t">
            <Customizer style={selected} onAddToCart={addToCart} />
          </section>
        )}
        <section id="how" className="py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              title: 'Pick a wallet', desc: 'Select from premium aluminum, carbon fiber, or titanium.'
            },{
              title: 'Customize', desc: 'Choose finish, add text, and upload your design.'
            },{
              title: 'We engrave & ship', desc: 'Precision laser engraving and fast shipping.'
            }].map((s,i)=> (
              <div key={i} className="rounded-xl border p-6 bg-white">
                <p className="text-sm text-slate-500">Step {i+1}</p>
                <h3 className="mt-1 font-semibold text-slate-900">{s.title}</h3>
                <p className="text-slate-600 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
    </div>
  )
}

export default App
