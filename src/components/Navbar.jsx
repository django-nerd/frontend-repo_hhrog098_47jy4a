import { ShoppingCart, Wallet, Menu } from 'lucide-react'

export default function Navbar({ cartCount = 0, onCartClick = () => {} }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-gradient-to-br from-gray-900 to-gray-700 text-white">
            <Wallet size={18} />
          </div>
          <span className="font-bold tracking-tight text-gray-900">Laser Slim Wallets</span>
        </a>
        <div className="flex items-center gap-4">
          <button
            className="relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={onCartClick}
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
