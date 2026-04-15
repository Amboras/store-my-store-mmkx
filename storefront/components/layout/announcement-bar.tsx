'use client'

import { useState } from 'react'
import { X, Sparkles } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-[hsl(25,15%,10%)] text-[hsl(40,18%,97%)]">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-xs tracking-[0.12em] uppercase">
        <Sparkles className="h-3 w-3 opacity-70 flex-shrink-0" />
        <p>Free shipping on orders over $60 &nbsp;&middot;&nbsp; Handcrafted in small batches</p>
        <Sparkles className="h-3 w-3 opacity-70 flex-shrink-0" />
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-60 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
