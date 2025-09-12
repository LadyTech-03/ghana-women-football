"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, Users, Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
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
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "preparation":
        return "bg-purple-100 text-purple-800"
      case "charity":
        return "bg-pink-100 text-pink-800"
      case "training":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: filteredMatches.length,
    scheduled: filteredMatches.filter((m) => m.status === "scheduled").length,
    completed: filteredMatches.filter((m) => m.status === "completed").length,
    pending: filteredMatches.filter((m) => m.status === "pending").length,
  }

  return (
    <MainLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold text-gray-900">Friendly Matches</h1>
            <p className="text-gray-600 mt-1">Manage friendly matches and exhibition games</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Friendly
            </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Total Matches</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Scheduled</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Pending Approval</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Filter className="w-8 h-8 text-yellow-600" />
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

                <Button variant="outline" className="w-full bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
                </Button>
            </div>
            </CardContent>
        </Card>

        {/* Matches List */}
        <div className="space-y-4">
            {filteredMatches.map((match) => (
            <Card key={match.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="text-center">
                        <p className="font-semibold text-gray-900">{match.homeTeam}</p>
                        <p className="text-sm text-gray-500">Home</p>
                        </div>
                        <div className="text-2xl font-bold text-gray-400">VS</div>
                        <div className="text-center">
                        <p className="font-semibold text-gray-900">{match.awayTeam}</p>
                        <p className="text-sm text-gray-500">Away</p>
                        </div>
                        {match.result && (
                        <div className="ml-4">
                            <Badge variant="outline" className="text-lg font-bold">
                            {match.result}
                            </Badge>
                        </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {match.date}
                        </div>
                        <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {match.time}
                        </div>
                        <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.venue}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <Badge className={getStatusColor(match.status)}>
                        {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                        </Badge>
                        <Badge className={getTypeColor(match.type)}>
                        {match.type.charAt(0).toUpperCase() + match.type.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-500">Organized by: {match.organizer}</span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">Purpose: {match.purpose}</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>

        {filteredMatches.length === 0 && (
            <Card>
            <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600">Try adjusting your filters or schedule a new friendly match.</p>
            </CardContent>
            </Card>
        )}
        </div>
    </MainLayout>
  )
}
