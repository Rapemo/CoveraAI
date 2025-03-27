"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Bot,
  FileText,
  Home,
  Users,
  ClipboardList,
  Calculator,
  MessageSquare,
  Settings,
  User,
  LogOut,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Client Onboarding", href: "/dashboard/onboarding", icon: Users },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
    { name: "Quotes", href: "/dashboard/quotes", icon: Calculator },
    { name: "Claims", href: "/dashboard/claims", icon: ClipboardList },
    { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  ]

  const NavLink = ({ item }: { item: (typeof navigation)[0] }) => {
    const isActive = pathname === item.href

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-orange-50 text-orange-500" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Bot className="h-6 w-6 text-orange-500" />
                  <span>Covera AI</span>
                </Link>
              </div>
              <nav className="flex-1 overflow-auto py-4">
                <div className="grid gap-1 px-2">
                  {navigation.map((item) => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
                <div className="mt-6 px-4 py-2">
                  <h2 className="mb-2 text-xs font-semibold text-gray-500">Settings</h2>
                  <div className="grid gap-1">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </div>
                </div>
              </nav>
              <div className="border-t p-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <User className="h-4 w-4 m-auto text-gray-500" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-gray-500">Insurance Agent</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Log out</span>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Bot className="h-6 w-6 text-orange-500" />
            <span className="hidden md:inline">Covera AI</span>
          </Link>
        </div>
        <div className="flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-gray-200 bg-white pl-8 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex w-64 flex-col border-r bg-white">
          <nav className="flex-1 overflow-auto py-4">
            <div className="grid gap-1 px-2">
              {navigation.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
            <div className="mt-6 px-4 py-2">
              <h2 className="mb-2 text-xs font-semibold text-gray-500">Settings</h2>
              <div className="grid gap-1">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <User className="h-4 w-4 m-auto text-gray-500" />
              </span>
              <div>
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-gray-500">Insurance Agent</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        {children}
      </div>
    </div>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

