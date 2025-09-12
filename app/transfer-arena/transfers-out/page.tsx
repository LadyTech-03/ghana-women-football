"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Users,
  DollarSign,
  Building2,
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

const outgoingTransfers = [
  {
    id: 1,
    player: { name: "Akosua Mensah", position: "Forward", age: 24, image: "/players/efua-boateng.png" },
    fromClub: "Ashtown Ladies",
    toClub: "Northern City Ladies",
    fee: "GHS 15,000",
    status: "completed",
    date: "2024-01-15",
    contractEnd: "2024-12-31",
    marketValue: "GHS 18,000",
  },
  {
    id: 2,
    player: { name: "Ama Serwaa", position: "Midfielder", age: 22, image: "/players/efua-boateng.png" },
    fromClub: "Prisons Ladies",
    toClub: "Thunder Queens",
    fee: "GHS 12,000",
    status: "pending",
    date: "2024-02-01",
    contractEnd: "2024-06-30",
    marketValue: "GHS 14,000",
  },
  {
    id: 3,
    player: { name: "Efua Boateng", position: "Defender", age: 26, image: "/players/efua-boateng.png" },
    fromClub: "Kumasi Sports Academy",
    toClub: "Police Ladies",
    fee: "GHS 8,000",
    status: "negotiating",
    date: "2024-02-10",
    contractEnd: "2024-08-15",
    marketValue: "GHS 10,000",
  },
  {
    id: 4,
    player: { name: "Adwoa Asante", position: "Goalkeeper", age: 28, image: "/players/efua-boateng.png" },
    fromClub: "Dreamz Ladies",
    toClub: "Sea Lions",
    fee: "GHS 20,000",
    status: "rejected",
    date: "2024-01-20",
    contractEnd: "2025-01-30",
    marketValue: "GHS 22,000",
  },
  {
    id: 5,
    player: { name: "Abena Osei", position: "Midfielder", age: 25, image: "/players/efua-boateng.png" },
    fromClub: "Police Ladies",
    toClub: "Fabulous Ladies",
    fee: "GHS 18,000",
    status: "completed",
    date: "2024-01-28",
    contractEnd: "2024-11-15",
    marketValue: "GHS 20,000",
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
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
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
      return <ArrowUpRight className="h-4 w-4" />
    case "rejected":
      return <XCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function TransfersOutPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clubFilter, setClubFilter] = useState("All Clubs")
  const router = useRouter()

  const filteredTransfers = outgoingTransfers.filter((transfer) => {
    const matchesSearch =
      transfer.player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.toClub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.fromClub.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter
    const matchesClub = clubFilter === "All Clubs" || transfer.fromClub === clubFilter
    return matchesSearch && matchesStatus && matchesClub
  })

  const relevantTransfers =
    clubFilter === "All Clubs" ? outgoingTransfers : outgoingTransfers.filter((t) => t.fromClub === clubFilter)
  const stats = {
    total: relevantTransfers.length,
    completed: relevantTransfers.filter((t) => t.status === "completed").length,
    pending: relevantTransfers.filter((t) => t.status === "pending").length,
    totalValue: relevantTransfers.reduce((sum, t) => sum + Number.parseInt(t.fee.replace(/[^\d]/g, "")), 0),
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transfer Management - Outgoing</h1>
              <p className="text-gray-600 mt-1">Monitor and manage outgoing player transfers across all clubs</p>
            </div>
            <Button 
            onClick={() => router.push('/transfers/new')} 
            className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              New Transfer Request
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Transfers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-500">{clubFilter}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
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

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="negotiating">Negotiating</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transfers List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-red-600" />
                Outgoing Transfers {clubFilter !== "All Clubs" && `- ${clubFilter}`}
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
                          <h3 className="font-semibold text-gray-900">{transfer.player.name}</h3>
                          <p className="text-sm text-gray-600">
                            {transfer.player.position} • Age {transfer.player.age}
                          </p>
                          <p className="text-xs text-gray-500">Contract ends: {transfer.contractEnd}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">From</p>
                        <p className="font-medium">{transfer.fromClub}</p>
                      </div>

                      <div className="text-center">
                        <ArrowUpRight className="h-6 w-6 text-gray-400 mx-auto" />
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">To</p>
                        <p className="font-medium">{transfer.toClub}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">Transfer Fee</p>
                        <p className="font-bold text-green-600">{transfer.fee}</p>
                        <p className="text-xs text-gray-500">Market: {transfer.marketValue}</p>
                      </div>

                      <div className="text-center">
                        <Badge className={`${getStatusColor(transfer.status)} flex items-center gap-1`}>
                          {getStatusIcon(transfer.status)}
                          {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{transfer.date}</p>
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
                  <ArrowUpRight className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No outgoing transfers found for the selected criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
