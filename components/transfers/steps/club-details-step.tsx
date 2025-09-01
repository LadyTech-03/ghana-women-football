"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useClubStore } from "@/lib/store"
import type { TransferFormData } from "@/lib/types"

interface ClubDetailsStepProps {
  formData: TransferFormData
  updateFormData: (data: Partial<TransferFormData>) => void
}

export function ClubDetailsStep({ formData, updateFormData }: ClubDetailsStepProps) {
  const { clubs } = useClubStore()

  const selectedFromClub = clubs.find((club) => club.id === formData.fromClubId)
  const selectedToClub = clubs.find((club) => club.id === formData.toClubId)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Club Information</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromClub">From Club (Current)</Label>
              <Select value={formData.fromClubId} onValueChange={(value) => updateFormData({ fromClubId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current club or leave empty for free agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freeAgent">Free Agent</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id}>
                      <div className="flex items-center gap-2">
                        <span>{club.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {club.zone}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedFromClub && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm">
                    <div className="font-medium">{selectedFromClub.name}</div>
                    <div className="text-muted-foreground">
                      {selectedFromClub.region} • {selectedFromClub.zone} Zone
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="toClub">To Club (Destination) *</Label>
              <Select value={formData.toClubId} onValueChange={(value) => updateFormData({ toClubId: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id}>
                      <div className="flex items-center gap-2">
                        <span>{club.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {club.zone}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedToClub && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm">
                    <div className="font-medium">{selectedToClub.name}</div>
                    <div className="text-muted-foreground">
                      {selectedToClub.region} • {selectedToClub.zone} Zone
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedFromClub && selectedToClub && selectedFromClub.zone !== selectedToClub.zone && (
          <div className="mt-4 p-4 bg-secondary/10 border border-secondary rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm font-medium">Inter-Zone Transfer</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              This transfer is between {selectedFromClub.zone} and {selectedToClub.zone} zones and may require
              additional documentation.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
