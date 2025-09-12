"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trophy,
  Activity,
  BarChart3,
  TrendingUp,
  Star,
  Shield,
  CheckCircle,
  AlertCircle,
  XCircle,
  Timer,
  Globe,
  Camera,
  FileText,
  Download,
  Share2,
  Settings,
  Bell,
  Sparkles,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

const clubs = [
  "All Clubs",
  "Ashtown Ladies",
  "Hasaacas Ladies",
  "Ampem Darkoa Ladies",
  "Thunder Queens",
  "Sea Lions FC",
  "Immigration Ladies",
  "Police Ladies",
  "Army Ladies",
  "Prisons Ladies",
  "Northern Ladies",
  "Fabulous Ladies",
]

const friendlyMatches = [
  {
    id: 1,
    homeTeam: "Hasaacas Ladies",
    awayTeam: "Ashtown Ladies",
    date: "2024-01-15",
    time: "15:00",
    venue: "Sekondi Sports Stadium",
    status: "scheduled",
    type: "preparation",
    organizer: "Hasaacas Ladies",
    purpose: "Pre-season preparation",
    attendance: 2500,
    ticketPrice: "₵10",
    broadcast: "GTV Sports",
    referee: "Theresa Bremansu",
    weather: "Sunny, 28°C",
    fitnessObjective: "Match sharpness",
    tacticalFocus: "High pressing",
    expectedLineup: "4-3-3 Formation",
    keyPlayers: ["Evelyn Badu", "Doris Boaduwaa"],
    injuryReport: "2 players unavailable",
    mediaAttention: "high",
  },
  {
    id: 2,
    homeTeam: "Thunder Queens",
    awayTeam: "Sea Lions FC",
    date: "2024-01-18",
    time: "16:30",
    venue: "Tamale Sports Stadium",
    status: "completed",
    type: "charity",
    organizer: "GFA",
    purpose: "Charity fundraiser",
    result: "2-1",
    attendance: 3200,
    ticketPrice: "₵15",
    broadcast: "Max TV",
    referee: "Joyce Appiah",
    weather: "Clear, 31°C",
    fitnessObjective: "Endurance test",
    tacticalFocus: "Counter-attacking",
    expectedLineup: "4-4-2 Formation",
    keyPlayers: ["Samira Suleman", "Rahama Jafaru"],
    injuryReport: "All players fit",
    mediaAttention: "medium",
    matchRating: 8.5,
    goalsScored: 2,
    goalsConceded: 1,
    possession: 58,
    shots: 14,
    shotsOnTarget: 6,
    corners: 7,
    fouls: 12,
    yellowCards: 3,
    redCards: 0,
    playerRatings: {
      "Samira Suleman": 9.2,
      "Rahama Jafaru": 8.8,
      "Fatima Mohammed": 8.1,
    },
  },
  {
    id: 3,
    homeTeam: "Immigration Ladies",
    awayTeam: "Police Ladies",
    date: "2024-01-22",
    time: "14:00",
    venue: "El Wak Sports Stadium",
    status: "cancelled",
    type: "training",
    organizer: "Immigration Ladies",
    purpose: "Training match",
    attendance: 0,
    ticketPrice: "Free",
    broadcast: "None",
    referee: "TBD",
    weather: "Rainy",
    fitnessObjective: "Recovery session",
    tacticalFocus: "Set pieces",
    expectedLineup: "3-5-2 Formation",
    keyPlayers: ["Grace Asantewaa"],
    injuryReport: "5 players injured",
    mediaAttention: "low",
    cancellationReason: "Pitch conditions",
  },
  {
    id: 4,
    homeTeam: "Army Ladies",
    awayTeam: "Northern Ladies",
    date: "2024-01-25",
    time: "17:00",
    venue: "Burma Camp Stadium",
    status: "pending",
    type: "preparation",
    organizer: "Army Ladies",
    purpose: "Match fitness",
    attendance: 1800,
    ticketPrice: "₵8",
    broadcast: "GBC Sports",
    referee: "Felicia Addo",
    weather: "Partly cloudy, 26°C",
    fitnessObjective: "Game rhythm",
    tacticalFocus: "Wing play",
    expectedLineup: "4-2-3-1 Formation",
    keyPlayers: ["Janet Egyir", "Alberta Sackey"],
    injuryReport: "1 player doubtful",
    mediaAttention: "medium",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "International Friendly Window Opens",
    date: "2024-02-01",
    type: "deadline",
    description: "Clubs can schedule international friendlies",
  },
  {
    id: 2,
    title: "Charity Match Registration",
    date: "2024-02-05",
    type: "registration",
    description: "Register for annual charity tournament",
  },
  {
    id: 3,
    title: "Pre-season Training Camp",
    date: "2024-02-10",
    type: "event",
    description: "Multi-club training camp in Cape Coast",
  },
]

