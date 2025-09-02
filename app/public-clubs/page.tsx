"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Club } from "@/lib/types"
import Image from "next/image"

// Mock club data with more details
const clubs: Club[] = [
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
    // UI-only additions for public card
    previousPosition: 2 as unknown as number,
    theme: "red" as unknown as string,
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
    previousPosition: 6 as unknown as number,
    theme: "maroon" as unknown as string,
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
    previousPosition: 5 as unknown as number,
    theme: "blue" as unknown as string,
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
    previousPosition: 1 as unknown as number,
    theme: "navy" as unknown as string,
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
    previousPosition: 3 as unknown as number,
    theme: "purple" as unknown as string,
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
    previousPosition: 7 as unknown as number,
    theme: "teal" as unknown as string,
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
    previousPosition: 9 as unknown as number,
    theme: "indigo" as unknown as string,
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
    previousPosition: 4 as unknown as number,
    theme: "blue" as unknown as string,
  },
]

export default function PublicClubsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 mr-4">
              <Link href="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          <h1 className="text-5xl font-bold mb-4">Clubs</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club) => (
            <Link key={club.id} href={`/public-clubs/${club.id}`} className="block group">
              <div className="relative h-44 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                {/* Background */}
                <div className={getClubBackground(club as any)} />
                <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(120px_80px_at_10%_10%,rgba(255,255,255,0.15),transparent_60%),radial-gradient(200px_120px_at_90%_20%,rgba(255,255,255,0.12),transparent_60%)]" />

                {/* Logo */}
                <div className="absolute top-4 left-4 h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow">
                  {club.logo ? (
                    <Image src={club.logo} alt={`${club.name} logo`} width={34} height={34} className="rounded-full object-contain" />
                  ) : (
                    <span className="text-slate-700 font-extrabold">{club.name[0]}</span>
                  )}
                </div>

                {/* Text content */}
                <div className="absolute left-20 top-5 right-28 pr-2">
                  <div className="text-white text-lg font-extrabold italic tracking-tight drop-shadow-sm whitespace-nowrap">{club.name.replace(/ F\.C\.$/, "")}</div>
                  <div className="text-white/90 text-sm mt-1">Last Season Position <span className="font-semibold">{(club as any).previousPosition ?? "-"}</span></div>
                </div>

                {/* Stadium & location */}
                <div className="absolute left-6 bottom-14 text-white text-sm font-semibold">
                  {club.stadium}
                </div>
                <div className="absolute right-6 bottom-12">
                  <div className="flex items-center gap-2 text-white/95 bg-white/15 rounded-full px-2 py-1 text-sm backdrop-blur-sm">
                    <MapPin className="h-3 w-3" />
                    <span className="text-sm">{club.region}</span>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm text-white">
                  <div className="flex items-center justify-between px-5 py-3 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <span>PROFILE</span>
                      <span className="opacity-80">›</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function getClubBackground(club: any) {
  const theme = club.theme as string
  switch (theme) {
    case "maroon":
      return "absolute inset-0 bg-gradient-to-br from-[#5b0b1a] to-[#2c0710]";
    case "blue":
      return "absolute inset-0 bg-gradient-to-br from-[#1560bd] to-[#0d2b6b]";
    case "navy":
      return "absolute inset-0 bg-gradient-to-br from-[#0b3a83] to-[#0a1c45]";
    case "purple":
      return "absolute inset-0 bg-gradient-to-br from-[#5b1a83] to-[#2e0d45]";
    case "teal":
      return "absolute inset-0 bg-gradient-to-br from-[#0f766e] to-[#134e4a]";
    case "indigo":
      return "absolute inset-0 bg-gradient-to-br from-[#4338ca] to-[#1e1b4b]";
    case "red":
      return "absolute inset-0 bg-gradient-to-br from-[#d11a2a] to-[#7a0012]";
    default:
      return "absolute inset-0 bg-gradient-to-br from-primary to-accent";
  }
}
