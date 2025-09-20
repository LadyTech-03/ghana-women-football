"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, MapPin, Clock, Trophy, BarChart3, Users, BoxSelect } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

// Enhanced fixture data with club logos
const clubLogos: Record<string, string> = {
  "Ashtown Ladies": "/placeholder.svg?height=40&width=40&text=AL",
  "Kumasi Sports Aca.": "/placeholder.svg?height=40&width=40&text=KSA",
  "FC Savannah": "/placeholder.svg?height=40&width=40&text=FCS",
  "Ampem Darkoa Ladies": "/clubs/ampem-darkoa.png",
  "Fosu Royal Ladies": "/placeholder.svg?height=40&width=40&text=FRL",
  "Northern City Ladies": "/placeholder.svg?height=40&width=40&text=NCL",
  "Northern Ladies": "/placeholder.svg?height=40&width=40&text=NL",
  "Prisons Ladies": "/placeholder.svg?height=40&width=40&text=PL",
  "Dreamz Ladies": "/placeholder.svg?height=40&width=40&text=DL",
  "Tamale Super Ladies": "/placeholder.svg?height=40&width=40&text=TSL",
  "Epiphany Warriors": "/placeholder.svg?height=40&width=40&text=EW",
  "Army Ladies": "/placeholder.svg?height=40&width=40&text=AL",
  "Oak FC": "/placeholder.svg?height=40&width=40&text=OFC",
  "Hasaacas Ladies": "/clubs/hasaacas.jpeg",
  "Police Ladies": "/placeholder.svg?height=40&width=40&text=PL",
  "Halifax Queens": "/placeholder.svg?height=40&width=40&text=HQ",
  "FC Samartex Ladies": "/placeholder.svg?height=40&width=40&text=FSL",
  "Ladystrikers FC": "/placeholder.svg?height=40&width=40&text=LFC",
  "Jonina Ladies": "/placeholder.svg?height=40&width=40&text=JL",
  "Soccer Intellectuals": "/placeholder.svg?height=40&width=40&text=SI",
}

