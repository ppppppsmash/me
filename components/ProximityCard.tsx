'use client'

import React, { useEffect, useRef } from 'react'

export default function ProximityCard() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const config = {
    proximity: 40,
    spread: 80,
    blur: 20,
    gap: 32,
    vertical: false,
    opacity: 0,
  }

  const update = (event: React.PointerEvent) => {
    for (const card of cardsRef.current) {
      const cardElement = card as HTMLDivElement

      if (!cardElement) {
        continue
      }

      const cardBounds = cardElement.getBoundingClientRect()
      const cardStyle = cardElement.style

      if (
        event?.clientX > cardBounds.left - config.proximity &&
        event?.clientX < cardBounds.left + cardBounds.width + config.proximity &&
        event?.clientY > cardBounds.top - config.proximity &&
        event?.clientY < cardBounds.top + cardBounds.height + config.proximity
      ) {
        cardStyle.setProperty('--active', '1')
      } else {
        cardStyle.setProperty('--active', String(config.opacity))
      }

      const cardCenter = [
        cardBounds.left + cardBounds.width * 0.5,
        cardBounds.top + cardBounds.height * 0.5,
      ]
      let angle =
        (Math.atan2(event?.clientY - cardCenter[1], event?.clientX - cardCenter[0]) * 180) /
        Math.PI
      angle = angle < 0 ? angle + 360 : angle
      cardStyle.setProperty('--start', String(angle + 90))
    }
  }

  useEffect(() => {
    const updateHandler = (event: React.PointerEvent) => update(event);

    document.body.addEventListener('pointermove', updateHandler as unknown as EventListener);

    return () => {
      document.body.removeEventListener('pointermove', updateHandler as unknown as EventListener);
    };
  }, [config])

  const restyle = () => {
    const containerElement = containerRef.current

    if (!containerElement) {
      return
    }

    containerElement.style.setProperty('--gap', String(config.gap))
    containerElement.style.setProperty('--blur', String(config.blur))
    containerElement.style.setProperty('--spread', String(config.spread))
    containerElement.style.setProperty(
      '--direction',
      config.vertical ? 'column' : 'row'
    )
  }

  useEffect(() => {
    restyle()
    update({} as React.PointerEvent)
  }, [])

  return (
    <div ref={containerRef} className="container">
      <div className="card" ref={(el) => (cardsRef.current[0] = el)}>
        <div>abcd</div>
      </div>
    </div> 
  )
}