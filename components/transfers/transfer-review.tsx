"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, MessageSquare, FileText, User, Building2, Calendar } from "lucide-react"
import type { Transfer } from "@/lib/types"
import { useTransferStore, useAuthStore } from "@/lib/store"
import { formatDistanceToNow, format } from "date-fns"

interface TransferReviewProps {
  transfer: Transfer
}

export function TransferReview({ transfer }: TransferReviewProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { updateTransferStatus } = useTransferStore()
  const { user } = useAuthStore()

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    if (!comment.trim()) {
      alert("Please add a comment before updating the status.")
      return
    }

    setIsSubmitting(true)
    try {
      await updateTransferStatus(transfer.id, status, comment)
      setComment("")
    } catch (error) {
      console.error("Failed to update transfer status:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: Transfer["status"]) => {
    switch (status) {
      case "submitted":
        return "bg-secondary text-secondary-foreground"
      case "under_review":
        return "bg-primary text-primary-foreground"
      case "approved":
        return "bg-chart-3 text-white"
      case "rejected":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const canReview = user?.role === "gfa_reviewer" || user?.role === "caf_official"
  const isReviewable = transfer.status === "submitted" || transfer.status === "under_review"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Transfer #{transfer.id}
            </CardTitle>
            <Badge className={getStatusColor(transfer.status)}>{transfer.status.replace("_", " ")}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{transfer.player.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {transfer.player.nationality} • Born {format(transfer.player.dateOfBirth, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {transfer.fromClub?.name || "Free Agent"} → {transfer.toClub.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transfer.fromClub?.zone || "N/A"} Zone → {transfer.toClub.zone} Zone
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    Submitted {formatDistanceToNow(transfer.submittedAt, { addSuffix: true })}
                  </p>
                  <p className="text-sm text-muted-foreground">{format(transfer.submittedAt, "PPP 'at' p")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Transfer Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="outline">{transfer.type.replace("_", " ")}</Badge>
                  </div>
                  {transfer.transferFee && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee:</span>
                      <span className="font-medium">GHS {transfer.transferFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Documents:</span>
                    <span>{transfer.documents.length} files</span>
                  </div>
                </div>
              </div>

              {(transfer.paymentTerms || transfer.bonuses) && (
                <div>
                  <h4 className="font-medium mb-2">Financial Terms</h4>
                  {transfer.paymentTerms && (
                    <div className="mb-2">
                      <span className="text-sm text-muted-foreground">Payment Terms:</span>
                      <p className="text-sm">{transfer.paymentTerms}</p>
                    </div>
                  )}
                  {transfer.bonuses && (
                    <div>
                      <span className="text-sm text-muted-foreground">Bonuses:</span>
                      <p className="text-sm">{transfer.bonuses}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents ({transfer.documents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {transfer.documents.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {transfer.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.fileName}</p>
                      <p className="text-xs text-muted-foreground capitalize">{doc.type.replace("_", " ")}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No documents uploaded</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments & History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transfer.comments.length > 0 ? (
              transfer.comments.map((comment) => (
                <div key={comment.id} className="border-l-2 border-muted pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {comment.author.role.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm">{comment.message}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No comments yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {canReview && isReviewable && (
        <Card>
          <CardHeader>
            <CardTitle>Review Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="comment" className="text-sm font-medium mb-2 block">
                  Add Comment *
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your review comments here..."
                  rows={4}
                />
              </div>
              <Separator />
              <div className="flex gap-3">
                <Button
                  onClick={() => handleStatusUpdate("approved")}
                  disabled={isSubmitting || !comment.trim()}
                  className="bg-chart-3 hover:bg-chart-3/90"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Transfer
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={isSubmitting || !comment.trim()}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Transfer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
