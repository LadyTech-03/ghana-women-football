"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"
import {
  LayoutDashboard,
  FileText,
  Building2,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Plus,
} from "lucide-react"

const getNavigationForRole = (role: string) => {
  const baseNavigation = [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]

  switch (role) {
    case "club_admin":
      return [
        ...baseNavigation,
        { name: "My Transfers", href: "/transfers", icon: FileText },
        { name: "Submit Transfer", href: "/transfers/new", icon: Plus },
        { name: "Club Directory", href: "/clubs", icon: Building2 },
        { name: "Reports", href: "/reports", icon: BarChart3 },
        { name: "Help", href: "/help", icon: HelpCircle },
      ]
    case "gfa_reviewer":
      return [
        ...baseNavigation,
        { name: "Transfers", href: "/transfers", icon: FileText },
        { name: "Review", href: "/review", icon: ClipboardCheck },
      ]
    case "caf_official":
      return [
        ...baseNavigation,
        { name: "International Transfers", href: "/transfers", icon: FileText },
        { name: "Review", href: "/review", icon: ClipboardCheck },
        { name: "Reports", href: "/reports", icon: BarChart3 },
        { name: "Help", href: "/help", icon: HelpCircle },
      ]
    default:
      return baseNavigation
  }
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { user } = useAuthStore()

  const navigation = getNavigationForRole(user?.role || "club_admin")

  return (
    <div className={cn("flex flex-col border-r bg-sidebar transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && <span className="text-sm font-medium text-sidebar-foreground">Navigation</span>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed && "px-2")}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{item.name}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
