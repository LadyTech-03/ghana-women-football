"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Transfer } from "@/lib/types"

interface MyTransfersTableProps {
  transfers: Transfer[]
}

export function MyTransfersTable({ transfers }: MyTransfersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const itemsPerPage = 10

  const filteredTransfers = transfers.filter((transfer) => {
    const matchesSearch =
      (transfer.player?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transfer.fromClub?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transfer.toClub?.name || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransfers = filteredTransfers.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      submitted: { variant: "secondary" as const, label: "Submitted" },
      under_review: { variant: "default" as const, label: "Under Review" },
      approved: { variant: "default" as const, label: "Approved", className: "bg-green-100 text-green-800" },
      rejected: { variant: "destructive" as const, label: "Rejected" },
      request_info: { variant: "outline" as const, label: "Info Requested" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.submitted
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const handleRowClick = (transferId: string) => {
    router.push(`/transfers/${transferId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Transfers</CardTitle>
        <CardDescription>Track and manage your transfer submissions</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transfers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="request_info">Info Requested</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Transfer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransfers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No transfers found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransfers.map((transfer) => (
                  <TableRow
                    key={transfer.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(transfer.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={transfer.player?.image || "/placeholder.svg"}
                            alt={transfer.player?.name || "Player"}
                          />
                          <AvatarFallback>
                            {(transfer.player?.name || "P")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{transfer.player?.name || "Unknown Player"}</p>
                          <p className="text-sm text-muted-foreground">{transfer.player?.position || "Position N/A"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {transfer.fromClub?.name || "Free Agent"} → {transfer.toClub?.name || "Unknown Club"}
                        </div>
                        <div className="text-muted-foreground">
                          {transfer.fromClub?.zone || "N/A"} → {transfer.toClub?.zone || "N/A"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transfer.transferType || "N/A"}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDistanceToNow(transfer.submittedAt, { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowClick(transfer.id)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
