"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Users, Trophy, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselItems = [
	{
		icon: Users,
		title: "Empowering Women's Football",
		description:
			"Supporting the growth and development of women's football across Ghana with streamlined transfer processes.",
		image: "/ghana-women-football-team-celebrating.png",
	},
	{
		icon: Trophy,
		title: "Professional Excellence",
		description:
			"Ensuring transparent and efficient transfer management for clubs, players, and officials nationwide.",
		image: "/football-trophy-with-ghana-flag-colors.png",
	},
	{
		icon: Globe,
		title: "International Standards",
		description:
			"Meeting FIFA and CAF requirements for seamless international transfers and player movements.",
		image: "/world-map-with-football-connections.png",
	},
	{
		icon: Shield,
		title: "Secure & Compliant",
		description:
			"Advanced security measures protecting sensitive player and club information throughout the process.",
		image: "/digital-security-shield-with-football-elements.png",
	},
]

export function LoginCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
		}, 5000)

		return () => clearInterval(timer)
	}, [])

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
		)
	}

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
	}

	const currentItem = carouselItems[currentIndex]
	const Icon = currentItem.icon

	return (
		<div className="flex-1 flex flex-col items-center justify-center p-12 relative">
			{/* Background Image */}
			<div className="absolute inset-0 opacity-50">
				<img
					src={currentItem.image || "/placeholder.svg"}
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Content */}
			<div className="relative z-10 text-center space-y-8 max-w-lg">

				{/* Quote Bubble */}
				<div className="relative bg-white/95 rounded-2xl p-8 shadow-lg">
					{/* Decorative Quote Mark */}
					<div className="absolute top-2 left-6 text-primary text-6xl font-serif">
						"
					</div>

					{/* Text Content */}
					<div className="space-y-4 relative">
						<h2 className="text-3xl font-bold text-balance text-primary">
							{currentItem.title}
						</h2>
						<p className="text-lg text-foreground text-pretty leading-relaxed">
							{currentItem.description}
						</p>
					</div>

					{/* Triangle Pointer */}
					<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
						<div className="w-8 h-8 bg-white/95 rotate-45" />
					</div>
				</div>

				{/* Navigation */}
				<div className="flex items-center justify-center space-x-4 mt-12">
					{/* Dots Indicator */}
					<div className="flex space-x-2">
						{carouselItems.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`h-2 rounded-full transition-colors ${
									index === currentIndex
										? "bg-primary w-4"
										: "bg-white w-2"
								}`}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Ghana Colors Accent */}
			<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600" />
		</div>
	)
}
