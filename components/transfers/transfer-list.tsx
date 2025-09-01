"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Filter } from "lucide-react"
import type { Transfer } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface TransferListProps {
  transfers: Transfer[]
  showActions?: boolean
}

export function TransferList({ transfers, showActions = true }: TransferListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTransfers = transfers.filter((transfer) => {
    const matchesSearch =
      transfer.player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.toClub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.fromClub?.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter
    const matchesType = typeFilter === "all" || transfer.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: Transfer["status"]) => {
    switch (status) {
      case "submitted":
        return "bg-secondary text-secondary-foreground"
      case "under_review":
        return "bg-primary text-primary-foreground"
      case "approved":
        return "bg-chart-3 text-white"
      case "rejected":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transfers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="permanent">Permanent</SelectItem>
                <SelectItem value="loan">Loan</SelectItem>
                <SelectItem value="free_agent">Free Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTransfers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No transfers found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredTransfers.map((transfer) => (
            <Card key={transfer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{transfer.player.name}</h3>
                      <Badge className={getStatusColor(transfer.status)}>{transfer.status.replace("_", " ")}</Badge>
                      <Badge variant="outline">{transfer.type.replace("_", " ")}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Transfer:</span> {transfer.fromClub?.name || "Free Agent"} →{" "}
                      {transfer.toClub.name}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Submitted {formatDistanceToNow(transfer.submittedAt, { addSuffix: true })}</span>
                      {transfer.transferFee && <span>Fee: GHS {transfer.transferFee.toLocaleString()}</span>}
                      <span>{transfer.documents.length} documents</span>
                    </div>
                  </div>
                  {showActions && (
                    <div className="flex items-center gap-2">
                      <Link href={`/transfers/${transfer.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
