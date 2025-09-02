"use client"

import { useContext } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/lib/store"
import { getNavigationForRole } from "@/lib/navigation"

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const navigation = getNavigationForRole(user?.role || "club_admin")

  return (
    <Sidebar>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton  asChild>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        {<span className="ml-2 text-lg">{item.name}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}