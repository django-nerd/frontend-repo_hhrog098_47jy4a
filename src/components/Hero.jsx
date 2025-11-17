export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(15,23,42,0.2),transparent_40%)]" />
      <div className="max-w-6xl mx-auto px-4 py-20 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Personalize Your Metal Slim Wallet
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Premium RFID-blocking wallets crafted from aluminum, titanium, and carbon fiber.
              Upload your design and we laser engrave it with precision.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#styles" className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-white font-medium hover:bg-slate-800">
                Explore Styles
              </a>
              <a href="#how" className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-slate-700 font-medium hover:bg-slate-50">
                How it works
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=1200&q=60"
                alt="Slim wallet"
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
