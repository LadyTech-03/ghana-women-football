import { MainLayout } from "@/components/layout/main-layout"
import { EnhancedTransferForm } from "@/components/transfers/enhanced-transfer-form"


export default function NewTransferPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submit New Transfer</h1>
          <p className="text-muted-foreground">Complete the form below to submit a new player transfer request.</p>
        </div>

        <EnhancedTransferForm />
      </div>
    </MainLayout>
  )
}
