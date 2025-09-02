import {
  LayoutDashboard,
  ArrowLeftRight,
  ShieldHalf,
  BarChart3,
  HelpCircle,
  ClipboardCheck,
  Plus,
} from "lucide-react"

export const getNavigationForRole = (role: string) => {
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