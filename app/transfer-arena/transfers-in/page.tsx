"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  DollarSign,
  Star,
  Target,
  Building2,
  Router,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

const clubs = [
  "All Clubs",
  "Ashtown Ladies",
  "Northern City Ladies",
  "Prisons Ladies",
  "Kumasi Sports Academy",
  "Dreamz Ladies",
  "Police Ladies",
  "Thunder Queens",
  "Sea Lions",
  "Fabulous Ladies",
  "Immigration Ladies",
]

const incomingTransfers = [
  {
    id: 1,
    player: {
      name: "Fatima Abdul",
      position: "Striker",
      age: 23,
      image: "/players/abena-serwaa.png",
      rating: 4.5,
    },
    fromClub: "Northern City Ladies",
    toClub: "Ashtown Ladies",
    fee: "GHS 18,000",
    status: "completed",
    date: "2024-01-10",
    contractLength: "2 years",
    marketValue: "GHS 20,000",
    priority: "high",
  },
  {
    id: 2,
    player: {
      name: "Salma Ibrahim",
      position: "Winger",
      age: 21,
      image: "/players/abena-serwaa.png",
      rating: 4.2,
    },
    fromClub: "Prisons Ladies",
    toClub: "Thunder Queens",
    fee: "GHS 14,000",
    status: "negotiating",
    date: "2024-02-05",
    contractLength: "3 years",
    marketValue: "GHS 16,000",
    priority: "medium",
  },
  {
    id: 3,
    player: {
      name: "Zainab Mohammed",
      position: "Midfielder",
      age: 25,
      image: "/players/abena-serwaa.png",
      rating: 4.7,
    },
    fromClub: "Kumasi Sports Academy",
    toClub: "Police Ladies",
    fee: "GHS 22,000",
    status: "pending",
    date: "2024-02-12",
    contractLength: "4 years",
    marketValue: "GHS 25,000",
    priority: "high",
  },
  {
    id: 4,
    player: {
      name: "Aisha Yakubu",
      position: "Defender",
      age: 24,
      image: "/players/abena-serwaa.png",
      rating: 4.0,
    },
    fromClub: "Dreamz Ladies",
    toClub: "Sea Lions",
    fee: "GHS 10,000",
    status: "scouting",
    date: "2024-02-15",
    contractLength: "2 years",
    marketValue: "GHS 12,000",
    priority: "low",
  },
  {
    id: 5,
    player: {
      name: "Mariam Alhassan",
      position: "Goalkeeper",
      age: 26,
      image: "/players/abena-serwaa.png",
      rating: 4.3,
    },
    fromClub: "Immigration Ladies",
    toClub: "Fabulous Ladies",
    fee: "GHS 16,000",
    status: "completed",
    date: "2024-01-25",
    contractLength: "3 years",
    marketValue: "GHS 18,000",
    priority: "medium",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "negotiating":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "scouting":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "pending":
      return <Clock className="h-4 w-4" />
    case "negotiating":
      return <ArrowDownLeft className="h-4 w-4" />
    case "scouting":
      return <Eye className="h-4 w-4" />
    case "rejected":
      return <XCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function TransfersInPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [clubFilter, setClubFilter] = useState("All Clubs")
  const router = useRouter()

  const filteredTransfers = incomingTransfers.filter((transfer) => {
    const matchesSearch =
      transfer.player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.fromClub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.toClub.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter
    const matchesPriority = priorityFilter === "all" || transfer.priority === priorityFilter
    const matchesClub = clubFilter === "All Clubs" || transfer.toClub === clubFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesClub
  })

  const relevantTransfers =
    clubFilter === "All Clubs" ? incomingTransfers : incomingTransfers.filter((t) => t.toClub === clubFilter)
  const stats = {
    total: relevantTransfers.length,
    completed: relevantTransfers.filter((t) => t.status === "completed").length,
    negotiating: relevantTransfers.filter((t) => t.status === "negotiating").length,
    totalValue: relevantTransfers.reduce((sum, t) => sum + Number.parseInt(t.fee.replace(/[^\d]/g, "")), 0),
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transfer Management - Incoming</h1>
              <p className="text-gray-600 mt-1">Monitor and manage incoming player acquisitions across all clubs</p>
            </div>
            <Button 
            onClick={() => router.push('/transfers/new')}
            className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Transfer Target
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Targets</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-500">{clubFilter}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Negotiating</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.negotiating}</p>
                  </div>
                  <ArrowDownLeft className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Investment</p>
                    <p className="text-2xl font-bold text-gray-900">GHS {stats.totalValue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={clubFilter} onValueChange={setClubFilter}>
                  <SelectTrigger className="w-full md:w-64">
                    <Building2 className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select club" />
                  </SelectTrigger>
                  <SelectContent>
                    {clubs.map((club) => (
                      <SelectItem key={club} value={club}>
                        {club}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search players, clubs, or transfers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="negotiating">Negotiating</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="scouting">Scouting</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Targets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownLeft className="h-5 w-5 text-green-600" />
                Incoming Transfers {clubFilter !== "All Clubs" && `- ${clubFilter}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransfers.map((transfer) => (
                  <div key={transfer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={transfer.player.image || "/placeholder.svg"} />
                          <AvatarFallback>
                            {transfer.player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{transfer.player.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600">{transfer.player.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {transfer.player.position} • Age {transfer.player.age}
                          </p>
                          <p className="text-xs text-gray-500">Contract: {transfer.contractLength}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">From</p>
                        <p className="font-medium">{transfer.fromClub}</p>
                      </div>

                      <div className="text-center">
                        <ArrowDownLeft className="h-6 w-6 text-gray-400 mx-auto" />
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">To</p>
                        <p className="font-medium">{transfer.toClub}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">Transfer Fee</p>
                        <p className="font-bold text-blue-600">{transfer.fee}</p>
                        <p className="text-xs text-gray-500">Market: {transfer.marketValue}</p>
                      </div>

                      <div className="text-center space-y-2">
                        <Badge className={`${getStatusColor(transfer.status)} flex items-center gap-1`}>
                          {getStatusIcon(transfer.status)}
                          {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                        </Badge>
                        <Badge className={`${getPriorityColor(transfer.priority)} text-xs`}>
                          {transfer.priority.toUpperCase()} PRIORITY
                        </Badge>
                        <p className="text-xs text-gray-500">{transfer.date}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTransfers.length === 0 && (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No incoming transfers found for the selected criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
