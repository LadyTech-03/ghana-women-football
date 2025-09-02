"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Mock player data
const players = [
  {
    id: 1,
    name: "Abbi Grant",
    position: "Forward",
    club: "Ampem Darkoa Ladies",
    nationality: "Ghana",
    age: 24,
    image: "/players/abbi-grant.png",
    zone: "Northern",
    jerseyNumber: 11,
    clubLogo: "/clubs/ampem-darkoa.png",
    theme: "blue",
  },
  {
    id: 2,
    name: "Abbie Larkin",
    position: "Midfielder",
    club: "Hasaacas Ladies",
    nationality: "Ghana",
    age: 22,
    image: "/players/abbie-larkin.png",
    zone: "Southern",
    jerseyNumber: 21,
    clubLogo: "/clubs/hasaacas.jpeg",
    theme: "indigo",
  },
  {
    id: 3,
    name: "Abbie Lafayette",
    position: "Defender",
    club: "Faith Ladies",
    nationality: "Ghana",
    age: 26,
    image: "/players/abbie-lafayette.png",
    zone: "Southern",
    jerseyNumber: 3,
    clubLogo: "/clubs/faith-ladies.png",
    theme: "red",
  },
  {
    id: 4,
    name: "Abby Holmes",
    position: "Goalkeeper",
    club: "Thunder Queens",
    nationality: "Ghana",
    age: 28,
    image: "/players/abby-holmes.png",
    zone: "Northern",
    jerseyNumber: 24,
    clubLogo: "/clubs/thunder-queens.jpeg",
    theme: "navy",
  },
]

const clubs = ["All Clubs", "Ampem Darkoa Ladies", "Hasaacas Ladies", "Faith Ladies", "Thunder Queens"]
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
            <div key={player.id} className="group relative h-[480px] rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
              {/* Background */}
              <div className={getCardBackground(player.theme)} />

              {/* Decorative overlays */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.12),transparent_35%)]" />

              {/* Jersey number (rotated) */}
              <div className="absolute -left-4 bottom-10 select-none text-white/15 font-black tracking-tight rotate-90 text-8xl leading-none">
                {player.jerseyNumber}
              </div>

              {/* Name */}
              <div className="absolute top-5 left-5 right-5 text-white drop-shadow-md">
                <div className="text-base font-semibold uppercase tracking-wider">
                  {player.name.split(" ")[0]}
                </div>
                <div className="-mt-1 text-3xl font-extrabold italic">
                  {player.name.split(" ").slice(1).join(" ")}
                </div>
              </div>

              {/* Club logo + zone */}
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={player.clubLogo} alt={player.club} />
                  <AvatarFallback className="text-lg font-bold">{getClubAbbr(player.club)}</AvatarFallback>
                </Avatar>
                <div className="text-white text-lg font-bold flex items-center justify-center">
                    {getClubAbbr(player.club)}
                </div>
              </div>

              {/* Player image */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[90%] flex items-end justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
                    className="object-contain object-bottom pointer-events-none transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
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

function getCardBackground(theme: string) {
  switch (theme) {
    case "red":
      return "absolute inset-0 bg-gradient-to-br from-rose-600 to-red-900";
    case "indigo":
      return "absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-900";
    case "navy":
      return "absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900";
    default:
      return "absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900";
  }
}

function getClubAbbr(club: string) {
  const words = club.split(" ").filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}
