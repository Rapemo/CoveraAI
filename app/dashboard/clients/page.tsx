"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardShell } from "@/components/dashboard-shell"
import { AgentSelector } from "@/components/agent-selector"
import { Eye, MoreHorizontal, Plus, Search, FileText, Edit, Trash2 } from "lucide-react"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: "Active" | "Pending" | "Inactive"
  policies: number
  dateAdded: string
}

export default function ClientsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const clients: Client[] = [
    {
      id: "1",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      phone: "(123) 456-7890",
      address: "123 Main St, New York, NY 10001",
      status: "Active",
      policies: 2,
      dateAdded: "Apr 10, 2025",
    },
    {
      id: "2",
      name: "Jennifer Adams",
      email: "jennifer.adams@example.com",
      phone: "(234) 567-8901",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      status: "Active",
      policies: 1,
      dateAdded: "Apr 8, 2025",
    },
    {
      id: "3",
      name: "David Thompson",
      email: "david.thompson@example.com",
      phone: "(345) 678-9012",
      address: "789 Pine St, Chicago, IL 60007",
      status: "Pending",
      policies: 0,
      dateAdded: "Apr 12, 2025",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "(456) 789-0123",
      address: "321 Elm St, Houston, TX 77001",
      status: "Active",
      policies: 3,
      dateAdded: "Apr 5, 2025",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "(567) 890-1234",
      address: "654 Maple Ave, Miami, FL 33101",
      status: "Inactive",
      policies: 1,
      dateAdded: "Mar 20, 2025",
    },
  ]

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery),
  )

  const getStatusColor = (status: Client["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardShell>
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
              <p className="text-gray-500">Manage your client database</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Client List</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search clients..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Policies</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(client.status)}`}
                        >
                          {client.status}
                        </span>
                      </TableCell>
                      <TableCell>{client.policies}</TableCell>
                      <TableCell>{client.dateAdded}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Client</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>View Documents</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete Client</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar for agent selection */}
        <div className="hidden lg:block w-80 border-l overflow-y-auto p-4">
          <AgentSelector onAgentSelect={setSelectedAgent} selectedAgent={selectedAgent} />
        </div>
      </div>
    </DashboardShell>
  )
}

