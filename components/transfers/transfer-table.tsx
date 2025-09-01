"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Eye } from "lucide-react"
import type { Transfer } from "@/lib/types"

interface TransferTableProps {
  transfers: Transfer[]
}

export function TransferTable({ transfers }: TransferTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const itemsPerPage = 10

  const filteredTransfers = transfers.filter((transfer) => {
    const matchesSearch =
      (transfer.player?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (typeof transfer.fromClub === "object"
        ? transfer.fromClub?.name?.toLowerCase() || ""
        : transfer.fromClub?.toLowerCase() || ""
      ).includes(searchTerm.toLowerCase()) ||
      (typeof transfer.toClub === "object"
        ? transfer.toClub?.name?.toLowerCase() || ""
        : transfer.toClub?.toLowerCase() || ""
      ).includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransfers = filteredTransfers.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      under_review: "default",
      approved: "default",
      rejected: "destructive",
      request_info: "outline",
    } as const

    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      under_review: "bg-blue-100 text-blue-800 border-blue-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      request_info: "bg-orange-100 text-orange-800 border-orange-200",
    } as const

    return (
      <Badge className={colors[status as keyof typeof colors] || colors.pending}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    )
  }

  const handleViewTransfer = (transferId: string) => {
    router.push(`/transfers/${transferId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Requests</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by player name, club..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="request_info">Request Info</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>From Club</TableHead>
                <TableHead>To Club</TableHead>
                <TableHead>Transfer Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={transfer.player?.image || "/placeholder.svg"} alt={transfer.player?.name} />
                        <AvatarFallback>
                          {transfer.player?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "??"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{transfer.player?.name}</div>
                        <div className="text-sm text-muted-foreground">{transfer.player?.position}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {typeof transfer.fromClub === "object" ? transfer.fromClub?.name : transfer.fromClub}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {typeof transfer.fromClub === "object" ? transfer.fromClub?.zone : "Unknown"} Zone
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {typeof transfer.toClub === "object" ? transfer.toClub?.name : transfer.toClub}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {typeof transfer.toClub === "object" ? transfer.toClub?.zone : "Unknown"} Zone
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transfer.transferType}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(transfer.submittedAt).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleViewTransfer(transfer.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransfers.length)} of{" "}
              {filteredTransfers.length} transfers
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
