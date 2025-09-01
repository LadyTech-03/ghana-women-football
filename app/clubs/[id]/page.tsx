"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useClubStore, usePlayerStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MapPin, Trophy, Users, Radius as Stadium } from "lucide-react"

export default function ClubDetailsPage() {
  const params = useParams()
  const { clubs, setCurrentClub, currentClub } = useClubStore()
  const { players, fetchPlayers, getPlayersByClub } = usePlayerStore()

  useEffect(() => {
    fetchPlayers()
    const club = clubs.find((c) => c.id === params.id)
    if (club) {
      setCurrentClub(club)
    }
  }, [params.id, clubs, setCurrentClub, fetchPlayers])

  if (!currentClub) {
    return <div>Loading...</div>
  }

  const clubPlayers = getPlayersByClub(currentClub.id)

  return (
    <div className="space-y-6">
      {/* Club Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-gfa-red to-gfa-yellow p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl font-bold">{currentClub.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{currentClub.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {currentClub.zone} Zone
                </Badge>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{currentClub.region}</span>
                </div>
                {currentClub.founded && (
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>Founded {currentClub.founded}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Club Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stadium className="h-5 w-5" />
              Club Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Description</h4>
              <p className="text-sm">{currentClub.description}</p>
            </div>
            {currentClub.stadium && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Home Stadium</h4>
                <p className="text-sm">{currentClub.stadium}</p>
              </div>
            )}
            {currentClub.coach && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Head Coach</h4>
                <p className="text-sm">{currentClub.coach}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        {currentClub.achievements && currentClub.achievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentClub.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-gfa-yellow" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Squad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Squad ({clubPlayers.length} players)
          </CardTitle>
          <CardDescription>Current players registered with the club</CardDescription>
        </CardHeader>
        <CardContent>
          {clubPlayers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {clubPlayers.map((player) => (
                <div key={player.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback>
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{player.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {player.position && <span>{player.position}</span>}
                      {player.jerseyNumber && (
                        <>
                          <span>•</span>
                          <span>#{player.jerseyNumber}</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Age: {new Date().getFullYear() - player.dateOfBirth.getFullYear()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No players registered with this club yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
