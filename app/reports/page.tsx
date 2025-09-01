"use client"

import { useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { TransferStatistics } from "@/components/reports/transfer-statistics"
import { ZoneAnalysis } from "@/components/reports/zone-analysis"
import { ExportControls } from "@/components/reports/export-controls"
import { useTransferStore, useClubStore } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  const { transfers, fetchTransfers } = useTransferStore()
  const { clubs } = useClubStore()

  useEffect(() => {
    fetchTransfers()
  }, [fetchTransfers])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            View transfer statistics, zone analysis, and export data for reporting
          </p>
        </div>

        <Tabs defaultValue="statistics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="statistics">Transfer Statistics</TabsTrigger>
            <TabsTrigger value="zones">Zone Analysis</TabsTrigger>
            <TabsTrigger value="export">Export Data</TabsTrigger>
          </TabsList>

          <TabsContent value="statistics" className="space-y-6">
            <TransferStatistics transfers={transfers} />
          </TabsContent>

          <TabsContent value="zones" className="space-y-6">
            <ZoneAnalysis transfers={transfers} clubs={clubs} />
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <ExportControls transfers={transfers} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
