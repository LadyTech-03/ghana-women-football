"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { TransferFormData } from "@/lib/types"

interface TransferDetailsStepProps {
  formData: TransferFormData
  updateFormData: (data: Partial<TransferFormData>) => void
}

export function TransferDetailsStep({ formData, updateFormData }: TransferDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Transfer Details</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transferType">Transfer Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "permanent" | "loan" | "free_agent") => updateFormData({ type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transfer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent">Permanent Transfer</SelectItem>
                <SelectItem value="loan">Loan</SelectItem>
                <SelectItem value="free_agent">Free Agent Signing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type !== "free_agent" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="transferFee">Transfer Fee (GHS)</Label>
                <Input
                  id="transferFee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.transferFee || ""}
                  onChange={(e) => updateFormData({ transferFee: Number.parseFloat(e.target.value) || 0 })}
                  placeholder="Enter transfer fee amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Textarea
                  id="paymentTerms"
                  value={formData.paymentTerms || ""}
                  onChange={(e) => updateFormData({ paymentTerms: e.target.value })}
                  placeholder="Describe payment terms and schedule"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bonuses">Performance Bonuses</Label>
                <Textarea
                  id="bonuses"
                  value={formData.bonuses || ""}
                  onChange={(e) => updateFormData({ bonuses: e.target.value })}
                  placeholder="Describe any performance-based bonuses or incentives"
                  rows={3}
                />
              </div>
            </>
          )}

          {formData.type === "loan" && (
            <div className="p-4 bg-secondary/10 border border-secondary rounded-lg">
              <h4 className="font-medium mb-2">Loan Transfer Information</h4>
              <p className="text-sm text-muted-foreground">
                For loan transfers, please ensure you include the loan duration, return conditions, and any option to
                buy clauses in the contract documentation.
              </p>
            </div>
          )}

          {formData.type === "free_agent" && (
            <div className="p-4 bg-chart-3/10 border border-chart-3 rounded-lg">
              <h4 className="font-medium mb-2">Free Agent Signing</h4>
              <p className="text-sm text-muted-foreground">
                This player is joining as a free agent. No transfer fee is required, but registration and contract
                documentation must still be provided.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