export default function FriendliesPage() {
  const [selectedClub, setSelectedClub] = useState("All Clubs")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredMatches = friendlyMatches.filter((match) => {
    const matchesClub =
      selectedClub === "All Clubs" || match.homeTeam === selectedClub || match.awayTeam === selectedClub

    const matchesSearch =
      searchTerm === "" ||
      match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || match.status === statusFilter
    const matchesType = typeFilter === "all" || match.type === typeFilter

    return matchesClub && matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <CheckCircle className="w-4 h-4" />
      case "completed":
        return <Trophy className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      case "pending":
        return <Timer className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "preparation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "charity":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "training":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getMediaAttentionColor = (attention: string) => {
    switch (attention) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const stats = {
    total: filteredMatches.length,
    scheduled: filteredMatches.filter((m) => m.status === "scheduled").length,
    completed: filteredMatches.filter((m) => m.status === "completed").length,
    pending: filteredMatches.filter((m) => m.status === "pending").length,
    cancelled: filteredMatches.filter((m) => m.status === "cancelled").length,
    avgAttendance: Math.round(
      filteredMatches.reduce((acc, m) => acc + (m.attendance || 0), 0) / filteredMatches.length,
    ),
    totalRevenue: filteredMatches.reduce((acc, m) => {
      const price = Number.parseInt(m.ticketPrice?.replace("₵", "") || "0")
      return acc + price * (m.attendance || 0)
    }, 0),
  }

  return (
    <MainLayout>
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Friendly Match Management</h1>
          </div>
          <p className="text-muted-foreground">Comprehensive friendly match scheduling and performance tracking</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Schedule
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <Plus className="w-4 h-4" />
            Schedule Friendly
          </Button>
        </div>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="matches" className="gap-2">
            <Trophy className="w-4 h-4" />
            Matches
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="w-4 h-4" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2">
            <Bell className="w-4 h-4" />
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-6">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Total Matches</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700">Completed</p>
                    <p className="text-2xl font-bold text-emerald-900">{stats.completed}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-700">Scheduled</p>
                    <p className="text-2xl font-bold text-amber-900">{stats.scheduled}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700">Avg Attendance</p>
                    <p className="text-2xl font-bold text-purple-900">{stats.avgAttendance}</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-pink-700">Revenue</p>
                    <p className="text-2xl font-bold text-pink-900">₵{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-pink-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-700">Pending</p>
                    <p className="text-2xl font-bold text-orange-900">{stats.pending}</p>
                  </div>
                  <Timer className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <Select value={selectedClub} onValueChange={setSelectedClub}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Club" />
                  </SelectTrigger>
                  <SelectContent>
                    {clubs.map((club) => (
                      <SelectItem key={club} value={club}>
                        {club}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search matches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="preparation">Preparation</SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  Advanced
                </Button>

                <Button variant="outline" className="gap-2 bg-transparent">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Matches List */}
          <div className="space-y-6">
            {filteredMatches.map((match) => (
              <Card
                key={match.id}
                className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-emerald-500"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Match Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                            <Shield className="w-8 h-8 text-emerald-600" />
                          </div>
                          <p className="font-bold text-foreground text-sm">{match.homeTeam}</p>
                          <p className="text-xs text-muted-foreground">Home</p>
                        </div>

                        <div className="text-center">
                          <div className="text-3xl font-bold text-muted-foreground mb-2">VS</div>
                          {match.result && (
                            <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                              {match.result}
                            </Badge>
                          )}
                        </div>

                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                            <Shield className="w-8 h-8 text-blue-600" />
                          </div>
                          <p className="font-bold text-foreground text-sm">{match.awayTeam}</p>
                          <p className="text-xs text-muted-foreground">Away</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{match.date}</span>
                          <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                          <span>{match.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{match.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span>{match.weather}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStatusColor(match.status)}>
                          {getStatusIcon(match.status)}
                          <span className="ml-1">{match.status.charAt(0).toUpperCase() + match.status.slice(1)}</span>
                        </Badge>
                        <Badge className={getTypeColor(match.type)}>
                          {match.type.charAt(0).toUpperCase() + match.type.slice(1)}
                        </Badge>
                        <Badge className={getMediaAttentionColor(match.mediaAttention)}>
                          <Camera className="w-3 h-3 mr-1" />
                          {match.mediaAttention} Media
                        </Badge>
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Match Details</h4>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Purpose:</span>
                          <span className="font-medium">{match.purpose}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Organizer:</span>
                          <span className="font-medium">{match.organizer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Attendance:</span>
                          <span className="font-medium">{match.attendance?.toLocaleString() || "TBD"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ticket Price:</span>
                          <span className="font-medium">{match.ticketPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Broadcast:</span>
                          <span className="font-medium">{match.broadcast}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Referee:</span>
                          <span className="font-medium">{match.referee}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Tactical Focus</p>
                        <Badge variant="outline" className="text-xs">
                          {match.tacticalFocus}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Key Players</p>
                        <div className="flex flex-wrap gap-1">
                          {match.keyPlayers?.map((player, index) => (
                            <Badge key={index} className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              {player}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Performance & Actions */}
                    <div className="space-y-4">
                      {match.status === "completed" && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground">Match Performance</h4>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Match Rating</span>
                              <span className="font-bold">{match.matchRating}/10</span>
                            </div>
                            <Progress value={(match.matchRating || 0) * 10} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <p className="font-bold text-foreground">{match.possession}%</p>
                              <p className="text-xs text-muted-foreground">Possession</p>
                            </div>
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <p className="font-bold text-foreground">{match.shots}</p>
                              <p className="text-xs text-muted-foreground">Shots</p>
                            </div>
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <p className="font-bold text-foreground">{match.corners}</p>
                              <p className="text-xs text-muted-foreground">Corners</p>
                            </div>
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <p className="font-bold text-foreground">{match.fouls}</p>
                              <p className="text-xs text-muted-foreground">Fouls</p>
                            </div>
                          </div>

                          {match.playerRatings && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-foreground">Top Performers</p>
                              {Object.entries(match.playerRatings).map(([player, rating]) => (
                                <div key={player} className="flex justify-between items-center text-sm">
                                  <span>{player}</span>
                                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{rating}</Badge>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {match.status === "cancelled" && match.cancellationReason && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm font-medium text-red-800 mb-1">Cancelled</p>
                          <p className="text-sm text-red-700">{match.cancellationReason}</p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </Button>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <Share2 className="w-3 h-3" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <FileText className="w-3 h-3" />
                            Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMatches.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No matches found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or schedule a new friendly match.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <Plus className="w-4 h-4" />
                  Schedule First Friendly
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Match Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Calendar View</h3>
                <p className="text-muted-foreground">Visual calendar with drag-and-drop scheduling coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Match Analytics</h3>
                  <p className="text-muted-foreground">Detailed performance metrics and trend analysis</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Revenue Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Financial Analytics</h3>
                  <p className="text-muted-foreground">Revenue tracking and attendance analysis</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Upcoming Events & Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{event.date}</p>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </MainLayout>
  )
}
