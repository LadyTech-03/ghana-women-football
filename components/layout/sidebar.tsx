"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"
import {
  LayoutDashboard,
  ArrowLeftRight ,
  ShieldHalf,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  Menu,
  ClipboardCheck,
  Plus,
} from "lucide-react"
import Image from "next/image"

const getNavigationForRole = (role: string) => {
  const baseNavigation = [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]

  switch (role) {
    case "club_admin":
      return [
        ...baseNavigation,
        { name: "My Transfers", href: "/transfers", icon: ArrowLeftRight  },
        { name: "Submit Transfer", href: "/transfers/new", icon: Plus },
        { name: "Club Directory", href: "/clubs", icon: ShieldHalf },
        { name: "Reports", href: "/reports", icon: BarChart3 },
        { name: "Help", href: "/help", icon: HelpCircle },
      ]
    case "gfa_reviewer":
      return [
        ...baseNavigation,
        { name: "Transfers", href: "/transfers", icon: ArrowLeftRight  },
        { name: "Review", href: "/review", icon: ClipboardCheck },
      ]
    case "caf_official":
      return [
        ...baseNavigation,
        { name: "International Transfers", href: "/transfers", icon: ArrowLeftRight  },
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
    <div className={cn("flex fixed w-64 flex-col border-r bg-sidebar transition-all duration-300 left-0 h-[calc(100vh-4rem)]")}>

      <nav className="flex flex-col space-y-2 p-2 mt-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed && "px-2")}
              >
                <item.icon className="h-4 w-4"/>
                {!collapsed && <span className="ml-2 text-lg">{item.name}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
