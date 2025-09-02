"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

// Mock club data with more details
const clubs = [
  {
    id: 1,
    name: "Ampem Darkoa Ladies",
    zone: "Northern",
    region: "Ashanti",
    founded: 2015,
    stadium: "Techiman Park",
    location: "Techiman",
    position: 1,
    description: "Champions of Ghana Women's Premier League",
    achievements: ["GWPL Champions 2023", "FA Cup Winners 2022"],
    colors: ["Red", "White"],
  },
  {
    id: 2,
    name: "Hasaacas Ladies",
    zone: "Southern",
    region: "Western",
    founded: 2003,
    stadium: "Gyandu Park",
    location: "Sekondi-Takoradi",
    position: 2,
    description: "CAF Women's Champions League representatives",
    achievements: ["CAF Champions League Runners-up 2021", "GWPL Champions 2021"],
    colors: ["Yellow", "Blue"],
  },
  {
    id: 3,
    name: "Faith Ladies",
    zone: "Southern",
    region: "Greater Accra",
    founded: 2010,
    stadium: "McDan Park",
    location: "Accra",
    position: 3,
    description: "Rising stars of Ghana women's football",
    achievements: ["GWPL Top 4 Finish 2023"],
    colors: ["Green", "White"],
  },
  {
    id: 4,
    name: "Northern Ladies",
    zone: "Northern",
    region: "Northern",
    founded: 2012,
    stadium: "Aliu Mahama Stadium",
    location: "Tamale",
    position: 4,
    description: "Pride of Northern Ghana football",
    achievements: ["Northern Zone Champions 2022"],
    colors: ["Blue", "White"],
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
          <p className="text-xl text-white/90">Meet the powerhouse clubs of Ghana's women's football</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club) => (
            <Link key={club.id} href={`/public-clubs/${club.id}`}>
              <Card
                className={`group hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 ${
                  club.position === 1
                    ? "ring-2 ring-yellow-400"
                    : club.position === 2
                      ? "ring-2 ring-gray-400"
                      : club.position === 3
                        ? "ring-2 ring-amber-600"
                        : ""
                }`}
              >
                <div
                  className={`relative h-48 ${
                    club.colors.includes("Red")
                      ? "bg-gradient-to-br from-red-500 to-red-600"
                      : club.colors.includes("Yellow")
                        ? "bg-gradient-to-br from-yellow-500 to-blue-600"
                        : club.colors.includes("Green")
                          ? "bg-gradient-to-br from-green-500 to-green-600"
                          : "bg-gradient-to-br from-blue-500 to-blue-600"
                  }`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      Previous Season Position: {club.position}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {club.zone} Zone
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{club.name.split(" ")[0].charAt(0)}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{club.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{club.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{club.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Founded {club.founded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{club.stadium}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">PROFILE</span>
                      <span className="text-sm font-medium">VIEW DETAILS</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
