"use client"

import { useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { PendingTransfers } from "@/components/dashboard/pending-transfers"
import { RecentApprovals } from "@/components/dashboard/recent-approvals"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { TransferWindow } from "@/components/dashboard/transfer-window"
import { GFAReviewerDashboard } from "@/components/dashboard/gfa-reviewer-dashboard"
import { useTransferStore, useAuthStore } from "@/lib/store"

export default function DashboardPage() {
  const { transfers, fetchTransfers } = useTransferStore()
  const { user } = useAuthStore()

  useEffect(() => {
    fetchTransfers()
  }, [fetchTransfers])

  const stats = {
    pending: transfers.filter((t) => t.status === "under_review" || t.status === "submitted").length,
    approved: transfers.filter((t) => t.status === "approved").length,
    rejected: transfers.filter((t) => t.status === "rejected").length,
    total: transfers.length,
  }

  const getRoleDescription = () => {
    switch (user?.role) {
      case "club_admin":
        return `Club Admin (${user.clubId ? "Ampem Darkoa" : "Unknown Club"}) - Initiates transfer (incoming/outgoing), submits player and contract details.`
      case "gfa_reviewer":
        return "GFA Reviewer - Verifies documentation, compliance, and eligibility."
      case "caf_official":
        return "CAF/Governing Body - Oversees international transfers or cases requiring continental clearance."
      default:
        return "Welcome to the GFA Transfer Management System"
    }
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {/* <p className="text-muted-foreground text-lg">Welcome back, {user?.name}</p> */}
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border-l-4 border-primary">
            {getRoleDescription()}
          </p>
        </div>

        <StatsCards stats={stats} />

        {user?.role === "gfa_reviewer" ? (
          <div className="space-y-8">
            <GFAReviewerDashboard transfers={transfers} />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-8">
              <PendingTransfers transfers={transfers} />
              <RecentApprovals transfers={transfers} />
            </div>

            {/* Sidebar content */}
            <div className="space-y-6">
              <TransferWindow />
              <QuickActions />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
