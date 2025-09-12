import {
  LayoutDashboard,
  ArrowLeftRight,
  ShieldHalf,
  BarChart3,
  HelpCircle,
  ClipboardCheck,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  MessageSquare,
  Brain,
  Handshake,
  Calendar,
  Trophy,
} from "lucide-react"

export interface NavigationItem {
  name: string
  href: string
  icon: any
  submenu?: NavigationItem[]
}

export const getNavigationForRole = (role: string): NavigationItem[] => {
  const baseNavigation: NavigationItem[] = [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]

  switch (role) {
    case "club_admin":
      return [
        ...baseNavigation,
        { name: "My Transfers", href: "/transfers", icon: ArrowLeftRight },
        { name: "Submit Transfer", href: "/transfers/new", icon: Plus },
        {
          name: "Transfer Arena",
          href: "/transfer-arena",
          icon: Trophy,
          submenu: [
            { name: "Transfers Out", href: "/transfer-arena/transfers-out", icon: ArrowUpRight },
            { name: "Transfers In", href: "/transfer-arena/transfers-in", icon: ArrowDownLeft },
            { name: "Messages", href: "/transfer-arena/messages", icon: MessageSquare },
            { name: "Intelligence", href: "/transfer-arena/intelligence", icon: Brain },
            { name: "Friendlies", href: "/transfer-arena/friendlies", icon: Handshake },
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
        { name: "Review", href: "/review", icon: ClipboardCheck },
      ]
    case "caf_official":
      return [
        ...baseNavigation,
        { name: "International Transfers", href: "/transfers", icon: ArrowLeftRight },
        { name: "Review", href: "/review", icon: ClipboardCheck },
        { name: "Reports", href: "/reports", icon: BarChart3 },
        { name: "Help", href: "/help", icon: HelpCircle },
      ]
    default:
      return baseNavigation
  }
}
