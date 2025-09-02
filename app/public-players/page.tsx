"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock player data
const players = [
  {
    id: 1,
    name: "Abbi Grant",
    position: "Forward",
    club: "Ampem Darkoa Ladies",
    nationality: "Ghana",
    age: 24,
    image: "/female-footballer-striker.png",
    zone: "Northern",
  },
  {
    id: 2,
    name: "Abbie Larkin",
    position: "Midfielder",
    club: "Hasaacas Ladies",
    nationality: "Ghana",
    age: 22,
    image: "/female-footballer-midfielder.png",
    zone: "Southern",
  },
  {
    id: 3,
    name: "Abbie Lafayette",
    position: "Defender",
    club: "Faith Ladies",
    nationality: "Ghana",
    age: 26,
    image: "/female-footballer-defender.png",
    zone: "Southern",
  },
  {
    id: 4,
    name: "Abby Holmes",
    position: "Goalkeeper",
    club: "Northern Ladies",
    nationality: "Ghana",
    age: 28,
    image: "/female-goalkeeper.png",
    zone: "Northern",
  },
]

const clubs = ["All Clubs", "Ampem Darkoa Ladies", "Hasaacas Ladies", "Faith Ladies", "Northern Ladies"]
const positions = ["All Positions", "Forward", "Midfielder", "Defender", "Goalkeeper"]

export default function PublicPlayersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClub, setSelectedClub] = useState("All Clubs")
  const [selectedPosition, setSelectedPosition] = useState("All Positions")

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClub = selectedClub === "All Clubs" || player.club === selectedClub
    const matchesPosition = selectedPosition === "All Positions" || player.position === selectedPosition
    return matchesSearch && matchesClub && matchesPosition
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 mr-4">
              <Link href="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          <h1 className="text-5xl font-bold mb-4">Players</h1>
          <p className="text-xl text-white/90">Discover the talented women driving Ghana's football forward</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                {clubs.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </select>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPlayers.length} of {players.length} players
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <Card key={player.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {player.zone}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{player.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Position:</span>
                    <Badge variant="outline">{player.position}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Club:</span>
                    <span>{player.club}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Age:</span>
                    <span>{player.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Nationality:</span>
                    <span>{player.nationality}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No players found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
