// FloatingText.tsx
import { useEffect, useState } from 'react'

type Props = {
  id: string
  text: string
  x: number
  y: number
  opacity: number
  size: number
  // eslint-disable-next-line no-unused-vars
  onFinish: (id: string) => void
}

export const FloatingText = ({ id, text, x, y, onFinish, opacity, size }: Props) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false)
    }, 30000)
    const cleanup = setTimeout(() => {
      onFinish(id)
    }, 30000) // 少し遅らせて remove

    return () => {
      clearTimeout(timeout)
      clearTimeout(cleanup)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      key={id}
      className={`absolute select-none font-medium text-gray-700 transition-all duration-1000 ease-out hover:scale-110`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: opacity,
        transform: `scale(${size})`,
        fontSize: `${12 + Math.random() * 16}px`, // 12-28px（より多様なサイズ）
        textShadow: '1px 1px 2px rgba(255,255,255,0.5)'
        // animation: 'none'// FCMメッセージはパルスアニメーション
      }}
    >
      {text}
    </div>
  )
}
