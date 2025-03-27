import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-16 items-center border-b px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold">Covera AI</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-500">Enter your information to get started</p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Smith" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="name@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Your Insurance Agency" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600">Create Account</Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

