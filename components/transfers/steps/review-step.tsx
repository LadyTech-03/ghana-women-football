"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useClubStore, useTransferStore } from "@/lib/store"
import type { TransferFormData } from "@/lib/types"
import { useRouter } from "next/navigation"

interface ReviewStepProps {
  formData: TransferFormData
  updateFormData: (data: Partial<TransferFormData>) => void
}

export function ReviewStep({ formData }: ReviewStepProps) {
  const { clubs } = useClubStore()
  const { createTransfer } = useTransferStore()
  const router = useRouter()

  const fromClub = clubs.find((club) => club.id === formData.fromClubId)
  const toClub = clubs.find((club) => club.id === formData.toClubId)

  const handleSubmit = async () => {
    try {
      await createTransfer(formData)
      router.push("/transfers?success=true")
    } catch (error) {
      console.error("Failed to submit transfer:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review Transfer Details</h3>
        <p className="text-muted-foreground mb-6">
          Please review all information before submitting. You can go back to make changes if needed.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Player Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm font-medium">Name:</span>
              <p className="text-sm text-muted-foreground">{formData.player.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Date of Birth:</span>
              <p className="text-sm text-muted-foreground">{formData.player.dateOfBirth}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Nationality:</span>
              <p className="text-sm text-muted-foreground">{formData.player.nationality}</p>
            </div>
            {formData.player.position && (
              <div>
                <span className="text-sm font-medium">Position:</span>
                <p className="text-sm text-muted-foreground">{formData.player.position}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Club Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm font-medium">From:</span>
              <p className="text-sm text-muted-foreground">
                {fromClub ? `${fromClub.name} (${fromClub.zone} Zone)` : "Free Agent"}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium">To:</span>
              <p className="text-sm text-muted-foreground">
                {toClub ? `${toClub.name} (${toClub.zone} Zone)` : "Not selected"}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium">Transfer Type:</span>
              <Badge variant="outline" className="ml-2">
                {formData.type.replace("_", " ")}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {formData.type !== "free_agent" && (formData.transferFee || formData.paymentTerms || formData.bonuses) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Financial Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {formData.transferFee && (
              <div>
                <span className="text-sm font-medium">Transfer Fee:</span>
                <p className="text-sm text-muted-foreground">GHS {formData.transferFee.toLocaleString()}</p>
              </div>
            )}
            {formData.paymentTerms && (
              <div>
                <span className="text-sm font-medium">Payment Terms:</span>
                <p className="text-sm text-muted-foreground">{formData.paymentTerms}</p>
              </div>
            )}
            {formData.bonuses && (
              <div>
                <span className="text-sm font-medium">Bonuses:</span>
                <p className="text-sm text-muted-foreground">{formData.bonuses}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Documents ({formData.documents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {formData.documents.length > 0 ? (
            <div className="space-y-2">
              {formData.documents.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No documents uploaded</p>
          )}
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-center">
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Submit Transfer Request
        </Button>
      </div>
    </div>
  )
}
