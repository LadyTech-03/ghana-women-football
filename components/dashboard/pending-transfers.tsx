"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Clock } from "lucide-react"
import type { Transfer } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface PendingTransfersProps {
  transfers: Transfer[]
}

export function PendingTransfers({ transfers }: PendingTransfersProps) {
  const pendingTransfers = transfers.filter((t) => t.status === "under_review" || t.status === "submitted")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pending Transfers
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingTransfers.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No pending transfers</p>
        ) : (
          <div className="space-y-4">
            {pendingTransfers.slice(0, 5).map((transfer) => (
              <div key={transfer.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{transfer.player.name}</span>
                    <Badge variant={transfer.status === "submitted" ? "secondary" : "outline"}>
                      {transfer.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transfer.fromClub?.name || "Free Agent"} → {transfer.toClub.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(transfer.submittedAt, { addSuffix: true })}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
