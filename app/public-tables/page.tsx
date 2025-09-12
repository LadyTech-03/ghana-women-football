"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Trophy, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock league table data for different seasons
const seasonData = {
  "2024/25": {
    leagueTable: [
      {
        position: 1,
        club: "Ampem Darkoa Ladies",
        played: 18,
        won: 15,
        drawn: 2,
        lost: 1,
        gf: 45,
        ga: 8,
        gd: 37,
        points: 47,
        form: ["W", "W", "W", "D", "W"],
        zone: "Northern",
      },
      {
        position: 2,
        club: "Hasaacas Ladies",
        played: 18,
        won: 13,
        drawn: 3,
        lost: 2,
        gf: 38,
        ga: 12,
        gd: 26,
        points: 42,
        form: ["W", "W", "L", "W", "W"],
        zone: "Southern",
      },
      {
        position: 3,
        club: "Faith Ladies",
        played: 18,
        won: 11,
        drawn: 4,
        lost: 3,
        gf: 32,
        ga: 18,
        gd: 14,
        points: 37,
        form: ["D", "W", "W", "D", "W"],
        zone: "Southern",
      },
      {
        position: 4,
        club: "Northern Ladies",
        played: 18,
        won: 10,
        drawn: 3,
        lost: 5,
        gf: 28,
        ga: 22,
        gd: 6,
        points: 33,
        form: ["L", "W", "W", "L", "D"],
        zone: "Northern",
      },
      {
        position: 5,
        club: "Sea Lions",
        played: 18,
        won: 8,
        drawn: 5,
        lost: 5,
        gf: 25,
        ga: 25,
        gd: 0,
        points: 29,
        form: ["D", "L", "W", "D", "W"],
        zone: "Southern",
      },
      {
        position: 6,
        club: "Prisons Ladies",
        played: 18,
        won: 7,
        drawn: 4,
        lost: 7,
        gf: 22,
        ga: 28,
        gd: -6,
        points: 25,
        form: ["L", "D", "L", "W", "L"],
        zone: "Northern",
      },
    ],
    topScorers: [
      { name: "Abbi Grant", club: "Ampem Darkoa Ladies", goals: 18, position: "Forward" },
      { name: "Abbie Larkin", club: "Hasaacas Ladies", goals: 15, position: "Forward" },
      { name: "Sarah Mensah", club: "Faith Ladies", goals: 12, position: "Midfielder" },
      { name: "Grace Asante", club: "Northern Ladies", goals: 10, position: "Forward" },
      { name: "Mary Essien", club: "Sea Lions", goals: 9, position: "Forward" },
    ],
  },
  "2023/24": {
    leagueTable: [
      {
        position: 1,
        club: "Hasaacas Ladies",
        played: 18,
        won: 16,
        drawn: 1,
        lost: 1,
        gf: 48,
        ga: 6,
        gd: 42,
        points: 49,
        form: ["W", "W", "W", "W", "D"],
        zone: "Southern",
      },
      {
        position: 2,
        club: "Ampem Darkoa Ladies",
        played: 18,
        won: 14,
        drawn: 2,
        lost: 2,
        gf: 41,
        ga: 10,
        gd: 31,
        points: 44,
        form: ["W", "L", "W", "W", "W"],
        zone: "Northern",
      },
      {
        position: 3,
        club: "Northern Ladies",
        played: 18,
        won: 12,
        drawn: 3,
        lost: 3,
        gf: 35,
        ga: 15,
        gd: 20,
        points: 39,
        form: ["W", "W", "D", "W", "L"],
        zone: "Northern",
      },
      {
        position: 4,
        club: "Faith Ladies",
        played: 18,
        won: 10,
        drawn: 5,
        lost: 3,
        gf: 28,
        ga: 20,
        gd: 8,
        points: 35,
        form: ["D", "W", "D", "W", "W"],
        zone: "Southern",
      },
      {
        position: 5,
        club: "Thunder Queens",
        played: 18,
        won: 9,
        drawn: 4,
        lost: 5,
        gf: 26,
        ga: 22,
        gd: 4,
        points: 31,
        form: ["W", "L", "W", "D", "W"],
        zone: "Southern",
      },
      {
        position: 6,
        club: "Dreamz Ladies",
        played: 18,
        won: 8,
        drawn: 3,
        lost: 7,
        gf: 24,
        ga: 29,
        gd: -5,
        points: 27,
        form: ["L", "W", "L", "D", "L"],
        zone: "Northern",
      },
    ],
    topScorers: [
      { name: "Evelyn Badu", club: "Hasaacas Ladies", goals: 22, position: "Forward" },
      { name: "Ophelia Amponsah", club: "Ampem Darkoa Ladies", goals: 17, position: "Forward" },
      { name: "Janet Egyir", club: "Northern Ladies", goals: 14, position: "Midfielder" },
      { name: "Doris Boaduwaa", club: "Faith Ladies", goals: 11, position: "Forward" },
      { name: "Milot Pokua", club: "Thunder Queens", goals: 10, position: "Forward" },
    ],
  },
  "2022/23": {
    leagueTable: [
      {
        position: 1,
        club: "Ampem Darkoa Ladies",
        played: 18,
        won: 15,
        drawn: 3,
        lost: 0,
        gf: 43,
        ga: 5,
        gd: 38,
        points: 48,
        form: ["W", "W", "D", "W", "W"],
        zone: "Northern",
      },
      {
        position: 2,
        club: "Hasaacas Ladies",
        played: 18,
        won: 13,
        drawn: 4,
        lost: 1,
        gf: 39,
        ga: 8,
        gd: 31,
        points: 43,
        form: ["W", "W", "W", "D", "W"],
        zone: "Southern",
      },
      {
        position: 3,
        club: "Soccer Intellectuals",
        played: 18,
        won: 11,
        drawn: 2,
        lost: 5,
        gf: 30,
        ga: 18,
        gd: 12,
        points: 35,
        form: ["W", "L", "W", "W", "D"],
        zone: "Southern",
      },
      {
        position: 4,
        club: "Northern Ladies",
        played: 18,
        won: 9,
        drawn: 5,
        lost: 4,
        gf: 27,
        ga: 19,
        gd: 8,
        points: 32,
        form: ["D", "W", "L", "W", "D"],
        zone: "Northern",
      },
      {
        position: 5,
        club: "Berry Ladies",
        played: 18,
        won: 8,
        drawn: 4,
        lost: 6,
        gf: 23,
        ga: 24,
        gd: -1,
        points: 28,
        form: ["L", "W", "D", "L", "W"],
        zone: "Southern",
      },
      {
        position: 6,
        club: "Pearl Pia Ladies",
        played: 18,
        won: 6,
        drawn: 6,
        lost: 6,
        gf: 20,
        ga: 25,
        gd: -5,
        points: 24,
        form: ["D", "L", "D", "W", "L"],
        zone: "Northern",
      },
    ],
    topScorers: [
      { name: "Tracey Twum", club: "Ampem Darkoa Ladies", goals: 19, position: "Forward" },
      { name: "Perpetual Agyekum", club: "Hasaacas Ladies", goals: 16, position: "Forward" },
      { name: "Comfort Yeboah", club: "Soccer Intellectuals", goals: 13, position: "Midfielder" },
      { name: "Rahama Jafaru", club: "Northern Ladies", goals: 12, position: "Forward" },
      { name: "Jennifer Cudjoe", club: "Berry Ladies", goals: 9, position: "Forward" },
    ],
  },
}

