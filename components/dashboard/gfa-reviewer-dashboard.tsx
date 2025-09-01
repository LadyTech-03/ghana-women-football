"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { Transfer } from "@/lib/types"
import { useRouter } from "next/navigation"

interface GFAReviewerDashboardProps {
  transfers: Transfer[]
}

export function GFAReviewerDashboard({ transfers }: GFAReviewerDashboardProps) {
  const router = useRouter()

  const getStatusIcon = (status: Transfer["status"]) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4" />
      case "under_review":
        return <AlertCircle className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Transfer["status"]) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "under_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Requests for Review</CardTitle>
        <CardDescription>Review and process transfer requests from clubs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transfers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No transfer requests to review</p>
          ) : (
            transfers.map((transfer) => (
              <div
                key={transfer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/abstract-geometric-shapes.png?height=48&width=48&query=${transfer.player.name}`} />
                    <AvatarFallback>
                      {transfer.player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="font-medium">{transfer.player.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {transfer.fromClub.name} → {transfer.toClub.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {transfer.type} •{" "}
                      {transfer.transferFee > 0 ? `GH₵${transfer.transferFee.toLocaleString()}` : "Free"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={`${getStatusColor(transfer.status)} flex items-center gap-1`}>
                    {getStatusIcon(transfer.status)}
                    {transfer.status.replace("_", " ")}
                  </Badge>

                  <Button variant="outline" size="sm" onClick={() => router.push(`/transfers/${transfer.id}`)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
