"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Search, MapPin, Calendar, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Club } from "@/lib/types"
import Link from "next/link"

interface ClubDirectoryProps {
  clubs: Club[]
}

export function ClubDirectory({ clubs }: ClubDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [zoneFilter, setZoneFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const router = useRouter()

  const regions = Array.from(new Set(clubs.map((club) => club.region))).sort()

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesZone = zoneFilter === "all" || club.zone === zoneFilter
    const matchesRegion = regionFilter === "all" || club.region === regionFilter

    return matchesSearch && matchesZone && matchesRegion
  })

  const getZoneColor = (zone: "Northern" | "Southern") => {
    return zone === "Northern" ? "bg-chart-1 text-white" : "bg-chart-2 text-black"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs or regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={zoneFilter} onValueChange={setZoneFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="Northern">Northern Zone</SelectItem>
                <SelectItem value="Southern">Southern Zone</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredClubs.length} of {clubs.length} clubs
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClubs.map((club) => (
          <Card key={club.id} className="hover:shadow-md transition-shadow group">
            <CardContent className="p-4">
              <Link href={`/clubs/${club.id}`}>
              <div className="flex items-center gap-3">
                <Avatar className="size-14 border-2 border-muted">
                  <AvatarImage src={club.logo} alt={club.name} />
                  <AvatarFallback className="bg-muted-foreground text-white font-bold">{club.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold truncate">{club.name}</h3>
                    <Badge className={`${getZoneColor(club.zone)} text-xs`}>
                      {club.zone}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{club.region}</span>
                    </div>
                    {club.founded && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{club.founded}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClubs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No clubs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
