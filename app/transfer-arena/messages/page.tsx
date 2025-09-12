"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Building2,
  Plus,
  Eye,
  Reply,
  Archive,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

const messages = [
  {
    id: 1,
    subject: "Transfer Inquiry - Grace Asiedu",
    from: "Thunder Queens FC",
    to: "Ashtown Ladies",
    content:
      "We are interested in discussing a potential transfer for Grace Asiedu. She has expressed interest in joining your club. Please let us know if you would like to proceed with negotiations.",
    status: "unread",
    priority: "high",
    date: "2024-02-15",
    time: "10:30 AM",
    transferRelated: true,
    playerName: "Grace Asiedu",
  },
  {
    id: 2,
    subject: "Contract Extension Discussion",
    from: "Prisons Ladies",
    to: "GFA Administration",
    content:
      "We need clarification on the new contract extension regulations for players over 30 years old. Our legal team requires official documentation.",
    status: "read",
    priority: "medium",
    date: "2024-02-14",
    time: "2:15 PM",
    transferRelated: false,
    playerName: null,
  },
  {
    id: 3,
    subject: "Medical Report - Mavis Danso Transfer",
    from: "Sea Lions Medical Team",
    to: "Northern City Ladies",
    content:
      "Attached is the complete medical report for Mavis Danso as requested. All tests have been completed and she is cleared for transfer.",
    status: "replied",
    priority: "high",
    date: "2024-02-13",
    time: "4:45 PM",
    transferRelated: true,
    playerName: "Mavis Danso",
  },
  {
    id: 4,
    subject: "Transfer Window Deadline Reminder",
    from: "GFA Administration",
    to: "All Clubs",
    content:
      "This is a reminder that the transfer window closes on February 28th, 2024. All transfer documents must be submitted by 11:59 PM on that date.",
    status: "read",
    priority: "urgent",
    date: "2024-02-12",
    time: "9:00 AM",
    transferRelated: false,
    playerName: null,
  },
  {
    id: 5,
    subject: "Payment Confirmation - Vivian Konadu",
    from: "Dreamz Ladies Finance",
    to: "Police Ladies",
    content:
      "We confirm receipt of the transfer fee payment for Vivian Konadu. All financial obligations have been met. Transfer can proceed to final approval.",
    status: "read",
    priority: "medium",
    date: "2024-02-11",
    time: "11:20 AM",
    transferRelated: true,
    playerName: "Vivian Konadu",
  },
]

const clubs = [
  "All Messages",
  "GFA Administration",
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "unread":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "read":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "replied":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 border-red-200"
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200"
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
    case "unread":
      return <AlertCircle className="h-4 w-4" />
    case "read":
      return <Eye className="h-4 w-4" />
    case "replied":
      return <CheckCircle2 className="h-4 w-4" />
    default:
      return <MessageSquare className="h-4 w-4" />
  }
}

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clubFilter, setClubFilter] = useState("All Messages")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.playerName && message.playerName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter
    const matchesClub = clubFilter === "All Messages" || message.from === clubFilter || message.to === clubFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesClub
  })

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === "unread").length,
    urgent: messages.filter((m) => m.priority === "urgent").length,
    transferRelated: messages.filter((m) => m.transferRelated).length,
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transfer Communications</h1>
              <p className="text-gray-600 mt-1">Manage all transfer-related messages and communications</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Unread</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Urgent</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
                  </div>
                  <Clock className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Transfer Related</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.transferRelated}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select value={clubFilter} onValueChange={setClubFilter}>
                  <SelectTrigger>
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

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="w-full bg-transparent">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messages List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Messages ({filteredMessages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                          selectedMessage === message.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                        } ${message.status === "unread" ? "bg-blue-50/50" : ""}`}
                        onClick={() => setSelectedMessage(message.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3
                                className={`font-semibold ${message.status === "unread" ? "text-blue-900" : "text-gray-900"}`}
                              >
                                {message.subject}
                              </h3>
                              {message.transferRelated && (
                                <Badge variant="outline" className="text-xs">
                                  Transfer
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>
                                <strong>From:</strong> {message.from}
                              </span>
                              <span>
                                <strong>To:</strong> {message.to}
                              </span>
                            </div>

                            <p className="text-sm text-gray-700 line-clamp-2">{message.content}</p>

                            <div className="flex items-center gap-2 mt-3">
                              <Badge className={getStatusColor(message.status)}>
                                {getStatusIcon(message.status)}
                                <span className="ml-1">{message.status}</span>
                              </Badge>
                              <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                              <span className="text-xs text-gray-500">
                                {message.date} at {message.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredMessages.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No messages found for the selected criteria</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Message Detail & Reply */}
            <div className="lg:col-span-1">
              {selectedMessage ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Message Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(() => {
                      const message = messages.find((m) => m.id === selectedMessage)
                      if (!message) return null

                      return (
                        <>
                          <div>
                            <h4 className="font-semibold text-gray-900">{message.subject}</h4>
                            <div className="text-sm text-gray-600 mt-1">
                              <p>
                                <strong>From:</strong> {message.from}
                              </p>
                              <p>
                                <strong>To:</strong> {message.to}
                              </p>
                              <p>
                                <strong>Date:</strong> {message.date} at {message.time}
                              </p>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <p className="text-sm text-gray-700">{message.content}</p>
                          </div>

                          <div className="border-t pt-4">
                            <h5 className="font-medium mb-2">Quick Reply</h5>
                            <Textarea
                              placeholder="Type your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="mb-2"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                <Send className="h-4 w-4 mr-2" />
                                Send Reply
                              </Button>
                              <Button variant="outline" size="sm">
                                <Reply className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select a message to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
