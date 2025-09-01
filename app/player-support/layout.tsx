import type React from "react"
import { PlayerLayout } from "@/components/layout/player-layout"

export default function PlayerSupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PlayerLayout>{children}</PlayerLayout>
}