const seasonFixtures = {
  "2025/26": {
    northern: [
      // Matchday 1
      {
        matchday: 1,
        date: "2025-02-15",
        time: "15:00",
        homeTeam: "Ashtown Ladies",
        awayTeam: "Kumasi Sports Aca.",
        venue: "Ashtown Park",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      {
        matchday: 1,
        date: "2025-02-15",
        time: "15:00",
        homeTeam: "FC Savannah",
        awayTeam: "Ampem Darkoa Ladies",
        venue: "Savannah Stadium",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      {
        matchday: 1,
        date: "2025-02-15",
        time: "17:00",
        homeTeam: "Fosu Royal Ladies",
        awayTeam: "Northern City Ladies",
        venue: "Royal Park",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      {
        matchday: 1,
        date: "2025-02-16",
        time: "15:00",
        homeTeam: "Northern Ladies",
        awayTeam: "Prisons Ladies",
        venue: "Northern Stadium",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      {
        matchday: 1,
        date: "2025-02-16",
        time: "17:00",
        homeTeam: "Dreamz Ladies",
        awayTeam: "Tamale Super Ladies",
        venue: "Dreamz Stadium",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      // Matchday 2
      {
        matchday: 2,
        date: "2025-02-22",
        time: "15:00",
        homeTeam: "Prisons Ladies",
        awayTeam: "Dreamz Ladies",
        venue: "Prisons Ground",
        status: "completed",
        homeScore: 2,
        awayScore: 1,
      },
      {
        matchday: 2,
        date: "2025-02-22",
        time: "15:00",
        homeTeam: "Northern City Ladies",
        awayTeam: "FC Savannah",
        venue: "City Stadium",
        status: "completed",
        homeScore: 0,
        awayScore: 3,
      },
      {
        matchday: 2,
        date: "2025-02-22",
        time: "17:00",
        homeTeam: "Tamale Super Ladies",
        awayTeam: "Fosu Royal Ladies",
        venue: "Tamale Park",
        status: "completed",
        homeScore: 1,
        awayScore: 1,
      },
      {
        matchday: 2,
        date: "2025-02-23",
        time: "15:00",
        homeTeam: "Ampem Darkoa Ladies",
        awayTeam: "Ashtown Ladies",
        venue: "Techiman Park",
        status: "completed",
        homeScore: 2,
        awayScore: 0,
      },
      {
        matchday: 2,
        date: "2025-02-23",
        time: "17:00",
        homeTeam: "Kumasi Sports Aca.",
        awayTeam: "Northern Ladies",
        venue: "Kumasi Stadium",
        status: "completed",
        homeScore: 1,
        awayScore: 2,
      },
    ],
    southern: [
      // Matchday 1
      {
        matchday: 1,
        date: "2025-02-16",
        time: "15:00",
        homeTeam: "Epiphany Warriors",
        awayTeam: "Army Ladies",
        venue: "Epiphany Park",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      {
        matchday: 1,
        date: "2025-02-16",
        time: "15:00",
        homeTeam: "Oak FC",
        awayTeam: "Hasaacas Ladies",
        venue: "Oak Stadium",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      {
        matchday: 1,
        date: "2025-02-16",
        time: "17:00",
        homeTeam: "Police Ladies",
        awayTeam: "Halifax Queens",
        venue: "Police Ground",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      {
        matchday: 1,
        date: "2025-02-17",
        time: "15:00",
        homeTeam: "FC Samartex Ladies",
        awayTeam: "Ladystrikers FC",
        venue: "Samartex Park",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      {
        matchday: 1,
        date: "2025-02-17",
        time: "17:00",
        homeTeam: "Jonina Ladies",
        awayTeam: "Soccer Intellectuals",
        venue: "Jonina Stadium",
        status: "upcoming",
        homeScore: null,
        awayScore: null,
      },
      // Matchday 2
      {
        matchday: 2,
        date: "2025-02-23",
        time: "15:00",
        homeTeam: "Army Ladies",
        awayTeam: "Police Ladies",
        venue: "Army Barracks",
        status: "completed",
        homeScore: 1,
        awayScore: 0,
      },
      {
        matchday: 2,
        date: "2025-02-23",
        time: "15:00",
        homeTeam: "Halifax Queens",
        awayTeam: "FC Samartex Ladies",
        venue: "Halifax Park",
        status: "completed",
        homeScore: 2,
        awayScore: 2,
      },
      {
        matchday: 2,
        date: "2025-02-23",
        time: "17:00",
        homeTeam: "Soccer Intellectuals",
        awayTeam: "Epiphany Warriors",
        venue: "Intellectuals Ground",
        status: "completed",
        homeScore: 0,
        awayScore: 1,
      },
      {
        matchday: 2,
        date: "2025-02-24",
        time: "15:00",
        homeTeam: "Hasaacas Ladies",
        awayTeam: "Jonina Ladies",
        venue: "Gyandu Park",
        status: "completed",
        homeScore: 3,
        awayScore: 1,
      },
      {
        matchday: 2,
        date: "2025-02-24",
        time: "17:00",
        homeTeam: "Ladystrikers FC",
        awayTeam: "Oak FC",
        venue: "Strikers Stadium",
        status: "completed",
        homeScore: 1,
        awayScore: 1,
      },
    ],
  },
  "2024/25": {
    northern: [
      {
        matchday: 1,
        date: "2024-09-15",
        time: "15:00",
        homeTeam: "Ashtown Ladies",
        awayTeam: "Kumasi Sports Aca.",
        venue: "Ashtown Park",
        status: "completed",
        homeScore: 2,
        awayScore: 1,
      },
      {
        matchday: 1,
        date: "2024-09-15",
        time: "15:00",
        homeTeam: "FC Savannah",
        awayTeam: "Ampem Darkoa Ladies",
        venue: "Savannah Stadium",
        status: "completed",
        homeScore: 0,
        awayScore: 3,
      },
    ],
    southern: [
      {
        matchday: 1,
        date: "2024-09-16",
        time: "15:00",
        homeTeam: "Epiphany Warriors",
        awayTeam: "Army Ladies",
        venue: "Epiphany Park",
        status: "completed",
        homeScore: 1,
        awayScore: 2,
      },
    ],
  },
  "2023/24": {
    northern: [
      {
        matchday: 1,
        date: "2023-10-15",
        time: "15:00",
        homeTeam: "Northern Ladies",
        awayTeam: "Prisons Ladies",
        venue: "Northern Stadium",
        status: "completed",
        homeScore: 3,
        awayScore: 0,
      },
    ],
    southern: [
      {
        matchday: 1,
        date: "2023-10-16",
        time: "15:00",
        homeTeam: "Hasaacas Ladies",
        awayTeam: "Oak FC",
        venue: "Gyandu Park",
        status: "completed",
        homeScore: 4,
        awayScore: 1,
      },
    ],
  },
}

export default function FixturesPage() {
  const [selectedMatchday, setSelectedMatchday] = useState<number | null>(null)
  const [selectedSeason, setSelectedSeason] = useState("2025/26")

  const currentSeasonData = seasonFixtures[selectedSeason as keyof typeof seasonFixtures]
  const northernFixtures = currentSeasonData.northern
  const southernFixtures = currentSeasonData.southern

  const getMatchdayFixtures = (fixtures: typeof northernFixtures, matchday: number) => {
    return fixtures.filter((fixture) => fixture.matchday === matchday)
  }

  const getUniqueMatchdays = (fixtures: typeof northernFixtures) => {
    return [...new Set(fixtures.map((f) => f.matchday))].sort()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

const FixtureCard = ({ fixture, zoneColor }: { fixture: any; zoneColor: string }) => (
  <div className="group relative overflow-hidden rounded-xl border bg-gradient-to-r from-background via-background to-muted/20 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
      {/* Teams Section */}
      <div className="flex items-center gap-4 sm:gap-8 flex-1">
        {/* Home Team */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
          <div className="text-right">
            <div className="font-semibold text-sm sm:text-lg group-hover:text-primary transition-colors">{fixture.homeTeam}</div>
          </div>
          <div className="relative">
            <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full flex items-center justify-center border-2 border-background shadow-lg">
              <Image
                src={clubLogos[fixture.homeTeam] || "/placeholder.svg"}
                alt={fixture.homeTeam}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Score/VS Section */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[80px] sm:min-w-[120px]">
          {fixture.status === "completed" ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className={`text-lg sm:text-2xl font-bold ${zoneColor}`}>{fixture.homeScore}</div>
              <div className="text-muted-foreground">-</div>
              <div className={`text-lg sm:text-2xl font-bold ${zoneColor}`}>{fixture.awayScore}</div>
            </div>
          ) : (
            <div
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                zoneColor === "text-primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
              }`}
            >
              VS
            </div>
          )}
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {fixture.time}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          <div className="relative">
            <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full flex items-center justify-center border-2 border-background shadow-lg">
              <Image
                src={clubLogos[fixture.awayTeam] || "/placeholder.svg"}
                alt={fixture.awayTeam}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="text-left">
            <div className="font-semibold text-sm sm:text-lg group-hover:text-primary transition-colors">{fixture.awayTeam}</div>
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div className="flex items-center gap-4 sm:flex-col justify-between sm:text-right space-y-0 sm:space-y-2 sm:ml-6 mt-4 sm:mt-0">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground sm:justify-end">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="truncate">{fixture.venue}</span>
        </div>
        {/* <div className="flex items-center gap-2 sm:justify-end">
          <Badge 
            variant={fixture.status === "completed" ? "default" : "secondary"} 
            className="text-[10px] sm:text-xs px-2 py-0 sm:px-3 sm:py-1"
          >
            {fixture.status === "completed" ? "Full Time" : "Upcoming"}
          </Badge>
        </div> */}
        <div className="hidden sm:block text-xs text-muted-foreground">{formatDate(fixture.date)}</div>
      </div>
    </div>
  </div>
)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-accent text-white py-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200&text=Football+Pattern')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center mb-8">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 mr-4">
              <Link href="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="text-white border-white/20 hover:bg-white/10 bg-transparent">
              <Link href="/public-tables">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Tables
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Fixtures & Results
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-white/80" />
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025/26">2025/26 Season</SelectItem>
                  <SelectItem value="2024/25">2024/25 Season</SelectItem>
                  <SelectItem value="2023/24">2023/24 Season</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="northern" className="w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enhanced Sidebar */}
            <div className="lg:w-80">
              <Card className="sticky top-4 overflow-hidden">
                <CardHeader className="">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Zone Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
                    <TabsTrigger value="northern" className="text-sm font-medium">
                      Northern Zone
                    </TabsTrigger>
                    <TabsTrigger value="southern" className="text-sm font-medium">
                      Southern Zone
                    </TabsTrigger>
                  </TabsList>

                  {/* Enhanced Matchday Filter */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Filter Matchdays
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        variant={selectedMatchday === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMatchday(null)}
                        className="text-xs font-medium"
                      >
                        All
                      </Button>
                      {getUniqueMatchdays(northernFixtures).map((matchday) => (
                        <Button
                          key={matchday}
                          variant={selectedMatchday === matchday ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedMatchday(matchday)}
                          className="text-xs font-medium"
                        >
                          {matchday}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Zone Stats */}
                  <div className="mt-8 pt-6 border-t space-y-4">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Zone Overview
                    </h4>
                    <div className="space-y-3">
                      <div className="group p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-primary">Northern Zone</span>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">10</div>
                            <div className="text-xs text-muted-foreground">Teams</div>
                          </div>
                        </div>
                      </div>
                      <div className="group p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20 hover:border-accent/40 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-accent">Southern Zone</span>
                          <div className="text-right">
                            <div className="text-lg font-bold text-accent">10</div>
                            <div className="text-xs text-muted-foreground">Teams</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
                      Quick Navigation
                    </h4>
                    <div className="space-y-2">
                      <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                        <Link href="/public-tables">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          League Tables
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                        <Link href="/public-clubs">
                          <Users className="h-4 w-4 mr-2" />
                          All Clubs
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Fixtures Content */}
            <div className="flex-1">
              <TabsContent value="northern" className="mt-0">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-primary mb-2">Northern Zone Fixtures</h2>
                      <p className="text-muted-foreground">
                        {selectedMatchday ? `Showing Matchday ${selectedMatchday}` : "Showing all matchdays"}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-sm px-4 py-2">
                      {northernFixtures.length} Total Fixtures
                    </Badge>
                  </div>

                  {getUniqueMatchdays(northernFixtures)
                    .filter((matchday) => selectedMatchday === null || matchday === selectedMatchday)
                    .map((matchday) => (
                      <Card key={matchday} className="overflow-hidden">
                        <CardHeader className="border-b">
                          <CardTitle className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/30">
                              <span className="text-lg font-bold text-primary">{matchday}</span>
                            </div>
                            <div>
                              <div className="text-xl text-primary">Matchday {matchday}</div>
                              <div className="text-sm text-muted-foreground font-normal">
                                {formatFullDate(getMatchdayFixtures(northernFixtures, matchday)[0]?.date)}
                              </div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {getMatchdayFixtures(northernFixtures, matchday).map((fixture, index) => (
                              <FixtureCard key={index} fixture={fixture} zoneColor="text-primary" />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="southern" className="mt-0">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-accent mb-2">Southern Zone Fixtures</h2>
                      <p className="text-muted-foreground">
                        {selectedMatchday ? `Showing Matchday ${selectedMatchday}` : "Showing all matchdays"}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-sm px-4 py-2">
                      {southernFixtures.length} Total Fixtures
                    </Badge>
                  </div>

                  {getUniqueMatchdays(southernFixtures)
                    .filter((matchday) => selectedMatchday === null || matchday === selectedMatchday)
                    .map((matchday) => (
                      <Card key={matchday} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 border-b">
                          <CardTitle className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent/30">
                              <span className="text-lg font-bold text-accent">{matchday}</span>
                            </div>
                            <div>
                              <div className="text-xl text-accent">Matchday {matchday}</div>
                              <div className="text-sm text-muted-foreground font-normal">
                                {formatFullDate(getMatchdayFixtures(southernFixtures, matchday)[0]?.date)}
                              </div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {getMatchdayFixtures(southernFixtures, matchday).map((fixture, index) => (
                              <FixtureCard key={index} fixture={fixture} zoneColor="text-accent" />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
