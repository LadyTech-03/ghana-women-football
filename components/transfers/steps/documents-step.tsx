"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, File, X, CheckCircle } from "lucide-react"
import type { TransferFormData } from "@/lib/types"

interface DocumentsStepProps {
  formData: TransferFormData
  updateFormData: (data: Partial<TransferFormData>) => void
}

const requiredDocuments = [
  { type: "contract", label: "Player Contract", required: true },
  { type: "id", label: "Player ID/Passport", required: true },
  { type: "medical", label: "Medical Certificate", required: true },
  { type: "itc", label: "International Transfer Certificate", required: false },
  { type: "work_permit", label: "Work Permit (if applicable)", required: false },
]

export function DocumentsStep({ formData, updateFormData }: DocumentsStepProps) {
  const [dragOver, setDragOver] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files)
    updateFormData({
      documents: [...formData.documents, ...newFiles],
    })
  }

  const removeDocument = (index: number) => {
    const updatedDocuments = formData.documents.filter((_, i) => i !== index)
    updateFormData({ documents: updatedDocuments })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Required Documents</h3>

        <div className="space-y-4 mb-6">
          {requiredDocuments.map((doc) => (
            <div key={doc.type} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium">{doc.label}</span>
                  {doc.required && <span className="text-destructive ml-1">*</span>}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{doc.required ? "Required" : "Optional"}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Label>Upload Documents</Label>

          <Card
            className={`border-2 border-dashed transition-colors ${
              dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Upload className="h-8 w-8 text-muted-foreground mb-4" />
              <div className="text-center">
                <p className="text-sm font-medium mb-1">Drop files here or click to upload</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG up to 10MB each</p>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </CardContent>
          </Card>

          {formData.documents.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Documents ({formData.documents.length})</Label>
              <div className="space-y-2">
                {formData.documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-sm font-medium">{file.name}</span>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
