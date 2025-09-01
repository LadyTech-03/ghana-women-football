"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Search, FileText } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "New Transfer",
      description: "Submit a new player transfer",
      icon: Plus,
      href: "/transfers/new",
      variant: "default" as const,
    },
    {
      title: "Upload Document",
      description: "Add supporting documents",
      icon: Upload,
      href: "/transfers/documents",
      variant: "outline" as const,
    },
    {
      title: "Search Players",
      description: "Find players in the system",
      icon: Search,
      href: "/players",
      variant: "outline" as const,
    },
    {
      title: "View Reports",
      description: "Access transfer reports",
      icon: FileText,
      href: "/reports",
      variant: "outline" as const,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button variant={action.variant} className="w-full h-auto p-4 flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <action.icon className="h-4 w-4" />
                  <span className="font-medium">{action.title}</span>
                </div>
                <span className="text-xs text-left opacity-80">{action.description}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
