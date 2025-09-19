"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, Shield, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/lib/store"
import Image from "next/image"

export default function PlayerLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      router.push("/player-dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background via-background to-muted/10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Image src={"/gfa_on_white.png"} width={200} height={200} alt="logo" />
              <div className="text-left">
                {/* <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                  GHANA WOMEN'S FOOTBALL
                </h1> */}
                {/* <p className="text-sm text-muted-foreground">Confidential & Secure Platform</p> */}
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">PLAYER SUPPORT</CardTitle>
              <CardDescription className="text-base">Sign in to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@club.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In Securely"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Test Account:</strong> comfort.yeboah@ampemdarkoaladies.com / password
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Need help? Contact your club's welfare officer or{" "}
              <Link href="/support-contact" className="text-red-600 hover:text-red-700 hover:underline">
                FA Support
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-red-50 via-yellow-50 to-green-50 dark:from-red-950/20 dark:via-yellow-950/20 dark:to-green-950/20 items-center justify-center p-8 relative overflow-hidden">
        {/* Added background image overlay */}
        <div className="absolute inset-0 bg-[url('/ghana-women-football-player-celebrating-victory-in.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-yellow-900/10 to-green-900/10" />

        <div className="max-w-lg text-center space-y-8 relative z-10">

          <div className="grid gap-6">
            <div className="flex items-start space-x-4 p-6 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl border border-red-200/50 dark:border-red-800/50 shadow-lg">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-background" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary dark:text-red-100">Confidential Support</h3>
                <p className="text-sm text-muted-foreground">
                  Request supplies, medical support, and schedule adjustments privately and securely.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl border border-yellow-200/50 dark:border-yellow-800/50 shadow-lg">
              <div className="h-12 w-12 rounded-full bg-secondary/60 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-background" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary dark:text-yellow-100">Health Resources</h3>
                <p className="text-sm text-primary">
                  Access articles, videos, and local resources on menstrual health and nutrition.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl border border-green-200/50 dark:border-green-800/50 shadow-lg">
              <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-background" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary dark:text-green-100">Community Support</h3>
                <p className="text-sm text-primary">
                  Connect with welfare officers and access anonymous feedback channels.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-white/80 italic font-medium">
              "Empowering Ghana's women footballers with the support they deserve."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
