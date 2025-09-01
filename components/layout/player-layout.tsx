"use client"

import type React from "react"

import { PlayerSidebar } from "./player-sidebar"

interface PlayerLayoutProps {
  children: React.ReactNode
}

export function PlayerLayout({ children }: PlayerLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <PlayerSidebar />
      <div className="md:pl-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
