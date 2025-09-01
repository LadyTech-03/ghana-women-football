"use client"

import { useState, useEffect } from "react"
import { usePlayerStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Player } from "@/lib/types"

interface PlayerSelectorProps {
  clubId: string
  selectedPlayer: Player | null
  onPlayerSelect: (player: Player) => void
  label?: string
  placeholder?: string
}

export function PlayerSelector({
  clubId,
  selectedPlayer,
  onPlayerSelect,
  label = "Select Player",
  placeholder = "Search for a player...",
}: PlayerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { getPlayersByClub, fetchPlayers } = usePlayerStore()

  useEffect(() => {
    fetchPlayers()
  }, [fetchPlayers])

  const clubPlayers = getPlayersByClub(clubId)
  const filteredPlayers = clubPlayers.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handlePlayerSelect = (player: Player) => {
    onPlayerSelect(player)
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className={cn("w-full justify-between text-left font-normal", !selectedPlayer && "text-muted-foreground")}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedPlayer ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={selectedPlayer.image || "/placeholder.svg"} alt={selectedPlayer.name} />
                <AvatarFallback className="text-xs">
                  {selectedPlayer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{selectedPlayer.name}</span>
              {selectedPlayer.position && (
                <Badge variant="secondary" className="text-xs">
                  {selectedPlayer.position}
                </Badge>
              )}
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>

        {isOpen && (
          <Card className="absolute z-50 w-full mt-1 max-h-60 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <button
                      key={player.id}
                      type="button"
                      className="w-full p-3 text-left hover:bg-accent transition-colors flex items-center gap-3"
                      onClick={() => handlePlayerSelect(player)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback className="text-xs">
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
                          <span>•</span>
                          <span>Age: {new Date().getFullYear() - player.dateOfBirth.getFullYear()}</span>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No players found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
