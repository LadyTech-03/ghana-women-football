"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { differenceInDays } from "date-fns"

export function TransferWindow() {
  // Mock transfer window dates
  const windowStart = new Date("2024-01-01")
  const windowEnd = new Date("2024-01-31")
  const today = new Date()

  const isWindowOpen = today >= windowStart && today <= windowEnd
  const daysRemaining = isWindowOpen ? differenceInDays(windowEnd, today) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Transfer Window
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge variant={isWindowOpen ? "default" : "secondary"}>{isWindowOpen ? "Open" : "Closed"}</Badge>
          </div>

          {isWindowOpen && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Days Remaining</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-bold text-lg">{daysRemaining}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Window Period</span>
            </div>
            <div className="text-sm">
              <div>Start: {windowStart.toLocaleDateString()}</div>
              <div>End: {windowEnd.toLocaleDateString()}</div>
            </div>
          </div>

          {!isWindowOpen && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Transfer submissions are currently closed. The next window opens on{" "}
                {new Date("2024-06-01").toLocaleDateString()}.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
