import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">Covera AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-orange-500 hover:bg-orange-600">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Streamlined Insurance Management with <span className="text-orange-500">Covera AI</span>
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simplify client onboarding, document management, and agent collaboration with our AI-powered platform.
              </p>
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <Link href="/login">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-orange-500" />
              <span className="font-semibold">Covera AI</span>
            </div>
            <div className="text-sm text-gray-500">© 2025 Covera AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

