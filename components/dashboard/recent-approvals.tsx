"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import type { Transfer } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface RecentApprovalsProps {
  transfers: Transfer[]
}

export function RecentApprovals({ transfers }: RecentApprovalsProps) {
  const approvedTransfers = transfers
    .filter((t) => t.status === "approved")
    .sort((a, b) => new Date(b.approvedAt || 0).getTime() - new Date(a.approvedAt || 0).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-chart-3" />
          Recent Approvals
        </CardTitle>
      </CardHeader>
      <CardContent>
        {approvedTransfers.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No recent approvals</p>
        ) : (
          <div className="space-y-4">
            {approvedTransfers.slice(0, 5).map((transfer) => (
              <div key={transfer.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{transfer.player.name}</span>
                    <Badge variant="outline" className="text-chart-3 border-chart-3">
                      Approved
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transfer.fromClub?.name || "Free Agent"} → {transfer.toClub.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transfer.approvedAt && formatDistanceToNow(transfer.approvedAt, { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
