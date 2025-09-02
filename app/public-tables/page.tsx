"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock league table data
const leagueTable = [
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
]

const topScorers = [
  { name: "Abbi Grant", club: "Ampem Darkoa Ladies", goals: 18, position: "Forward" },
  { name: "Abbie Larkin", club: "Hasaacas Ladies", goals: 15, position: "Forward" },
  { name: "Sarah Mensah", club: "Faith Ladies", goals: 12, position: "Midfielder" },
  { name: "Grace Asante", club: "Northern Ladies", goals: 10, position: "Forward" },
  { name: "Mary Essien", club: "Sea Lions", goals: 9, position: "Forward" },
]

export default function PublicTablesPage() {
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
          <h1 className="text-5xl font-bold mb-4">Tables & Statistics</h1>
          <p className="text-xl text-white/90">Current standings and top performers in Ghana Women's Premier League</p>
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
                  Ghana Women's Premier League 2024/25
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
                      {leagueTable.map((team) => (
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
                  Top Scorers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topScorers.map((scorer, index) => (
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
                <CardTitle>Zone Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="font-medium">Northern Zone</span>
                    <div className="text-right">
                      <div className="text-lg font-bold">3 Teams</div>
                      <div className="text-sm text-muted-foreground">Avg Position: 3.7</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                    <span className="font-medium">Southern Zone</span>
                    <div className="text-right">
                      <div className="text-lg font-bold">3 Teams</div>
                      <div className="text-sm text-muted-foreground">Avg Position: 3.3</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
