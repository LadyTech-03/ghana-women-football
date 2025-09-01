import type React from "react"
import { PlayerLayout } from "@/components/layout/player-layout"

export default function PlayerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PlayerLayout>{children}</PlayerLayout>
}
