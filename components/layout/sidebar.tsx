"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"
import {
  LayoutDashboard,
  ArrowLeftRight,
  ShieldHalf,
  BarChart3,
  HelpCircle,
  ClipboardCheck,
  Plus,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  MessageSquare,
  ChartLine,
  Users,
  Calendar,
  Trophy,
} from "lucide-react"

const getNavigationForRole = (role: string) => {
  const baseNavigation = [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]

  switch (role) {
    case "club_admin":
      return [
        ...baseNavigation,
        { name: "My Transfers", href: "/transfers", icon: ArrowLeftRight },
        { name: "Submit Transfer", href: "/transfers/new", icon: Plus },
        {
          name: "Transfer Arena",
          icon: Trophy,
          submenu: [
            { name: "Transfers Out", href: "/transfer-arena/transfers-out", icon: ArrowUpRight },
            { name: "Transfers In", href: "/transfer-arena/transfers-in", icon: ArrowDownLeft },
            { name: "Messages", href: "/transfer-arena/messages", icon: MessageSquare },
            { name: "Intelligence", href: "/transfer-arena/intelligence", icon: ChartLine },
            { name: "Friendlies", href: "/transfer-arena/friendlies", icon: Users },
            { name: "Events", href: "/transfer-arena/events", icon: Calendar },
          ],
        },
        { name: "Club Directory", href: "/clubs", icon: ShieldHalf },
        { name: "Reports", href: "/reports", icon: BarChart3 },
        { name: "Help", href: "/help", icon: HelpCircle },
      ]
    case "gfa_reviewer":
      return [
        ...baseNavigation,
        { name: "Transfers", href: "/transfers", icon: ArrowLeftRight },
        {
          name: "Transfer Arena",
          icon: Trophy,
          submenu: [
            { name: "Transfers Out", href: "/transfer-arena/transfers-out", icon: ArrowUpRight },
            { name: "Transfers In", href: "/transfer-arena/transfers-in", icon: ArrowDownLeft },
            { name: "Messages", href: "/transfer-arena/messages", icon: MessageSquare },
            { name: "Intelligence", href: "/transfer-arena/intelligence", icon: ChartLine },
            { name: "Friendlies", href: "/transfer-arena/friendlies", icon: Users },
            { name: "Events", href: "/transfer-arena/events", icon: Calendar },
          ],
        },
        { name: "Review", href: "/review", icon: ClipboardCheck },
      ]
    case "caf_official":
      return [
        ...baseNavigation,
        { name: "International Transfers", href: "/transfers", icon: ArrowLeftRight },
        {
          name: "Transfer Arena",
          icon: Trophy,
          submenu: [
            { name: "Transfers Out", href: "/transfer-arena/transfers-out", icon: ArrowUpRight },
            { name: "Transfers In", href: "/transfer-arena/transfers-in", icon: ArrowDownLeft },
            { name: "Messages", href: "/transfer-arena/messages", icon: MessageSquare },
            { name: "Intelligence", href: "/transfer-arena/intelligence", icon: ChartLine },
            { name: "Friendlies", href: "/transfer-arena/friendlies", icon: Users },
            { name: "Events", href: "/transfer-arena/events", icon: Calendar },
          ],
        },
        { name: "Reports", href: "/reports", icon: BarChart3 },
        { name: "Help", href: "/help", icon: HelpCircle },
      ]
    default:
      return baseNavigation
  }
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const pathname = usePathname()
  const { user } = useAuthStore()

  const navigation = getNavigationForRole(user?.role || "club_admin")

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName],
    )
  }

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some((item) => pathname === item.href)
  }

  return (
    <div
      className={cn(
        "flex fixed w-64 flex-col border-r bg-sidebar transition-all duration-300 left-0 h-[calc(100vh-4rem)]",
      )}
    >
      <nav className="flex flex-col space-y-2 p-2 mt-4">
        {navigation.map((item: any) => {
          if (item.submenu) {
            const isExpanded = expandedMenus.includes(item.name)
            // const isExpanded = true
            const hasActiveSubmenu = isSubmenuActive(item.submenu)

            return (
              <div key={item.name} className="space-y-1">
                <Button
                  variant={hasActiveSubmenu ? "secondary" : "ghost"}
                  className={cn("w-full justify-between", collapsed && "px-2")}
                  onClick={() => toggleSubmenu(item.name)}
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span className="ml-2 text-lg">{item.name}</span>}
                  </div>
                  {!collapsed &&
                    (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
                </Button>

                {isExpanded && !collapsed && (
                  <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {item.submenu.map((subItem: any) => {
                      const isActive = pathname === subItem.href
                      return (
                        <Link className="space-y-4" key={subItem.name} href={subItem.href}>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            size="sm"
                            className="w-full justify-start text-lg"
                          >
                            <subItem.icon className="h-3 w-3" />
                            <span className="ml-2">{subItem.name}</span>
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed && "px-2")}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2 text-lg">{item.name}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
