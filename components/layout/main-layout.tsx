"use client"

import type React from "react"

import { useAuthStore } from "@/lib/store"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <div>{children}</div>
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="ml-64 flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}