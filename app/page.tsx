"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Users, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const heroBackgrounds = [
  {
    image: "/ghana-women-football-team-celebrating.png",
    title: "Celebrating Excellence",
    subtitle: "Ghana's women footballers achieving greatness",
  },
  {
    image: "/female-footballer-captain.png",
    title: "Leadership on the Field",
    subtitle: "Empowering the next generation of leaders",
  },
  {
    image: "/female-footballer-striker.png",
    title: "Skill & Determination",
    subtitle: "Showcasing world-class talent",
  },
]

export default function HomePage() {
  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${bg.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/gfa.png" alt="GFA Logo" width={64} height={64} />
              <div>
                <h1 className="font-bold text-lg text-white">Ghana Football Association</h1>
                <p className="text-xs text-white/70">Women's Football Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                <Link className="text-lg" href="/login">Make Transfer</Link>
              </Button>
              <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link className="text-lg" href="/player-login">Player Support</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-20">
          <div className="text-center mb-20">

            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white text-balance mb-4 leading-tight">
                GHANA WOMENS FOOTBALL
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Transfer & Support
                </span>
              </h1>
              <div className="text-lg text-white/80 font-medium mb-2">{heroBackgrounds[currentBg].title}</div>
              <div className="text-sm text-white/60">{heroBackgrounds[currentBg].subtitle}</div>
            </div>

            {/* <p className="text-xl text-white/90 text-balance max-w-3xl mx-auto mb-16 leading-relaxed">
              Streamlining transfers, supporting player wellbeing, and advancing women's football in Ghana through
              innovative digital solutions and comprehensive support systems.
            </p> */}

            <div className="flex justify-center space-x-2 mb-12">
              {heroBackgrounds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBg(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentBg ? "bg-primary scale-110" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {/* Transfer Management Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/40 bg-black/40 backdrop-blur-md border-white/10 hover:scale-105">
              <CardContent className="p-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Transfer Management</h3>
                    <p className="text-white/70">For Clubs & Officials</p>
                  </div>
                </div>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  Manage player transfers, review documentation, and streamline the approval process for Ghana's women's
                  football ecosystem with advanced digital workflows.
                </p>
                <Button asChild size="lg" className="w-full group text-lg py-6 bg-primary hover:bg-primary/90">
                  <Link href="/login">
                    Transfer System
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Player Support Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 bg-black/40 backdrop-blur-md border-white/10 hover:scale-105">
              <CardContent className="p-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 rounded-xl bg-accent/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300 group-hover:scale-110">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Player Support</h3>
                    <p className="text-white/70">Menstrual Health & Wellbeing</p>
                  </div>
                </div>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  Confidential support system for menstrual health resources, medical assistance, and comprehensive
                  wellbeing support for female players.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-full group text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Link href="/player-login">
                    Menstural Health & Player Support
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-black/40 transition-all duration-300">
              <div className="h-16 w-16 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-white">Secure & Confidential</h3>
              <p className="text-white/80 leading-relaxed">
                End-to-end encryption and role-based access ensure complete data privacy and security for all users.
              </p>
            </div>
            <div className="text-center p-8 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-black/40 transition-all duration-300">
              <div className="h-16 w-16 rounded-xl bg-accent/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-white">Multi-Role Support</h3>
              <p className="text-white/80 leading-relaxed">
                Tailored interfaces for clubs, GFA officials, and players with appropriate access levels and workflows.
              </p>
            </div>
            <div className="text-center p-8 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-black/40 transition-all duration-300">
              <div className="h-16 w-16 rounded-xl bg-secondary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-white">Player-Centered</h3>
              <p className="text-white/80 leading-relaxed">
                Comprehensive support system prioritizing player health, wellbeing, and professional development.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70 text-lg">
              © 2025 Ghana Women Football Association.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
