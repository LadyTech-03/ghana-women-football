"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { ClubDirectory } from "@/components/clubs/club-directory"
import { useClubStore } from "@/lib/store"

export default function ClubsPage() {
  const { clubs } = useClubStore()

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Club Directory</h1>
          <p className="text-muted-foreground">
            Browse all registered women's football clubs in Ghana's Premier League
          </p>
        </div>

        <ClubDirectory clubs={clubs} />
      </div>
    </MainLayout>
  )
}
