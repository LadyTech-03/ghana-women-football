"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Eye, EyeOff, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RegisterLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [userType, setUserType] = useState("")

  return (
    <div className="min-h-screen bg-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder-kdrcm.png')] opacity-5" />

      {/* Header */}
      <header className="relative z-10 bg-primary backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/gfa.png" alt="GFA Logo" width={150} height={150} />
          </div>
          <Button variant="ghost" asChild className="text-background hover:bg-white/10">
            <Link href="/register">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Registration
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-background mb-2">Welcome Back</h1>
            <p className="text-background/80">Sign in to your account account</p>
          </div>

          {/* Login Form */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl text-background text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Type Selection */}
              <div>
                <Label htmlFor="userType" className="text-background/90">
                  Account Type
                </Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-background">
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="club">Club / GFA Official</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="scout">Scout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Username/Email */}
              <div>
                <Label htmlFor="username" className="text-background/90">
                  Username or Email
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username or email"
                  className="bg-white/10 border-white/20 text-background placeholder:text-background/50 focus:border-primary"
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-background/90">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-white/10 border-white/20 text-background placeholder:text-background/50 focus:border-primary pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-background/70 hover:text-background hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    // onCheckedChange={setRememberMe}
                    className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="remember" className="text-sm text-background/80 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button className="w-full bg-primary hover:bg-primary/90 text-background py-6 text-lg font-semibold">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black/40 px-2 text-background/60">Or</span>
                </div>
              </div>

              {/* Create Account Link */}
              <div className="text-center">
                <p className="text-background/70 mb-4">Don't have an account yet?</p>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-white/30 text-background hover:bg-white/10 bg-transparent"
                >
                  <Link href="/register">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create New Account
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-sm text-background/60">Secure login protected by Ghana Football Association</p>
            <div className="flex justify-center items-center mt-4 space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-background/60">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-background/60">Data Protected</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
