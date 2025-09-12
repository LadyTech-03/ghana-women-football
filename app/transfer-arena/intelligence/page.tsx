"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Star,
  Calendar,
  Plus,
  FileText,
  Users,
  Target,
} from "lucide-react"
import { Main } from "next/document"
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
]

const scoutingReports = [
  {
    id: 1,
    playerName: "Abena Mensah",
    position: "Forward",
    club: "Hasaacas Ladies",
    age: 22,
    rating: 8.5,
    marketValue: "₵45,000",
    scout: "John Appiah",
    date: "2024-01-10",
    status: "active",
    strengths: ["Pace", "Finishing", "Positioning"],
    weaknesses: ["Aerial ability", "Left foot"],
    recommendation: "high",
  },
  {
    id: 2,
    playerName: "Akosua Frimpong",
    position: "Midfielder",
    club: "Thunder Queens",
    age: 24,
    rating: 7.8,
    marketValue: "₵38,000",
    scout: "Mary Asante",
    date: "2024-01-08",
    status: "pending",
    strengths: ["Passing", "Vision", "Work rate"],
    weaknesses: ["Physicality", "Long shots"],
    recommendation: "medium",
  },
  {
    id: 3,
    playerName: "Efua Boateng",
    position: "Defender",
    club: "Sea Lions FC",
    age: 26,
    rating: 8.2,
    marketValue: "₵42,000",
    scout: "Peter Osei",
    date: "2024-01-05",
    status: "completed",
    strengths: ["Tackling", "Leadership", "Aerial ability"],
    weaknesses: ["Pace", "Distribution"],
    recommendation: "high",
  },
]

const marketTrends = [
  {
    position: "Forward",
    avgValue: "₵48,500",
    trend: "up",
    change: "+12%",
    topClubs: ["Hasaacas Ladies", "Ashtown Ladies"],
    demand: "high",
  },
  {
    position: "Midfielder",
    avgValue: "₵35,200",
    trend: "stable",
    change: "+2%",
    topClubs: ["Thunder Queens", "Immigration Ladies"],
    demand: "medium",
  },
  {
    position: "Defender",
    avgValue: "₵32,800",
    trend: "down",
    change: "-5%",
    topClubs: ["Police Ladies", "Army Ladies"],
    demand: "low",
  },
  {
    position: "Goalkeeper",
    avgValue: "₵28,000",
    trend: "up",
    change: "+8%",
    topClubs: ["Northern Ladies", "Prisons Ladies"],
    demand: "medium",
  },
]

export default function IntelligencePage() {
  const [selectedClub, setSelectedClub] = useState("All Clubs")
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")
  const [recommendationFilter, setRecommendationFilter] = useState("all")

  const filteredReports = scoutingReports.filter((report) => {
    const matchesClub = selectedClub === "All Clubs" || report.club === selectedClub
    const matchesSearch =
      searchTerm === "" ||
      report.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.club.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === "all" || report.position.toLowerCase() === positionFilter
    const matchesRecommendation = recommendationFilter === "all" || report.recommendation === recommendationFilter

    return matchesClub && matchesSearch && matchesPosition && matchesRecommendation
  })

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <MainLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold text-gray-900">Transfer Intelligence</h1>
            <p className="text-gray-600 mt-1">Scouting reports, market analysis, and player intelligence</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Report
            </Button>
        </div>

        <Tabs defaultValue="scouting" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scouting">Scouting Reports</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
            <TabsTrigger value="trends">Transfer Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="scouting" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Total Reports</p>
                        <p className="text-2xl font-bold text-gray-900">{filteredReports.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">High Priority</p>
                        <p className="text-2xl font-bold text-green-600">
                        {filteredReports.filter((r) => r.recommendation === "high").length}
                        </p>
                    </div>
                    <Target className="w-8 h-8 text-green-600" />
                    </div>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Active Scouts</p>
                        <p className="text-2xl font-bold text-purple-600">12</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                    </div>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Avg Rating</p>
                        <p className="text-2xl font-bold text-orange-600">8.2</p>
                    </div>
                    <Star className="w-8 h-8 text-orange-600" />
                    </div>
                </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search players..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    </div>

                    <Select value={positionFilter} onValueChange={setPositionFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Positions</SelectItem>
                        <SelectItem value="forward">Forward</SelectItem>
                        <SelectItem value="midfielder">Midfielder</SelectItem>
                        <SelectItem value="defender">Defender</SelectItem>
                        <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                    </SelectContent>
                    </Select>

                    <Select value={recommendationFilter} onValueChange={setRecommendationFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                    </Select>

                    <Button variant="outline" className="w-full bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced
                    </Button>
                </div>
                </CardContent>
            </Card>

            {/* Reports List */}
            <div className="space-y-4">
                {filteredReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                            <div>
                            <h3 className="text-lg font-semibold text-gray-900">{report.playerName}</h3>
                            <p className="text-sm text-gray-600">
                                {report.position} • {report.club} • Age {report.age}
                            </p>
                            </div>
                            <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="font-semibold">{report.rating}</span>
                            </div>
                            <Badge variant="outline" className="font-semibold">
                                {report.marketValue}
                            </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Strengths</p>
                            <div className="flex flex-wrap gap-1">
                                {report.strengths.map((strength, index) => (
                                <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                                    {strength}
                                </Badge>
                                ))}
                            </div>
                            </div>
                            <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Areas for Improvement</p>
                            <div className="flex flex-wrap gap-1">
                                {report.weaknesses.map((weakness, index) => (
                                <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                                    {weakness}
                                </Badge>
                                ))}
                            </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {report.date}
                            </div>
                            <span>Scout: {report.scout}</span>
                            <Badge className={getStatusColor(report.status)}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </Badge>
                            <Badge className={getRecommendationColor(report.recommendation)}>
                            {report.recommendation.charAt(0).toUpperCase() + report.recommendation.slice(1)} Priority
                            </Badge>
                        </div>
                        </div>

                        <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Report
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            </TabsContent>

            <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketTrends.map((trend, index) => (
                <Card key={index}>
                    <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{trend.position}</h3>
                        <div className="flex items-center gap-1">
                        {trend.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : trend.trend === "down" ? (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                        ) : (
                            <div className="w-4 h-4 bg-gray-400 rounded-full" />
                        )}
                        <span
                            className={`text-sm font-medium ${
                            trend.trend === "up"
                                ? "text-green-600"
                                : trend.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                        >
                            {trend.change}
                        </span>
                        </div>
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mb-2">{trend.avgValue}</p>
                    <p className="text-sm text-gray-600 mb-3">Average Market Value</p>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Demand:</span>
                        <Badge
                            className={
                            trend.demand === "high"
                                ? "bg-green-100 text-green-800"
                                : trend.demand === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }
                        >
                            {trend.demand.charAt(0).toUpperCase() + trend.demand.slice(1)}
                        </Badge>
                        </div>
                        <div>
                        <p className="text-xs text-gray-500 mb-1">Top Clubs:</p>
                        <div className="flex flex-wrap gap-1">
                            {trend.topClubs.map((club, clubIndex) => (
                            <Badge key={clubIndex} variant="outline" className="text-xs">
                                {club}
                            </Badge>
                            ))}
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Transfer Activity Trends</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Transfer Trends Analysis</h3>
                    <p className="text-gray-600">Detailed transfer trends and analytics coming soon.</p>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    </MainLayout>
  )
}
