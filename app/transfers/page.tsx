"use client"

import { useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { MyTransfersTable } from "@/components/transfers/my-transfers-table"
import { TransferTable } from "@/components/transfers/transfer-table"
import { useTransferStore, useAuthStore } from "@/lib/store"

export default function TransfersPage() {
  const { transfers, fetchTransfers } = useTransferStore()
  const { user } = useAuthStore()

  useEffect(() => {
    fetchTransfers()
  }, [fetchTransfers])

  const getPageTitle = () => {
    switch (user?.role) {
      case "gfa_reviewer":
        return "Transfer Management"
      case "caf_official":
        return "International Transfers"
      default:
        return "My Transfers"
    }
  }

  const getPageDescription = () => {
    switch (user?.role) {
      case "gfa_reviewer":
        return "Review and manage all transfer requests from clubs across Ghana"
      case "caf_official":
        return "Review international transfers requiring CAF approval"
      default:
        return "View and manage your club's transfer requests"
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>

        {user?.role === "gfa_reviewer" || user?.role === "caf_official" ? (
          <TransferTable transfers={transfers} />
        ) : (
          <MyTransfersTable transfers={transfers || []} />
        )}
      </div>
    </MainLayout>
  )
}
