"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { Transfer } from "@/lib/types"

interface TransferStatisticsProps {
  transfers: Transfer[]
}

export function TransferStatistics({ transfers }: TransferStatisticsProps) {
  // Status distribution
  const statusData = [
    { name: "Submitted", value: transfers.filter((t) => t.status === "submitted").length, color: "#FFD600" },
    { name: "Under Review", value: transfers.filter((t) => t.status === "under_review").length, color: "#D50000" },
    { name: "Approved", value: transfers.filter((t) => t.status === "approved").length, color: "#4CAF50" },
    { name: "Rejected", value: transfers.filter((t) => t.status === "rejected").length, color: "#FF5252" },
  ]

  // Transfer type distribution
  const typeData = [
    { name: "Permanent", value: transfers.filter((t) => t.type === "permanent").length },
    { name: "Loan", value: transfers.filter((t) => t.type === "loan").length },
    { name: "Free Agent", value: transfers.filter((t) => t.type === "free_agent").length },
  ]

  // Monthly transfer trends (mock data)
  const monthlyData = [
    { month: "Jan", transfers: 12 },
    { month: "Feb", transfers: 8 },
    { month: "Mar", transfers: 15 },
    { month: "Apr", transfers: 22 },
    { month: "May", transfers: 18 },
    { month: "Jun", transfers: 25 },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Transfer Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transfer Types</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#D50000" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Transfer Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="transfers" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
