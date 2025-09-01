"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Transfer, Club } from "@/lib/types"

interface ZoneAnalysisProps {
  transfers: Transfer[]
  clubs: Club[]
}

export function ZoneAnalysis({ transfers, clubs }: ZoneAnalysisProps) {
  const northernClubs = clubs.filter((c) => c.zone === "Northern")
  const southernClubs = clubs.filter((c) => c.zone === "Southern")

  const northernTransfers = transfers.filter((t) =>
    northernClubs.some((c) => c.id === t.toClubId || c.id === t.fromClubId),
  )
  const southernTransfers = transfers.filter((t) =>
    southernClubs.some((c) => c.id === t.toClubId || c.id === t.fromClubId),
  )

  const interZoneTransfers = transfers.filter((t) => {
    const fromClub = clubs.find((c) => c.id === t.fromClubId)
    const toClub = clubs.find((c) => c.id === t.toClubId)
    return fromClub && toClub && fromClub.zone !== toClub.zone
  })

  const totalTransfers = transfers.length
  const northernPercentage = totalTransfers > 0 ? (northernTransfers.length / totalTransfers) * 100 : 0
  const southernPercentage = totalTransfers > 0 ? (southernTransfers.length / totalTransfers) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Northern Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Clubs</span>
                <Badge variant="outline">{northernClubs.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transfers</span>
                <Badge className="bg-chart-1 text-white">{northernTransfers.length}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Activity</span>
                  <span>{northernPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={northernPercentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Southern Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Clubs</span>
                <Badge variant="outline">{southernClubs.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transfers</span>
                <Badge className="bg-chart-2 text-black">{southernTransfers.length}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Activity</span>
                  <span>{southernPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={southernPercentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Inter-Zone Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{interZoneTransfers.length}</div>
                <p className="text-sm text-muted-foreground">Cross-zone movements</p>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  {totalTransfers > 0
                    ? `${((interZoneTransfers.length / totalTransfers) * 100).toFixed(1)}% of all transfers`
                    : "No transfers yet"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zone Distribution by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3 text-chart-1">Northern Zone Regions</h4>
              <div className="space-y-2">
                {Array.from(new Set(northernClubs.map((c) => c.region))).map((region) => {
                  const regionClubs = northernClubs.filter((c) => c.region === region)
                  return (
                    <div key={region} className="flex items-center justify-between text-sm">
                      <span>{region}</span>
                      <Badge variant="outline">{regionClubs.length} clubs</Badge>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-chart-2">Southern Zone Regions</h4>
              <div className="space-y-2">
                {Array.from(new Set(southernClubs.map((c) => c.region))).map((region) => {
                  const regionClubs = southernClubs.filter((c) => c.region === region)
                  return (
                    <div key={region} className="flex items-center justify-between text-sm">
                      <span>{region}</span>
                      <Badge variant="outline">{regionClubs.length} clubs</Badge>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
