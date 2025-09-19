"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ScanFace, ArrowLeftRight, HandHelping   } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SeasonCountdown from "@/components/season-countdown"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const heroBackgrounds = [
  {
    image: "/ghana-women-football-team-celebrating.png",
    title: "Celebrating Excellence",
    // subtitle: "Ghana's women footballers achieving greatness",
  },
  {
    image: "/female-footballer-captain.png",
    title: "Leadership on the Field",
    // subtitle: "Empowering the next generation of leaders",
  },
  {
    image: "/female-footballer-striker.png",
    title: "Skill & Determination",
    // subtitle: "Showcasing world-class talent",
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
    logo: "/clubs/thunder-queens.jpeg",
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

  const words = [
    {
      text: "ShePlays",
      className: "text-6xl md:text-8xl font-bold text-background text-balance mb-4",
    },
    {
      text: "Global",
      className: "text-6xl md:text-8xl font-bold text-secondary text-balance mb-4",
    },
  ];

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
        <header className="bg-primary/60 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/gfa.png" alt="GFA Logo" width={150} height={150} />
              {/* <div>
                <h1 className="font-bold text-lg text-background">Ghana Football Association</h1>
                <p className="text-xs text-background/70">Women's Football Management</p>
              </div> */}
            </div>
            <nav className="text-sm sm:text-md hidden md:flex items-center space-x-6">
              <Link href="/public-players" className="text-background hover:text-background transition-colors">
                Players
              </Link>
              <Link href="/public-clubs" className="text-background hover:text-background transition-colors">
                Clubs
              </Link>
              <Link href="/public-tables" className="text-background hover:text-background transition-colors">
                Tables
              </Link>
              <Link href="/fixtures" className="text-background hover:text-background transition-colors">
                Fixtures
              </Link>
              <a
                href="https://ghanafa.org/category/womens-football/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background hover:text-background transition-colors"
              >
                News
              </a>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-background hover:bg-white/10">
                <Link className="text-lg" href="/login">
                  Make Transfer
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-white/20 text-background hover:bg-white/10 bg-transparent">
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
                  <TypewriterEffectSmooth className="text-center" words={words} />
              <h1 className="text-6xl md:text-8xl font-bold text-background text-balance mb-4 mx-auto">
                {/* <span className="leading-none">ShePlays Global</span> */}

                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-xl md:text-2xl uppercase tracking-widest">
                  Transfer Her As A Pro
                </span>
              </h1>
              <div className="text-lg text-background/80 font-medium mb-2">{heroBackgrounds[currentBg].title}</div>
              {/* <div className="text-sm text-background/60">{heroBackgrounds[currentBg].subtitle}</div> */}
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
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            {/* Transfer Management Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-chart-3/40 bg-black/40 backdrop-blur-md border-white/10 hover:scale-105">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-accent/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <ArrowLeftRight className="h-8 w-8 text-background" />
                      </div>
                      <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-background">1</span>
                      </div>
                    </div>
                  <div>
                    <h3 className="text-xl font-bold text-background">Transfer Management</h3>
                    <p className="text-background/70 text-sm">For Clubs & Officials</p>
                  </div>
                </div>
                <p className="text-background mb-6 text-sm leading-relaxed">
                  Manage player transfers, review documentation, and streamline the approval process for Ghana's women's
                  football ecosystem.
                </p>
                <Button 
                  asChild 
                  size="lg"
                  className="w-full group/btn mt-auto bg-primary/90 hover:bg-primary text-background font-medium tracking-wide transition-all duration-300"
                >
                  <Link href="/login" className="flex items-center justify-center py-6">
                    Transfer System
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Player Support Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 bg-black/40 backdrop-blur-md border-white/10 hover:scale-105">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/70 to-accent/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <HandHelping className="h-8 w-8 text-background" />
                      </div>
                      <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-green-900">2</span>
                      </div>
                    </div>
                  <div>
                    <h3 className="text-xl font-bold text-background">Player Support</h3>
                    <p className="text-background/70 text-sm">Menstrual Health & Wellbeing</p>
                  </div>
                </div>
                <p className="text-background mb-6 text-sm leading-relaxed">
                  Confidential support system for menstrual health resources, medical assistance, and comprehensive
                  wellbeing support for female players.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full group/btn mt-auto bg-accent/90 hover:bg-accent text-background font-medium tracking-wide transition-all duration-300"
                >
                  <Link href="/player-login" className="flex items-center justify-center py-6">
                    Player Support
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Registration Portal Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-chart-3/40 bg-black/40 backdrop-blur-md border-white/10 hover:scale-105">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-accent/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <ScanFace className="h-8 w-8 text-background" />
                      </div>
                      <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-yellow-900">3</span>
                      </div>
                    </div>
                  <div>
                    <h3 className="text-xl font-bold text-background">Registration Nexus</h3>
                    <p className="text-background/70 text-sm">Clubs, Agents & Scouts</p>
                  </div>
                </div>
                <p className="text-background mb-6 text-sm leading-relaxed">
                  Register as a club official, agent, or scout to access the Ghana women's football ecosystem and manage
                  your profile.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full group/btn mt-auto bg-primary/90 hover:bg-primary text-background font-medium tracking-wide transition-all duration-300"
                >
                  <Link href="/register" className="flex items-center justify-center py-6">
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
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
              <h2 className="text-3xl sm:text-5xl font-bold text-background mb-4">Our Clubs</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {featuredClubs.map((club) => (
                <Link key={club.id} href={`/public-clubs/${club.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 bg-black/40 backdrop-blur-md border-white/10 hover:border-primary/40 hover:scale-105">
                    <CardContent className="p-2 text-center">
                      <div className="mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300">
                        <div className="rounded-full flex items-center justify-center">
                          <Avatar className="size-34">
                            <AvatarImage src={club.logo || "/placeholder.svg"} alt={`${club.name} logo`} />
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
              <Button asChild variant="outline" className="border-white/20 text-background hover:bg-white/10 bg-transparent">
                <Link href="/public-clubs">
                  View All Clubs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold text-background mb-4">Latest News</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {latestNews.map((article) => (
                <Link key={article.id} href={`/public-news/${article.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 bg-black/40 backdrop-blur-md border-white/10 hover:border-primary/40 hover:scale-105 h-full">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs bg-secondary/20 text-background px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-background/60">{article.date}</span>
                        </div>
                        <h3 className="font-bold text-background mb-3 group-hover:text-secondary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-background text-sm leading-relaxed">{article.excerpt}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-white/20 text-background hover:bg-white/10 bg-transparent">
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
            <p className="text-background/70 text-lg">© 2025 ShePlays Global</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
