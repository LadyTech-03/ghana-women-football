"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { TransferReview } from "@/components/transfers/transfer-review"
import { useTransferStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import type { Transfer } from "@/lib/types"

export default function TransferDetailPage() {
  const params = useParams()
  const { transfers, fetchTransfers } = useTransferStore()
  const [transfer, setTransfer] = useState<Transfer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTransfer = async () => {
      if (transfers.length === 0) {
        await fetchTransfers()
      }

      const foundTransfer = transfers.find((t) => t.id === params.id)
      setTransfer(foundTransfer || null)
      setLoading(false)
    }

    loadTransfer()
  }, [params.id, transfers, fetchTransfers])

  if (loading) {
    return (
      <MainLayout>
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading transfer details...
          </CardContent>
        </Card>
      </MainLayout>
    )
  }

  if (!transfer) {
    return (
      <MainLayout>
        <Card>
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-semibold mb-2">Transfer Not Found</h2>
            <p className="text-muted-foreground">The requested transfer could not be found.</p>
          </CardContent>
        </Card>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transfer Review</h1>
          <p className="text-muted-foreground">Review transfer request for {transfer.player.name}</p>
        </div>

        <TransferReview transfer={transfer} />
      </div>
    </MainLayout>
  )
}
