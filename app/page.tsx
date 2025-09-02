"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Users, Heart, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SeasonCountdown from "@/components/season-countdown"


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

// Mock data for clubs
const featuredClubs = [
  {
    id: "1",
    name: "Ampem Darkoa Ladies F.C.",
    logo: "/clubs/ampem-darkoa.png",
    zone: "Northern",
    region: "Bono East",
    founded: 2009,
    description:
      "One of Ghana's most successful women's football clubs, known for developing young talent and competing at the highest level.",
    stadium: "Techiman Park",
    coach: "Joe Nana Adarkwa",
    achievements: ["Ghana Women's Premier League Champions 2021", "WAFU Zone B Champions 2022"],
  },
  {
    id: "2",
    name: "Hasaacas Ladies",
    logo: "/clubs/hasaacas.jpeg",
    zone: "Southern",
    region: "Western",
    founded: 2003,
    description:
      "The most decorated women's football club in Ghana with multiple league titles and continental success.",
    stadium: "Gyandu Park",
    coach: "Yusif Basigi",
    achievements: ["CAF Women's Champions League Runners-up 2021", "Multiple Ghana Premier League titles"],
  },
  {
    id: "3",
    name: "Faith Ladies F.C.",
    logo: "/clubs/faith-ladies.png",
    zone: "Southern",
    region: "Greater Accra",
    founded: 2021,
    description: "A rising force in Ghana women's football, focused on youth development and modern training methods.",
    stadium: "McDan La Town Park",
    coach: "Samuel Boadu",
    achievements: ["Ghana Women's FA Cup Finalists 2023"],
  },
  {
    id: "4",
    name: "Pearl Pia Ladies F.C.",
    logo: "/clubs/pearlpia.jpeg",
    zone: "Northern",
    region: "Northern",
    founded: 2015,
    description: "A club with a strong community presence and competitive spirit.",
    stadium: "Pia Stadium",
    coach: "Jane Doe",
    achievements: ["Ghana Women's Premier League Runner-up 2022"],
  },
  {
    id: "5",
    name: "Thunder Queens F.C.",
    logo: "/clubs/thunder-queens.jpeg",
    zone: "Southern",
    region: "Greater Accra",
    founded: 2010,
    description: "A club known for its aggressive playing style and passionate fans.",
    stadium: "Thunder Park",
    coach: "John Smith",
    achievements: ["WAFU Zone A Champions 2020"],
  },
  {
    id: "6",
    name: "Dreamz Ladies F.C.",
    // logo: "/clubs/thunder-queens.jpeg",
    zone: "Northern",
    region: "Ashanti",
    founded: 2020,
    description: "A club that emphasizes creativity and skill in its approach to football.",
    stadium: "Dreamz Stadium",
    coach: "Emily Johnson",
    achievements: ["Ghana Women's Premier League Finalists 2021"],
  },
  {
    id: "7",
    name: "Soccer Intellectuals Ladies F.C.",
    logo: "/clubs/soccer-intellectuals.png",
    zone: "Southern",
    region: "Central",
    founded: 2012,
    description: "A club that values education and sportsmanship alongside football.",
    stadium: "Intellectuals Park",
    coach: "Michael Brown",
    achievements: ["Ghana Women's FA Cup Winners 2019"],
  },
  {
    id: "8",
    name: "Berry Ladies F.C.",
    logo: "/clubs/berry-ladies.jpeg",
    zone: "Southern",
    region: "Greater Accra",
    founded: 2018,
    description: "A club that has been steadily improving and gaining recognition.",
    stadium: "Berry Park",
    coach: "Sarah White",
    achievements: ["Ghana Women's Premier League Semi-Finalists 2022"],
  },
]

// Mock news data
const latestNews = [
  {
    id: 1,
    title: "Ghana Women's Premier League Season Kicks Off",
    excerpt: "The new season promises exciting matches with enhanced player support systems.",
    date: "2025-01-15",
    image: "/news/season-kickoff.png",
    category: "League",
  },
  {
    id: 2,
    title: "New Transfer Window Opens with Digital Platform",
    excerpt: "Streamlined digital processes make transfers more efficient for all clubs.",
    date: "2025-01-10",
    image: "/news/transfer-window.png",
    category: "Transfers",
  },
  {
    id: 3,
    title: "Player Wellbeing Initiative Launched",
    excerpt: "Comprehensive support system for menstrual health and player welfare introduced.",
    date: "2025-01-08",
    image: "/news/wellbeing.png",
    category: "Wellbeing",
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
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/public-players" className="text-white/80 hover:text-white transition-colors">
                Players
              </Link>
              <Link href="/public-clubs" className="text-white/80 hover:text-white transition-colors">
                Clubs
              </Link>
              <Link href="/public-tables" className="text-white/80 hover:text-white transition-colors">
                Tables
              </Link>
              <Link href="https://www.ghanafa.org/category/news" className="text-white/80 hover:text-white transition-colors">
              {/* <Link href="/public-news" className="text-white/80 hover:text-white transition-colors"> */}
                News
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                <Link className="text-lg" href="/login">
                  Make Transfer
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link className="text-lg" href="/player-login">
                  Player Support
                </Link>
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
                    Menstrual Health & Player Support
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Season Countdown Banner */}
          <div className="mb-20 max-w-6xl mx-auto">
            <SeasonCountdown />
          </div>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Our Clubs</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {featuredClubs.map((club) => (
                <Link key={club.id} href={`/public-clubs/${club.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 bg-black/40 backdrop-blur-md border-white/10 hover:border-primary/40 hover:scale-105">
                    <CardContent className="p-2 text-center">
                      <div className="mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300">
                        <div className="rounded-full flex items-center justify-center">
                          <Avatar className="size-34">
                            <AvatarImage src={club.logo} alt={`${club.name} logo`} />
                            <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link href="/public-clubs">
                  View All Clubs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Latest News</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {latestNews.map((article) => (
                <Link key={article.id} href={`/public-news/${article.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 bg-black/40 backdrop-blur-md border-white/10 hover:border-primary/40 hover:scale-105 h-full">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-white/60">{article.date}</span>
                        </div>
                        <h3 className="font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">{article.excerpt}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link href="/public-news">
                  View All News
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70 text-lg">© 2025 Ghana Women Football Association.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
