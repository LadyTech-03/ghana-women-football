"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, DollarSign, FileText, User } from "lucide-react"
import { useTransferStore, useClubStore, usePlayerStore } from "@/lib/store"
import { PlayerSelector } from "./player-selector"
import { toast } from "sonner"
import type { Player } from "@/lib/types"

export function EnhancedTransferForm() {
  const router = useRouter()
  const { createTransfer } = useTransferStore()
  const { clubs } = useClubStore()
  const { fetchPlayers } = usePlayerStore()

  const [formData, setFormData] = useState({
    // Player Profile
    playerId: "",
    playerName: "",
    dateOfBirth: "",
    nationality: "Ghana",
    passportId: "",

    // Club Details
    fromClubId: "",
    toClubId: "",
    fromZone: "",
    toZone: "",

    // Transfer Details
    transferType: "",
    transferFee: "",
    paymentTerms: "",
    bonuses: "",
    contractDuration: "",

    // Additional Info
    medicalStatus: "",
    notes: "",
  })

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [documents, setDocuments] = useState<File[]>([])

  useEffect(() => {
    fetchPlayers()
  }, [fetchPlayers])

  const handleFromClubChange = (clubId: string) => {
    const club = clubs.find((c) => c.id === clubId)
    if (club) {
      setFormData((prev) => ({
        ...prev,
        fromClubId: clubId,
        fromZone: club.zone,
        // Reset player selection when club changes
        playerId: "",
        playerName: "",
        dateOfBirth: "",
        passportId: "",
      }))
      setSelectedPlayer(null)
    }
  }

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player)
    setFormData((prev) => ({
      ...prev,
      playerId: player.id,
      playerName: player.name,
      dateOfBirth: player.dateOfBirth.toISOString().split("T")[0],
      nationality: player.nationality,
      passportId: player.passportId || "",
    }))
  }

  const handleToClubChange = (clubId: string) => {
    const club = clubs.find((c) => c.id === clubId)
    if (club) {
      setFormData((prev) => ({
        ...prev,
        toClubId: clubId,
        toZone: club.zone,
      }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setDocuments((prev) => [...prev, ...files])
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.playerId || !formData.fromClubId || !formData.toClubId || !formData.transferType) {
      toast.error("Please fill in all required fields")
      return
    }

    const transferData = {
      ...formData,
      id: `transfer-${Date.now()}`,
      status: "submitted" as const,
      submittedAt: new Date().toISOString(),
      documents: documents.map((doc) => doc.name),
      playerImage: selectedPlayer?.image || "/placeholder.svg?height=40&width=40",
      playerPosition: selectedPlayer?.position || "Unknown",
      fromClub: clubs.find((c) => c.id === formData.fromClubId)?.name || "",
      toClub: clubs.find((c) => c.id === formData.toClubId)?.name || "",
    }

    await createTransfer(transferData)
    toast.success("Transfer request submitted successfully!")
    router.push("/transfers")
  }

  const isInterZoneTransfer = formData.fromZone && formData.toZone && formData.fromZone !== formData.toZone

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Club Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Club Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromClub">From Club *</Label>
              <Select value={formData.fromClubId} onValueChange={handleFromClubChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select origin club" />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="toClub">To Club *</Label>
              <Select value={formData.toClubId} onValueChange={handleToClubChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs
                    .filter((c) => c.id !== formData.fromClubId)
                    .map((club) => (
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
            </div>
          </div>

          {isInterZoneTransfer && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Inter-Zone Transfer:</strong> This transfer is between {formData.fromZone} and {formData.toZone}{" "}
                zones. Additional documentation may be required.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Player Selection */}
      {formData.fromClubId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Player Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PlayerSelector
              clubId={formData.fromClubId}
              selectedPlayer={selectedPlayer}
              onPlayerSelect={handlePlayerSelect}
              label="Select Player *"
              placeholder="Choose a player from the selected club..."
            />
          </CardContent>
        </Card>
      )}

      {/* Player Profile (Auto-filled) */}
      {formData.playerId && (
        <Card>
          <CardHeader>
            <CardTitle>Player Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="playerName">Player Name</Label>
                <Input id="playerName" value={formData.playerName} readOnly className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nationality: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passportId">Passport/ID Number</Label>
                <Input
                  id="passportId"
                  value={formData.passportId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, passportId: e.target.value }))}
                  placeholder="Enter passport or ID number"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transfer Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Transfer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transferType">Transfer Type *</Label>
              <Select
                value={formData.transferType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, transferType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transfer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="loan">Loan</SelectItem>
                  <SelectItem value="free_agent">Free Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractDuration">Contract Duration</Label>
              <Input
                id="contractDuration"
                value={formData.contractDuration}
                onChange={(e) => setFormData((prev) => ({ ...prev, contractDuration: e.target.value }))}
                placeholder="e.g., 2 years"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transferFee">Transfer Fee (GHS)</Label>
              <Input
                id="transferFee"
                type="number"
                value={formData.transferFee}
                onChange={(e) => setFormData((prev) => ({ ...prev, transferFee: e.target.value }))}
                placeholder="Enter amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bonuses">Bonuses (GHS)</Label>
              <Input
                id="bonuses"
                type="number"
                value={formData.bonuses}
                onChange={(e) => setFormData((prev) => ({ ...prev, bonuses: e.target.value }))}
                placeholder="Performance bonuses"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Textarea
              id="paymentTerms"
              value={formData.paymentTerms}
              onChange={(e) => setFormData((prev) => ({ ...prev, paymentTerms: e.target.value }))}
              placeholder="Describe payment schedule and terms"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-foreground">Upload Documents</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Contract, ID, Medical Clearance, ITC, Work Permit
                  </span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {documents.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Documents</Label>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{doc.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional information or special circumstances"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Submit Transfer Request
        </Button>
      </div>
    </form>
  )
}
