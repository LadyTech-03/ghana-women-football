"use client"

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function SeasonCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set the date for September 5, 2025
    const seasonStart = new Date('2025-09-16T00:00:00')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = seasonStart.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] p-6 rounded-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-white">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wider">SEASON STARTS</h2>
            <p className="text-xl md:text-2xl font-semibold mt-1">FRIDAY 5 SEPTEMBER</p>
          </div>
          
          <div className="flex gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-sm uppercase opacity-80">days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm uppercase opacity-80">hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm uppercase opacity-80">minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm uppercase opacity-80">seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
