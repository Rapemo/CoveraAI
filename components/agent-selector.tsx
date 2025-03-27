"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, Clock } from "lucide-react"

interface Agent {
  id: string
  name: string
  role: string
  specialty: string
  status: "available" | "busy" | "offline"
  avatar: string
  rating: number
}

interface AgentSelectorProps {
  onAgentSelect: (agentId: string | null) => void
  selectedAgent: string | null
}

export function AgentSelector({ onAgentSelect, selectedAgent }: AgentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const agents: Agent[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Agent",
      specialty: "Auto Insurance",
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Claims Specialist",
      specialty: "Home Insurance",
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    {
      id: "3",
      name: "Jessica Williams",
      role: "Policy Advisor",
      specialty: "Life Insurance",
      status: "busy",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    {
      id: "4",
      name: "David Rodriguez",
      role: "Client Manager",
      specialty: "Business Insurance",
      status: "offline",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    {
      id: "5",
      name: "Emily Taylor",
      role: "Onboarding Specialist",
      specialty: "New Clients",
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
  ]

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const availableAgents = filteredAgents.filter((agent) => agent.status === "available")
  const busyAgents = filteredAgents.filter((agent) => agent.status === "busy")
  const offlineAgents = filteredAgents.filter((agent) => agent.status === "offline")

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select Agent</h2>
      <p className="text-sm text-gray-500">Assign an agent to handle this client's transactions</p>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search agents..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="available">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="busy">Busy</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="space-y-2 pt-2">
          {availableAgents.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No available agents found</p>
          ) : (
            availableAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent === agent.id}
                onSelect={() => onAgentSelect(agent.id)}
              />
            ))
          )}
        </TabsContent>
        <TabsContent value="busy" className="space-y-2 pt-2">
          {busyAgents.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No busy agents found</p>
          ) : (
            busyAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent === agent.id}
                onSelect={() => onAgentSelect(agent.id)}
              />
            ))
          )}
        </TabsContent>
        <TabsContent value="all" className="space-y-2 pt-2">
          {filteredAgents.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No agents found</p>
          ) : (
            filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent === agent.id}
                onSelect={() => onAgentSelect(agent.id)}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {selectedAgent && (
        <div className="pt-4">
          <Button className="w-full bg-orange-500 hover:bg-orange-600">Assign Agent</Button>
        </div>
      )}
    </div>
  )
}

interface AgentCardProps {
  agent: Agent
  isSelected: boolean
  onSelect: () => void
}

function AgentCard({ agent, isSelected, onSelect }: AgentCardProps) {
  const statusColor =
    agent.status === "available" ? "bg-green-500" : agent.status === "busy" ? "bg-yellow-500" : "bg-gray-400"

  return (
    <Card
      className={`cursor-pointer transition-all ${isSelected ? "border-orange-500 ring-1 ring-orange-500" : ""}`}
      onClick={onSelect}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="h-10 w-10 rounded-full" />
            <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ${statusColor} ring-1 ring-white`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{agent.name}</p>
            <p className="text-xs text-gray-500 truncate">{agent.role}</p>
            <div className="flex items-center mt-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs ml-1">{agent.rating}</span>
              <span className="text-xs text-gray-500 ml-2">{agent.specialty}</span>
            </div>
          </div>
          {agent.status === "busy" && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>~15m</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

