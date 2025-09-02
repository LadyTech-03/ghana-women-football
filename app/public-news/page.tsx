"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

// Mock news data
const newsArticles = [
  {
    id: 1,
    title: "Ghana Women's Premier League Season Kicks Off with Record Attendance",
    excerpt:
      "The new season promises exciting matches with enhanced player support systems and improved facilities across all participating clubs.",
    content:
      "The 2024/25 Ghana Women's Premier League season officially kicked off last weekend with record-breaking attendance figures...",
    date: "2025-01-15",
    author: "GFA Communications",
    category: "League",
    readTime: "3 min read",
    featured: true,
  },
  {
    id: 2,
    title: "New Digital Transfer Platform Streamlines Player Movements",
    excerpt:
      "Revolutionary digital processes make transfers more efficient for all clubs, reducing paperwork and processing time significantly.",
    content:
      "The Ghana Football Association has launched a state-of-the-art digital platform for managing player transfers...",
    date: "2025-01-10",
    author: "Technical Team",
    category: "Transfers",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Comprehensive Player Wellbeing Initiative Launched",
    excerpt:
      "New support system for menstrual health and player welfare represents a groundbreaking step in women's football care.",
    content:
      "In a pioneering move for African women's football, the GFA has introduced a comprehensive wellbeing program...",
    date: "2025-01-08",
    author: "Wellbeing Committee",
    category: "Wellbeing",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: 4,
    title: "Ampem Darkoa Ladies Maintain Perfect Home Record",
    excerpt: "The defending champions continue their impressive form with another commanding victory at home.",
    date: "2025-01-05",
    author: "Match Reporter",
    category: "Match Report",
    readTime: "2 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Youth Development Program Expands to Northern Regions",
    excerpt: "New grassroots initiatives aim to identify and nurture young talent across Ghana's northern territories.",
    date: "2025-01-03",
    author: "Development Team",
    category: "Development",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: 6,
    title: "International Friendly Matches Announced for National Team",
    excerpt: "Black Queens to face strong opposition in preparation for upcoming continental competitions.",
    date: "2025-01-01",
    author: "National Team Coordinator",
    category: "National Team",
    readTime: "2 min read",
    featured: false,
  },
]

const categories = ["All", "League", "Transfers", "Wellbeing", "Match Report", "Development", "National Team"]

export default function PublicNewsPage() {
  const featuredNews = newsArticles.filter((article) => article.featured)
  const regularNews = newsArticles.filter((article) => !article.featured)

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
          <h1 className="text-5xl font-bold mb-4">Latest News</h1>
          <p className="text-xl text-white/90">Stay updated with the latest developments in Ghana's women's football</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured News */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredNews.map((article) => (
              <Link key={article.id} href={`/public-news/${article.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-white/60" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </div>
                      <span>{article.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Regular News */}
        <div>
          <h2 className="text-2xl font-bold mb-6">More Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((article) => (
              <Link key={article.id} href={`/public-news/${article.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </div>
                      <span>{article.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
