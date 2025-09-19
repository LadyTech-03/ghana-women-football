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
  Brain,
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
  BarChart3,
  Zap,
  Eye,
  Download,
  Share2,
  AlertTriangle,
  Award,
  Radar,
  LineChart,
  PieChart,
  Globe,
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
  "Northern Ladies",
  "Prisons Ladies",
]

const aiInsights = [
  {
    id: 1,
    type: "market_opportunity",
    title: "Undervalued Talent Alert",
    description: "AI detected 3 players with performance metrics exceeding their market value by 40%+",
    confidence: 94,
    priority: "high",
    players: ["Akosua Frimpong", "Efua Boateng", "Ama Serwaa"],
    impact: "High ROI potential",
    action: "Immediate scouting recommended",
  },
  {
    id: 2,
    type: "performance_prediction",
    title: "Rising Star Projection",
    description: "Performance trajectory analysis indicates breakthrough season for 2 young talents",
    confidence: 87,
    priority: "medium",
    players: ["Abena Mensah", "Akua Donkor"],
    impact: "Future squad depth",
    action: "Monitor development",
  },
  {
    id: 3,
    type: "risk_assessment",
    title: "Injury Risk Analysis",
    description: "Biomechanical data suggests elevated injury risk for key targets",
    confidence: 91,
    priority: "high",
    players: ["Yaa Asantewaa"],
    impact: "Transfer risk mitigation",
    action: "Medical assessment required",
  },
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
    aiScore: 92,
    strengths: ["Pace", "Finishing", "Positioning", "Mental Strength"],
    weaknesses: ["Aerial ability", "Left foot"],
    recommendation: "high",
    physicalMetrics: { speed: 89, strength: 76, endurance: 84, agility: 91 },
    technicalMetrics: { passing: 78, shooting: 88, dribbling: 85, defending: 45 },
    mentalMetrics: { vision: 82, composure: 87, leadership: 71, workRate: 89 },
    matchesWatched: 12,
    goalsScored: 18,
    assists: 7,
    keyPasses: 34,
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
    aiScore: 85,
    strengths: ["Passing", "Vision", "Work rate", "Set pieces"],
    weaknesses: ["Physicality", "Long shots"],
    recommendation: "medium",
    physicalMetrics: { speed: 72, strength: 68, endurance: 91, agility: 79 },
    technicalMetrics: { passing: 92, shooting: 71, dribbling: 81, defending: 78 },
    mentalMetrics: { vision: 94, composure: 83, leadership: 88, workRate: 95 },
    matchesWatched: 15,
    goalsScored: 5,
    assists: 23,
    keyPasses: 67,
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
    supplyDemandRatio: 0.7,
    projectedGrowth: "+18%",
    keyFactors: ["Goal scoring shortage", "International exposure"],
  },
  {
    position: "Midfielder",
    avgValue: "₵35,200",
    trend: "stable",
    change: "+2%",
    topClubs: ["Thunder Queens", "Immigration Ladies"],
    demand: "medium",
    supplyDemandRatio: 1.2,
    projectedGrowth: "+5%",
    keyFactors: ["Tactical evolution", "Youth development"],
  },
  {
    position: "Defender",
    avgValue: "₵32,800",
    trend: "down",
    change: "-5%",
    topClubs: ["Police Ladies", "Army Ladies"],
    demand: "low",
    supplyDemandRatio: 1.8,
    projectedGrowth: "-2%",
    keyFactors: ["Oversupply", "Tactical shifts"],
  },
  {
    position: "Goalkeeper",
    avgValue: "₵28,000",
    trend: "up",
    change: "+8%",
    topClubs: ["Northern Ladies", "Prisons Ladies"],
    demand: "medium",
    supplyDemandRatio: 0.9,
    projectedGrowth: "+12%",
    keyFactors: ["Retirement wave", "Technical requirements"],
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
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-amber-500"
      case "low":
        return "bg-emerald-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <MainLayout>
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Brain className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AI Transfer Intelligence</h1>
          </div>
          <p className="text-muted-foreground">Advanced scouting analytics powered by artificial intelligence</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <Plus className="w-4 h-4" />
            New Analysis
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ai-insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="ai-insights" className="gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <Sparkles className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="scouting" className="gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <Radar className="w-4 h-4" />
            Scouting Reports
          </TabsTrigger>
          <TabsTrigger value="market" className="gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <LineChart className="w-4 h-4" />
            Market Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4" />
            Predictive Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-insights" className="space-y-6">
          {/* AI Insights Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-emerald-200 rounded-lg">
                    <Zap className="w-6 h-6 text-emerald-700" />
                  </div>
                  <Badge className="bg-emerald-600 text-white">Live</Badge>
                </div>
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">AI Processing</h3>
                <p className="text-2xl font-bold text-emerald-800 mb-1">847</p>
                <p className="text-sm text-emerald-700">Data points analyzed today</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-200 rounded-lg">
                    <Target className="w-6 h-6 text-blue-700" />
                  </div>
                  <Badge className="bg-blue-600 text-white">94%</Badge>
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Accuracy Rate</h3>
                <p className="text-2xl font-bold text-blue-800 mb-1">23</p>
                <p className="text-sm text-blue-700">Successful predictions this month</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-amber-200 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-amber-700" />
                  </div>
                  <Badge className="bg-amber-600 text-white">High</Badge>
                </div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Priority Alerts</h3>
                <p className="text-2xl font-bold text-amber-800 mb-1">5</p>
                <p className="text-sm text-amber-700">Require immediate attention</p>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Latest AI Insights</h2>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter Insights
              </Button>
            </div>

            {aiInsights.map((insight) => (
              <Card
                key={insight.id}
                className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(insight.priority)}`} />
                        <h3 className="text-lg font-semibold text-foreground">{insight.title}</h3>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                          {insight.confidence}% Confidence
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{insight.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Affected Players</p>
                          <div className="flex flex-wrap gap-1">
                            {insight.players.map((player, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {player}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Impact</p>
                          <p className="text-sm text-muted-foreground">{insight.impact}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Recommended Action</p>
                          <p className="text-sm text-muted-foreground">{insight.action}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Eye className="w-4 h-4" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scouting" className="space-y-6">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Total Reports</p>
                    <p className="text-2xl font-bold text-blue-900">{filteredReports.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700">High Priority</p>
                    <p className="text-2xl font-bold text-emerald-900">
                      {filteredReports.filter((r) => r.recommendation === "high").length}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700">Active Scouts</p>
                    <p className="text-2xl font-bold text-purple-900">12</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-700">Avg AI Score</p>
                    <p className="text-2xl font-bold text-amber-900">88.5</p>
                  </div>
                  <Brain className="w-8 h-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-700">Market Value</p>
                    <p className="text-2xl font-bold text-orange-900">₵2.1M</p>
                  </div>
                  <Award className="w-8 h-8 text-orange-600" />
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

                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  Advanced
                </Button>

                <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <Plus className="w-4 h-4" />
                  New Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Reports List */}
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-emerald-500"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Player Info */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{report.playerName}</h3>
                          <p className="text-muted-foreground mb-2">
                            {report.position} • {report.club} • Age {report.age}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                              <span className="font-semibold">{report.rating}</span>
                            </div>
                            <Badge variant="outline" className="font-semibold">
                              {report.marketValue}
                            </Badge>
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                              AI: {report.aiScore}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Strengths</p>
                          <div className="flex flex-wrap gap-1">
                            {report.strengths.map((strength, index) => (
                              <Badge key={index} className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Areas for Improvement</p>
                          <div className="flex flex-wrap gap-1">
                            {report.weaknesses.map((weakness, index) => (
                              <Badge key={index} className="bg-red-100 text-red-800 border-red-200 text-xs">
                                {weakness}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Performance Metrics</h4>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Physical</span>
                            <span>
                              {Math.round(
                                (report.physicalMetrics.speed +
                                  report.physicalMetrics.strength +
                                  report.physicalMetrics.endurance +
                                  report.physicalMetrics.agility) /
                                  4,
                              )}
                            </span>
                          </div>
                          <Progress
                            value={Math.round(
                              (report.physicalMetrics.speed +
                                report.physicalMetrics.strength +
                                report.physicalMetrics.endurance +
                                report.physicalMetrics.agility) /
                                4,
                            )}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Technical</span>
                            <span>
                              {Math.round(
                                (report.technicalMetrics.passing +
                                  report.technicalMetrics.shooting +
                                  report.technicalMetrics.dribbling) /
                                  3,
                              )}
                            </span>
                          </div>
                          <Progress
                            value={Math.round(
                              (report.technicalMetrics.passing +
                                report.technicalMetrics.shooting +
                                report.technicalMetrics.dribbling) /
                                3,
                            )}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Mental</span>
                            <span>
                              {Math.round(
                                (report.mentalMetrics.vision +
                                  report.mentalMetrics.composure +
                                  report.mentalMetrics.leadership +
                                  report.mentalMetrics.workRate) /
                                  4,
                              )}
                            </span>
                          </div>
                          <Progress
                            value={Math.round(
                              (report.mentalMetrics.vision +
                                report.mentalMetrics.composure +
                                report.mentalMetrics.leadership +
                                report.mentalMetrics.workRate) /
                                4,
                            )}
                            className="h-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-bold text-foreground">{report.goalsScored}</p>
                          <p className="text-xs text-muted-foreground">Goals</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-bold text-foreground">{report.assists}</p>
                          <p className="text-xs text-muted-foreground">Assists</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Status */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>Scout: {report.scout}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                        <Badge className={getRecommendationColor(report.recommendation)}>
                          {report.recommendation.charAt(0).toUpperCase() + report.recommendation.slice(1)} Priority
                        </Badge>
                      </div>

                      <div className="space-y-2 pt-4">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2">
                          <Eye className="w-4 h-4" />
                          View Full Report
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Share2 className="w-4 h-4" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Download className="w-4 h-4" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground text-lg">{trend.position}</h3>
                    <div className="flex items-center gap-2">
                      {trend.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      ) : trend.trend === "down" ? (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      ) : (
                        <div className="w-5 h-5 bg-gray-400 rounded-full" />
                      )}
                      <span
                        className={`text-sm font-bold ${
                          trend.trend === "up"
                            ? "text-emerald-600"
                            : trend.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {trend.change}
                      </span>
                    </div>
                  </div>

                  <p className="text-3xl font-bold text-foreground mb-2">{trend.avgValue}</p>
                  <p className="text-sm text-muted-foreground mb-4">Average Market Value</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Demand:</span>
                      <Badge
                        className={
                          trend.demand === "high"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : trend.demand === "medium"
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {trend.demand.charAt(0).toUpperCase() + trend.demand.slice(1)}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Supply/Demand Ratio</p>
                      <Progress value={Math.min(trend.supplyDemandRatio * 50, 100)} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{trend.supplyDemandRatio}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Projected Growth</p>
                      <p className="text-sm font-semibold text-foreground">{trend.projectedGrowth}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Key Factors:</p>
                      <div className="space-y-1">
                        {trend.keyFactors.map((factor, factorIndex) => (
                          <Badge key={factorIndex} variant="outline" className="text-xs mr-1 mb-1">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Top Clubs:</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Transfer Activity Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Predictive Analytics</h3>
                  <p className="text-muted-foreground">AI-powered transfer predictions and market forecasting</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Market Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Global Trends</h3>
                  <p className="text-muted-foreground">International market influences and sentiment tracking</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </MainLayout>
  )
}
