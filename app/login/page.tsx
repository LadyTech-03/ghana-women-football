import { ModernLoginForm } from "@/components/auth/modern-login-form"
import { LoginCarousel } from "@/components/auth/login-carousel"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <ModernLoginForm />
        </div>
      </div>

      {/* Right side - Carousel (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <LoginCarousel />
      </div>
    </div>
  )
}
