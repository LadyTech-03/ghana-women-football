import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, BookOpen, MessageSquare, Calendar, Shield } from "lucide-react"
import Link from "next/link"

export default function PlayerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Welcome Back, Player</h1>
        <p className="text-muted-foreground">Your confidential support dashboard</p>
      </div>

      {/* Player Wellbeing Widget */}
      <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-accent" />
            <span>Player Wellbeing</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Access confidential support resources and request assistance when needed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/player-support?tab=resources">
                <BookOpen className="h-4 w-4 mr-2" />
                Health Resources
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/player-support?tab=request">
                <MessageSquare className="h-4 w-4 mr-2" />
                Request Support
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/player-support?tab=feedback">
                <Shield className="h-4 w-4 mr-2" />
                Report Issue
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Requests</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Active requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources Accessed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Support</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Scheduled consultation</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Supply request approved</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Accessed menstrual health guide</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Medical consultation scheduled</p>
                <p className="text-xs text-muted-foreground">2 weeks ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
