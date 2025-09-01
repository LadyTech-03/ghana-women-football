"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TransferFormData } from "@/lib/types"

interface PlayerDetailsStepProps {
  formData: TransferFormData
  updateFormData: (data: Partial<TransferFormData>) => void
}

const positions = [
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
  "Centre-back",
  "Full-back",
  "Wing-back",
  "Defensive Midfielder",
  "Central Midfielder",
  "Attacking Midfielder",
  "Winger",
  "Striker",
]

export function PlayerDetailsStep({ formData, updateFormData }: PlayerDetailsStepProps) {
  const handlePlayerChange = (field: string, value: string) => {
    updateFormData({
      player: {
        ...formData.player,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Player Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="playerName">Full Name *</Label>
            <Input
              id="playerName"
              value={formData.player.name}
              onChange={(e) => handlePlayerChange("name", e.target.value)}
              placeholder="Enter player's full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.player.dateOfBirth}
              onChange={(e) => handlePlayerChange("dateOfBirth", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality *</Label>
            <Select
              value={formData.player.nationality}
              onValueChange={(value) => handlePlayerChange("nationality", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ghanaian">Ghanaian</SelectItem>
                <SelectItem value="Nigerian">Nigerian</SelectItem>
                <SelectItem value="Ivorian">Ivorian</SelectItem>
                <SelectItem value="Senegalese">Senegalese</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select value={formData.player.position} onValueChange={(value) => handlePlayerChange("position", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passportId">Passport ID</Label>
            <Input
              id="passportId"
              value={formData.player.passportId || ""}
              onChange={(e) => handlePlayerChange("passportId", e.target.value)}
              placeholder="Enter passport number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationalId">National ID</Label>
            <Input
              id="nationalId"
              value={formData.player.nationalId || ""}
              onChange={(e) => handlePlayerChange("nationalId", e.target.value)}
              placeholder="Enter national ID number"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
