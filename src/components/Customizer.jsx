import { useEffect, useRef, useState } from 'react'

export default function Customizer({ style, onAddToCart }) {
  const [finish, setFinish] = useState(style?.finishes?.[0] || '')
  const [engravingText, setEngravingText] = useState('')
  const [previewUrl, setPreviewUrl] = useState(style?.images?.[0] || '')
  const [uploading, setUploading] = useState(false)
  const [uploadId, setUploadId] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    setFinish(style?.finishes?.[0] || '')
    setPreviewUrl(style?.images?.[0] || '')
  }, [style])

  const onFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${baseUrl}/api/upload`, { method: 'POST', body: form })
      const data = await res.json()
      if (res.ok) {
        setUploadId(data.upload_id)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        alert(data.detail || 'Upload failed')
      }
    } catch (err) {
      alert('Upload error')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const addToCart = () => {
    onAddToCart?.({
      product_id: style.id,
      finish,
      engraving_text: engravingText || null,
      upload_id: uploadId,
      quantity: 1,
      title: style.title,
      price: style.price,
      image: style.images?.[0]
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="rounded-xl overflow-hidden border bg-white">
        <div className="aspect-[4/3] bg-slate-100">
          <img src={previewUrl} alt={style.title} className="w-full h-full object-cover" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900">Customize</h3>
        <p className="text-slate-600 mt-1">{style.title}</p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">Finish</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {style.finishes?.map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => setFinish(f)}
                  className={`px-3 py-1.5 rounded-full border ${finish === f ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Engraving text (optional)</label>
            <input
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder="e.g. Initials, name, date"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Upload image/design (PNG/JPG/SVG)</label>
            <input ref={fileInputRef} type="file" accept="image/*,.svg" onChange={onFileChange} className="mt-2 block w-full text-sm" />
            {uploading && <p className="text-slate-500 text-sm mt-1">Uploading...</p>}
          </div>

          <button
            onClick={addToCart}
            className="w-full rounded-md bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800"
          >
            Add to Cart - ${style.price}
          </button>
        </div>
      </div>
    </div>
  )
}
