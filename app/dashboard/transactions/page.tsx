import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Download, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-gray-500">Manage payments, invoices, and financial operations</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/transactions/new-payment">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> New Payment
            </Button>
          </Link>
          <Link href="/dashboard/transactions/new-policy">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> New Policy
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$245,679.00</div>
              <p className="text-xs text-gray-500">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
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
                className="h-4 w-4 text-gray-500"
              >
                <path d="M16 2v5h5" />
                <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V7l-7 7-4-4-6 6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$18,245.00</div>
              <p className="text-xs text-gray-500">23 pending invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
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
                className="h-4 w-4 text-gray-500"
              >
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,780.00</div>
              <p className="text-xs text-red-500">8 overdue invoices</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search transactions..." className="w-full pl-8 py-2" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
                <SelectItem value="invoice">Invoices</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 text-sm font-medium text-gray-500">Transaction ID</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-500">Client</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-500">Policy</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-500">Amount</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 text-sm">TRX-78945</td>
                        <td className="p-4 text-sm">Robert Wilson</td>
                        <td className="p-4 text-sm">Auto Insurance (A-78945)</td>
                        <td className="p-4 text-sm">Apr 10, 2025</td>
                        <td className="p-4 text-sm font-medium">$1,200.00</td>
                        <td className="p-4 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 text-sm">TRX-78946</td>
                        <td className="p-4 text-sm">Jennifer Adams</td>
                        <td className="p-4 text-sm">Home Insurance (H-12378)</td>
                        <td className="p-4 text-sm">Apr 8, 2025</td>
                        <td className="p-4 text-sm font-medium">$2,450.00</td>
                        <td className="p-4 text-sm">
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 text-sm">TRX-78947</td>
                        <td className="p-4 text-sm">David Thompson</td>
                        <td className="p-4 text-sm">Life Insurance (L-45612)</td>
                        <td className="p-4 text-sm">Apr 5, 2025</td>
                        <td className="p-4 text-sm font-medium">$3,800.00</td>
                        <td className="p-4 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 text-sm">TRX-78948</td>
                        <td className="p-4 text-sm">Sarah Wilson</td>
                        <td className="p-4 text-sm">Health Insurance (H-34567)</td>
                        <td className="p-4 text-sm">Apr 3, 2025</td>
                        <td className="p-4 text-sm font-medium">$1,850.00</td>
                        <td className="p-4 text-sm">
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            Failed
                          </span>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Retry
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-sm">TRX-78949</td>
                        <td className="p-4 text-sm">Michael Brown</td>
                        <td className="p-4 text-sm">Business Insurance (B-23456)</td>
                        <td className="p-4 text-sm">Apr 1, 2025</td>
                        <td className="p-4 text-sm font-medium">$5,200.00</td>
                        <td className="p-4 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <p>Payments content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="invoices" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <p>Invoices content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="refunds" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <p>Refunds content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

