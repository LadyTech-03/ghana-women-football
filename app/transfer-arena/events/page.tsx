"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

const eventTypes = ["All Types", "Transfer Window", "Deadline", "Meeting", "Registration", "Medical", "Announcement"]
const priorities = ["All Priorities", "High", "Medium", "Low"]
const statuses = ["All Status", "Upcoming", "In Progress", "Completed", "Cancelled"]

const events = [
  {
    id: 1,
    title: "Transfer Window Opens",
    type: "Transfer Window",
    date: "2024-01-15",
    time: "00:00",
    endDate: "2024-03-31",
    description: "Official opening of the first transfer window for 2024 season",
    priority: "High",
    status: "Upcoming",
    participants: ["All Clubs", "GFA Officials"],
    location: "System-wide",
    organizer: "Ghana Football Association",
  },
  {
    id: 2,
    title: "Player Registration Deadline",
    type: "Deadline",
    date: "2024-01-20",
    time: "23:59",
    description: "Final deadline for player registration submissions",
    priority: "High",
    status: "Upcoming",
    participants: ["All Clubs"],
    location: "Online Portal",
    organizer: "GFA Registration Department",
  },
  {
    id: 3,
    title: "Transfer Committee Meeting",
    type: "Meeting",
    date: "2024-01-18",
    time: "14:00",
    description: "Monthly transfer committee review meeting",
    priority: "Medium",
    status: "In Progress",
    participants: ["Transfer Committee", "Club Representatives"],
    location: "GFA Headquarters",
    organizer: "Transfer Committee",
  },
  {
    id: 4,
    title: "Medical Examination - Sarah Mensah",
    type: "Medical",
    date: "2024-01-16",
    time: "10:00",
    description: "Mandatory medical examination for transfer completion",
    priority: "High",
    status: "Completed",
    participants: ["Hasaacas Ladies", "Medical Team"],
    location: "Accra Sports Medicine Center",
    organizer: "Hasaacas Ladies",
  },
  {
    id: 5,
    title: "Transfer Announcement - New Signing",
    type: "Announcement",
    date: "2024-01-12",
    time: "16:00",
    description: "Official announcement of new player signing",
    priority: "Medium",
    status: "Completed",
    participants: ["Thunder Queens", "Media"],
    location: "Thunder Queens Stadium",
    organizer: "Thunder Queens",
  },
  {
    id: 6,
    title: "Agent Certification Workshop",
    type: "Registration",
    date: "2024-01-25",
    time: "09:00",
    endDate: "2024-01-25",
    endTime: "17:00",
    description: "Mandatory workshop for agent certification renewal",
    priority: "Medium",
    status: "Upcoming",
    participants: ["Licensed Agents", "GFA Officials"],
    location: "GFA Training Center",
    organizer: "GFA Agent Department",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")
  const [statusFilter, setStatusFilter] = useState("All Status")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchTerm === "" ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "All Types" || event.type === typeFilter
    const matchesPriority = priorityFilter === "All Priorities" || event.priority === priorityFilter
    const matchesStatus = statusFilter === "All Status" || event.status === statusFilter

    return matchesSearch && matchesType && matchesPriority && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "In Progress":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Transfer Window":
        return "bg-purple-100 text-purple-800"
      case "Deadline":
        return "bg-red-100 text-red-800"
      case "Meeting":
        return "bg-blue-100 text-blue-800"
      case "Registration":
        return "bg-green-100 text-green-800"
      case "Medical":
        return "bg-orange-100 text-orange-800"
      case "Announcement":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: filteredEvents.length,
    upcoming: filteredEvents.filter((e) => e.status === "Upcoming").length,
    inProgress: filteredEvents.filter((e) => e.status === "In Progress").length,
    highPriority: filteredEvents.filter((e) => e.priority === "High").length,
  }

  return (
    <MainLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold text-gray-900">Transfer Events</h1>
            <p className="text-gray-600 mt-1">Manage transfer-related events, deadlines, and activities</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
            </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">High Priority</p>
                    <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
                </div>
                <Bell className="w-8 h-8 text-red-600" />
                </div>
            </CardContent>
            </Card>
        </div>

        {/* Filters */}
        <Card>
            <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                </div>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                    <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                    {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                        {type}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                    {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                        {priority}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                        {status}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>

                <Button variant="outline" className="w-full bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Advanced
                </Button>
            </div>
            </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
            {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        {getStatusIcon(event.status)}
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                            {event.endDate && event.endDate !== event.date && <span>- {event.endDate}</span>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                            {event.endTime && <span>- {event.endTime}</span>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                        </div>
                        </div>

                        <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>Organizer: {event.organizer}</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Participants:</p>
                            <div className="flex flex-wrap gap-1">
                            {event.participants.map((participant, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                {participant}
                                </Badge>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        <Badge className={getPriorityColor(event.priority)}>{event.priority} Priority</Badge>
                    </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                        View Details
                    </Button>
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>

        {filteredEvents.length === 0 && (
            <Card>
            <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your filters or create a new event.</p>
            </CardContent>
            </Card>
        )}
        </div>
    </MainLayout>
  )
}
