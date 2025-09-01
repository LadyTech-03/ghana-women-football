"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, BarChart3 } from "lucide-react"
import { useState } from "react"
import type { Transfer } from "@/lib/types"

interface ExportControlsProps {
  transfers: Transfer[]
}

export function ExportControls({ transfers }: ExportControlsProps) {
  const [exportType, setExportType] = useState("all")
  const [exportFormat, setExportFormat] = useState("csv")

  const handleExport = () => {
    let dataToExport = transfers

    // Filter data based on export type
    switch (exportType) {
      case "pending":
        dataToExport = transfers.filter((t) => t.status === "submitted" || t.status === "under_review")
        break
      case "approved":
        dataToExport = transfers.filter((t) => t.status === "approved")
        break
      case "rejected":
        dataToExport = transfers.filter((t) => t.status === "rejected")
        break
    }

    // Convert to CSV format
    if (exportFormat === "csv") {
      const headers = [
        "Transfer ID",
        "Player Name",
        "From Club",
        "To Club",
        "Transfer Type",
        "Status",
        "Transfer Fee",
        "Submitted Date",
        "Approved Date",
      ]

      const csvData = dataToExport.map((transfer) => [
        transfer.id,
        transfer.player.name,
        transfer.fromClub?.name || "Free Agent",
        transfer.toClub.name,
        transfer.type,
        transfer.status,
        transfer.transferFee || 0,
        transfer.submittedAt.toISOString().split("T")[0],
        transfer.approvedAt?.toISOString().split("T")[0] || "",
      ])

      const csvContent = [headers, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `gfa-transfers-${exportType}-${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Export Type</label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data to export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transfers</SelectItem>
                  <SelectItem value="pending">Pending Transfers</SelectItem>
                  <SelectItem value="approved">Approved Transfers</SelectItem>
                  <SelectItem value="rejected">Rejected Transfers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleExport} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Export {exportType === "all" ? "All" : exportType} Transfers
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Exporting{" "}
            {
              transfers.filter((t) => {
                switch (exportType) {
                  case "pending":
                    return t.status === "submitted" || t.status === "under_review"
                  case "approved":
                    return t.status === "approved"
                  case "rejected":
                    return t.status === "rejected"
                  default:
                    return true
                }
              }).length
            }{" "}
            records
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