export default function PublicTablesPage() {
  const [selectedSeason, setSelectedSeason] = useState("2024/25")
  const currentData = seasonData[selectedSeason as keyof typeof seasonData]

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
            <Button variant="outline" asChild className="text-white border-white/20 hover:bg-white/10 bg-transparent">
              <Link href="/fixtures">
                <Calendar className="h-5 w-5 mr-2" />
                View Fixtures
              </Link>
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-bold mb-4">Tables & Statistics</h1>
              <p className="text-xl text-white/90">
                Current standings and top performers in Ghana Women's Premier League
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-white/80" />
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/25">2024/25 Season</SelectItem>
                  <SelectItem value="2023/24">2023/24 Season</SelectItem>
                  <SelectItem value="2022/23">2022/23 Season</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* League Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Ghana Women's Premier League {selectedSeason}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Pos</th>
                        <th className="text-left p-2">Club</th>
                        <th className="text-center p-2">P</th>
                        <th className="text-center p-2">W</th>
                        <th className="text-center p-2">D</th>
                        <th className="text-center p-2">L</th>
                        <th className="text-center p-2">GF</th>
                        <th className="text-center p-2">GA</th>
                        <th className="text-center p-2">GD</th>
                        <th className="text-center p-2">Pts</th>
                        <th className="text-center p-2">Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.leagueTable.map((team) => (
                        <tr key={team.position} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">
                            <div className="flex items-center gap-2">
                              {team.position}
                              {team.position === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                            </div>
                          </td>
                          <td className="p-2">
                            <div>
                              <div className="font-medium">{team.club}</div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {team.zone}
                              </Badge>
                            </div>
                          </td>
                          <td className="text-center p-2">{team.played}</td>
                          <td className="text-center p-2">{team.won}</td>
                          <td className="text-center p-2">{team.drawn}</td>
                          <td className="text-center p-2">{team.lost}</td>
                          <td className="text-center p-2">{team.gf}</td>
                          <td className="text-center p-2">{team.ga}</td>
                          <td className="text-center p-2">
                            <span className={team.gd > 0 ? "text-green-600" : team.gd < 0 ? "text-red-600" : ""}>
                              {team.gd > 0 ? "+" : ""}
                              {team.gd}
                            </span>
                          </td>
                          <td className="text-center p-2 font-bold">{team.points}</td>
                          <td className="text-center p-2">
                            <div className="flex gap-1 justify-center">
                              {team.form.map((result, index) => (
                                <span
                                  key={index}
                                  className={`w-5 h-5 rounded-full text-xs flex items-center justify-center text-white ${
                                    result === "W" ? "bg-green-500" : result === "D" ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                >
                                  {result}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Scorers */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Top Scorers {selectedSeason}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.topScorers.map((scorer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{scorer.name}</div>
                        <div className="text-sm text-muted-foreground">{scorer.club}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {scorer.position}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{scorer.goals}</div>
                        <div className="text-xs text-muted-foreground">goals</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Zone Statistics */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Zone Performance {selectedSeason}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(() => {
                    const northernTeams = currentData.leagueTable.filter((team) => team.zone === "Northern")
                    const southernTeams = currentData.leagueTable.filter((team) => team.zone === "Southern")
                    const northernAvg =
                      northernTeams.reduce((sum, team) => sum + team.position, 0) / northernTeams.length
                    const southernAvg =
                      southernTeams.reduce((sum, team) => sum + team.position, 0) / southernTeams.length

                    return (
                      <>
                        <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                          <span className="font-medium">Northern Zone</span>
                          <div className="text-right">
                            <div className="text-lg font-bold">{northernTeams.length} Teams</div>
                            <div className="text-sm text-muted-foreground">Avg Position: {northernAvg.toFixed(1)}</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                          <span className="font-medium">Southern Zone</span>
                          <div className="text-right">
                            <div className="text-lg font-bold">{southernTeams.length} Teams</div>
                            <div className="text-sm text-muted-foreground">Avg Position: {southernAvg.toFixed(1)}</div>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
