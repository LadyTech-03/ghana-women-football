"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PlayerDetailsStep } from "./steps/player-details-step"
import { ClubDetailsStep } from "./steps/club-details-step"
import { TransferDetailsStep } from "./steps/transfer-details-step"
import { DocumentsStep } from "./steps/documents-step"
import { ReviewStep } from "./steps/review-step"
import type { TransferFormData } from "@/lib/types"

const steps = [
  { id: 1, title: "Player Details", component: PlayerDetailsStep },
  { id: 2, title: "Club Details", component: ClubDetailsStep },
  { id: 3, title: "Transfer Details", component: TransferDetailsStep },
  { id: 4, title: "Documents", component: DocumentsStep },
  { id: 5, title: "Review", component: ReviewStep },
]

export function TransferFormWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<TransferFormData>({
    player: {
      name: "",
      dateOfBirth: "",
      nationality: "Ghanaian",
      passportId: "",
      nationalId: "",
      position: "",
    },
    fromClubId: "",
    toClubId: "",
    type: "permanent",
    transferFee: 0,
    paymentTerms: "",
    bonuses: "",
    documents: [],
  })

  const progress = (currentStep / steps.length) * 100
  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const updateFormData = (data: Partial<TransferFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit New Transfer</CardTitle>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`flex flex-col items-center space-y-1 ${
                    step.id === currentStep ? "text-primary font-medium" : ""
                  } ${step.id < currentStep ? "text-chart-3" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      step.id === currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.id < currentStep
                          ? "bg-chart-3 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className="hidden md:block">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {CurrentStepComponent && <CurrentStepComponent formData={formData} updateFormData={updateFormData} />}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentStep === steps.length}>
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
