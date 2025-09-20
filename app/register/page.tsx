"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Building2,
  UserCheck,
  Search,
  Upload,
  Eye,
  EyeOff,
  CreditCard,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("club")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [registrationType, setRegistrationType] = useState("")
  const router = useRouter()

  const registrationFees = {
    club: { amount: "2,000", currency: "$", description: "Club/GFA Official Registration" },
    agent: { amount: "1,000", currency: "$", description: "Agent Registration" },
    scout: { amount: "1,000", currency: "$", description: "Scout Registration" },
  }

  const handleRegisterClick = (type: string) => {
    setRegistrationType(type)
    setShowPaymentModal(true)
  }

  const handlePaymentConfirm = () => {
    setShowPaymentModal(false)
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccessModal(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder-kdrcm.png')] opacity-5" />

      {/* Header */}
      <header className="relative z-10 bg-primary/60 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/gfa.png" alt="GFA Logo" width={150} height={150} />
          </div>
          <Button variant="ghost" asChild className="text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-background mb-4">Registration Nexus</h1>
            <p className="text-xl text-background max-w-2xl mx-auto mb-6">
              Join the ShePlays Global ecosystem as a Club, Agent, or Scout
            </p>
            <div className="flex justify-center">
              <Button variant="outline" asChild className="border-white/30 text-background hover:bg-white/10 bg-transparent">
                <Link href="/register-login">Already have an account? Sign In</Link>
              </Button>
            </div>
          </div>

          <Card className="bg-black/40 backdrop-blur-md border-white/10 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-background" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-background mb-2">Registration Fees</h3>
                  <p className="text-background/80 mb-4">
                    A registration fee is required to complete your application.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-background" />
                        <span className="text-sm font-medium text-white">Club/GFA Official</span>
                      </div>
                      <p className="text-lg font-bold text-secondary/80 mt-1">$ 2,000</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4 text-background" />
                        <span className="text-sm font-medium text-white">Agent</span>
                      </div>
                      <p className="text-lg font-bold text-secondary/80 mt-1">$ 1,000</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-background" />
                        <span className="text-sm font-medium text-white">Scout</span>
                      </div>
                      <p className="text-lg font-bold text-secondary/80 mt-1">$ 1,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-white text-center">Create Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 border border-white/10">
                  <TabsTrigger
                    value="club"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-background hover:text-white transition-colors"
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    Club / GFA Official
                  </TabsTrigger>
                  <TabsTrigger
                    value="agent"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-background hover:text-white transition-colors"
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Agent
                  </TabsTrigger>
                  <TabsTrigger
                    value="scout"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-background hover:text-white transition-colors"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Scout
                  </TabsTrigger>
                </TabsList>

                {/* Club/GFA Official Registration */}
                <TabsContent value="club" className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Club Information */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <Building2 className="mr-2 h-5 w-5 text-background" />
                          Club Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="clubName" className="text-white/90">
                              Club Name
                            </Label>
                            <Input
                              id="clubName"
                              placeholder="Enter club name"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="zone" className="text-white/90">
                                Zone
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Select zone" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="northern">Northern</SelectItem>
                                  <SelectItem value="southern">Southern</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="region" className="text-white/90">
                                Region
                              </Label>
                              <Input
                                id="region"
                                placeholder="Enter region"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="league" className="text-white/90">
                              League
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select league" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="premier">Women's Premier League</SelectItem>
                                <SelectItem value="division1">Division One</SelectItem>
                                <SelectItem value="division2">Division Two</SelectItem>
                                <SelectItem value="regional">Regional League</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="gfaNumber" className="text-white/90">
                              GFA Affiliation Number
                            </Label>
                            <Input
                              id="gfaNumber"
                              placeholder="Enter GFA affiliation number"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Login Credentials */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Login Credentials</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="username" className="text-white/90">
                              Username
                            </Label>
                            <Input
                              id="username"
                              placeholder="Choose a username"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="password" className="text-white/90">
                              Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-background hover:text-white hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="confirmPassword" className="text-white/90">
                              Confirm Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-background hover:text-white hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Contact Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Contact Person</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fullName" className="text-white/90">
                              Full Name
                            </Label>
                            <Input
                              id="fullName"
                              placeholder="Enter full name"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="role" className="text-white/90">
                              Role
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Club Admin</SelectItem>
                                <SelectItem value="welfare">Welfare Officer</SelectItem>
                                <SelectItem value="coach">Coach</SelectItem>
                                <SelectItem value="official">GFA Official</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="nationality" className="text-white/90">
                                Nationality
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Select nationality" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ghana">Ghana</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="gender" className="text-white/90">
                                Gender
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-white/90">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              placeholder="Enter phone number"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-white/90">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter email address"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="address" className="text-white/90">
                              Address
                            </Label>
                            <Textarea
                              id="address"
                              placeholder="Enter full address"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Uploads */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Upload className="mr-2 h-5 w-5 text-chart-3" />
                      Document Uploads
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="clubCert" className="text-white/90">
                          Club Registration Certificate
                        </Label>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-lg hover:border-primary/50 transition-colors">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-white/40" />
                            <div className="flex text-sm text-background">
                              <label
                                htmlFor="clubCert"
                                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="clubCert"
                                  name="clubCert"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-white/50">PDF, PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="gfaId" className="text-white/90">
                          GFA Official ID
                        </Label>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-lg hover:border-primary/50 transition-colors">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-white/40" />
                            <div className="flex text-sm text-background">
                              <label
                                htmlFor="gfaId"
                                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="gfaId"
                                  name="gfaId"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-white/50">PDF, PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      onClick={() => handleRegisterClick("club")}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Register Club / GFA Official Account - $ 2,000
                    </Button>
                    <p className="text-center text-sm text-white/60 mt-4">
                      By registering, you agree to our Terms of Service and Privacy Policy.
                      <span className="text-chart-3"> Your data is secure and confidential.</span>
                    </p>
                  </div>
                </TabsContent>

                {/* Agent Registration - Placeholder */}
                <TabsContent value="agent" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Personal & Contact Information */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-background mb-4 flex items-center">
                          <UserCheck className="mr-2 h-5 w-5 text-primary" />
                          Personal Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="agentFullName" className="text-white/90">
                              Full Name
                            </Label>
                            <Input
                              id="agentFullName"
                              placeholder="Enter your full name"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="agentNationality" className="text-white/90">
                                Nationality
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Select nationality" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ghana">Ghana</SelectItem>
                                  <SelectItem value="nigeria">Nigeria</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="agentGender" className="text-white/90">
                                Gender
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="agentDob" className="text-white/90">
                              Date of Birth
                            </Label>
                            <Input
                              id="agentDob"
                              type="date"
                              className="bg-white/10 border-white/20 text-white focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Contact Details</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="agentPhone" className="text-white/90">
                              Phone Number
                            </Label>
                            <Input
                              id="agentPhone"
                              placeholder="Enter phone number"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="agentEmail" className="text-white/90">
                              Email Address
                            </Label>
                            <Input
                              id="agentEmail"
                              type="email"
                              placeholder="Enter email address"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="agentAddress" className="text-white/90">
                              Address
                            </Label>
                            <Textarea
                              id="agentAddress"
                              placeholder="Enter full address"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Login Credentials */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Login Credentials</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="agentUsername" className="text-white/90">
                              Username
                            </Label>
                            <Input
                              id="agentUsername"
                              placeholder="Choose a username"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="agentPassword" className="text-white/90">
                              Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="agentPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-background hover:text-white hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="agentConfirmPassword" className="text-white/90">
                              Confirm Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="agentConfirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-background hover:text-white hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Professional Information */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Professional Information</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="agentLicense" className="text-white/90">
                              FIFA / GFA Agent License Number
                            </Label>
                            <Input
                              id="agentLicense"
                              placeholder="Enter license number"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="agentExperience" className="text-white/90">
                              Years of Experience
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-1">0-1 years</SelectItem>
                                <SelectItem value="2-5">2-5 years</SelectItem>
                                <SelectItem value="6-10">6-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="playersRepresented" className="text-white/90">
                              Players Represented
                            </Label>
                            <Textarea
                              id="playersRepresented"
                              placeholder="List current players you represent (optional)"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary resize-none"
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Document Uploads */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <Upload className="mr-2 h-5 w-5 text-chart-3" />
                          Document Uploads
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="agentLicenseCopy" className="text-white/90">
                              Copy of Agent License
                            </Label>
                            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-lg hover:border-primary/50 transition-colors">
                              <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-white/40" />
                                <div className="flex text-sm text-background">
                                  <label
                                    htmlFor="agentLicenseCopy"
                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="agentLicenseCopy"
                                      name="agentLicenseCopy"
                                      type="file"
                                      className="sr-only"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-white/50">PDF, PNG, JPG up to 10MB</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="agentId" className="text-white/90">
                              National ID / Passport
                            </Label>
                            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-lg hover:border-primary/50 transition-colors">
                              <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-white/40" />
                                <div className="flex text-sm text-background">
                                  <label
                                    htmlFor="agentId"
                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="agentId"
                                      name="agentId"
                                      type="file"
                                      className="sr-only"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-white/50">PDF, PNG, JPG up to 10MB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      onClick={() => handleRegisterClick("agent")}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Register Agent Account - $ 1,000
                    </Button>
                    <p className="text-center text-sm text-white/60 mt-4">
                      By registering, you agree to our Terms of Service and Privacy Policy.
                      <span className="text-chart-3"> Your data is secure and confidential.</span>
                    </p>
                  </div>
                </TabsContent>

                {/* Scout Registration - Placeholder */}
                <TabsContent value="scout" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Personal & Contact Information */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-background mb-4 flex items-center">
                          <Search className="mr-2 h-5 w-5 text-primary" />
                          Personal Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="scoutFullName" className="text-white/90">
                              Full Name
                            </Label>
                            <Input
                              id="scoutFullName"
                              placeholder="Enter your full name"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="scoutNationality" className="text-white/90">
                                Nationality
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Select nationality" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ghana">Ghana</SelectItem>
                                  <SelectItem value="nigeria">Nigeria</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="scoutGender" className="text-white/90">
                                Gender
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="scoutDob" className="text-white/90">
                              Date of Birth
                            </Label>
                            <Input
                              id="scoutDob"
                              type="date"
                              className="bg-white/10 border-white/20 text-white focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Contact Details</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="scoutPhone" className="text-white/90">
                              Phone Number
                            </Label>
                            <Input
                              id="scoutPhone"
                              placeholder="Enter phone number"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="scoutEmail" className="text-white/90">
                              Email Address
                            </Label>
                            <Input
                              id="scoutEmail"
                              type="email"
                              placeholder="Enter email address"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="scoutAddress" className="text-white/90">
                              Address
                            </Label>
                            <Textarea
                              id="scoutAddress"
                              placeholder="Enter full address"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Login Credentials */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Login Credentials</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="scoutUsername" className="text-white/90">
                              Username
                            </Label>
                            <Input
                              id="scoutUsername"
                              placeholder="Choose a username"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="scoutPassword" className="text-white/90">
                              Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="scoutPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-background hover:text-white hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="scoutConfirmPassword" className="text-white/90">
                              Confirm Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="scoutConfirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-background hover:text-white hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Scouting Information */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Scouting Information</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="scoutAffiliation" className="text-white/90">
                              Club / Academy Affiliation (if any)
                            </Label>
                            <Input
                              id="scoutAffiliation"
                              placeholder="Enter club or academy name (optional)"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                            />
                          </div>

                          <div>
                            <Label htmlFor="scoutRegions" className="text-white/90">
                              Regions Covered
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select regions you cover" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="greater-accra">Greater Accra</SelectItem>
                                <SelectItem value="ashanti">Ashanti</SelectItem>
                                <SelectItem value="western">Western</SelectItem>
                                <SelectItem value="central">Central</SelectItem>
                                <SelectItem value="eastern">Eastern</SelectItem>
                                <SelectItem value="volta">Volta</SelectItem>
                                <SelectItem value="northern">Northern</SelectItem>
                                <SelectItem value="upper-east">Upper East</SelectItem>
                                <SelectItem value="upper-west">Upper West</SelectItem>
                                <SelectItem value="brong-ahafo">Brong Ahafo</SelectItem>
                                <SelectItem value="nationwide">Nationwide</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="scoutExperience" className="text-white/90">
                              Experience Level
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Document Uploads */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <Upload className="mr-2 h-5 w-5 text-chart-3" />
                          Document Uploads
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="scoutCv" className="text-white/90">
                              CV / Resume
                            </Label>
                            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-lg hover:border-primary/50 transition-colors">
                              <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-white/40" />
                                <div className="flex text-sm text-background">
                                  <label
                                    htmlFor="scoutCv"
                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="scoutCv"
                                      name="scoutCv"
                                      type="file"
                                      className="sr-only"
                                      accept=".pdf,.doc,.docx"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-white/50">PDF, DOC, DOCX up to 10MB</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="scoutId" className="text-white/90">
                              National ID
                            </Label>
                            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-lg hover:border-primary/50 transition-colors">
                              <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-white/40" />
                                <div className="flex text-sm text-background">
                                  <label
                                    htmlFor="scoutId"
                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="scoutId"
                                      name="scoutId"
                                      type="file"
                                      className="sr-only"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-white/50">PDF, PNG, JPG up to 10MB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      onClick={() => handleRegisterClick("scout")}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Register Scout Account - $ 1,000
                    </Button>
                    <p className="text-center text-sm text-white/60 mt-4">
                      By registering, you agree to our Terms of Service and Privacy Policy.
                      <span className="text-chart-3"> Your data is secure and confidential.</span>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-background">
              Already have an account?{" "}
              <Link href="/register-login" className="text-primary hover:text-primary/80 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-transparent backdrop-blur-lg border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-xl">
              <CreditCard className="h-6 w-6 text-secondary/80" />
              <span>Confirm Payment</span>
            </DialogTitle>
            <DialogDescription className="text-background">
              Complete your registration by confirming the payment details below.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-background">Registration Type:</span>
                <span className="font-semibold text-white capitalize">
                  {registrationFees[registrationType as keyof typeof registrationFees]?.description}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-background">Amount:</span>
                <span className="text-2xl font-bold text-secondary/80">
                  {registrationFees[registrationType as keyof typeof registrationFees]?.currency}{" "}
                  {registrationFees[registrationType as keyof typeof registrationFees]?.amount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-background">Processing Fee:</span>
                <span className="text-white">Excluded</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-200 font-medium mb-1">Payment Information</p>
                  <p className="text-xs text-blue-200/80">
                    You would be redirected to a secure payment gateway to complete
                    your transaction using Mobile Money, Bank Transfer, or Card Payment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
              className="border-white/30 text-white bg-white/10 cursor-pointer hover:bg-background/40"
            >
              Cancel
            </Button>
            <Button onClick={handlePaymentConfirm} className="bg-secondary/80 hover:bg-secondary cursor-pointer text-white">
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-transparent backdrop-blur-lg text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-xl text-secondary/80">
              <CheckCircle className="h-6 w-6" />
              <span>Registration Successful!</span>
            </DialogTitle>
          </DialogHeader>

          <div className="py-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secondary/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-secondary/80" />
              </div>
              <h3 className="text-lg font-semibold text-background mb-2">Payment Confirmed</h3>
              <p className="text-background mb-4">
                Your registration has been submitted successfully and payment has been processed.
              </p>
            </div>

            <div className="bg-white/10 border rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-background flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-background font-medium mb-1">Under Review</p>
                  <p className="text-xs text-background/80">
                    Your registration is now under review by the Ghana Football Association. You will receive an email
                    notification once your application has been approved.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <h4 className="font-medium text-white mb-2">What's Next?</h4>
              <ul className="text-sm text-background space-y-1">
                <li>• GFA will review your application within 3-5 business days</li>
                <li>• You'll receive email updates on your application status</li>
                <li>• Once approved, you can access your dashboard</li>
                <li>• Keep your registration details safe for future reference</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setShowSuccessModal(false)
                router.push("/")
            }}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Continue to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
