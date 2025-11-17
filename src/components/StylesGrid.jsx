import { useEffect, useState } from 'react'

export default function StylesGrid({ onSelect }) {
  const [styles, setStyles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/styles`)
        const data = await res.json()
        setStyles(data.styles || [])
      } catch (e) {
        setError('Failed to load styles')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-slate-500">Loading styles...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div id="styles" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {styles.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect && onSelect(s)}
          className="text-left group rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-sm overflow-hidden"
        >
          <div className="aspect-[4/3] overflow-hidden bg-slate-100">
            <img src={s.images?.[0]} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900">{s.title}</h3>
            <p className="text-slate-600 text-sm line-clamp-2">{s.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-slate-900 font-bold">${s.price}</span>
              <span className="text-xs px-2 py-1 rounded bg-slate-900/5 text-slate-700">{s.finishes?.length || 0} finishes</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
