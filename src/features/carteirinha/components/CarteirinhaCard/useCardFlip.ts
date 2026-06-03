import { useState, type KeyboardEvent } from 'react'

export function useCardFlip() {
  const [virado, setVirado] = useState(false)
  const flip = () => setVirado((v) => !v)

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') flip()
  }

  return { virado, flip, onKeyDown }
}
