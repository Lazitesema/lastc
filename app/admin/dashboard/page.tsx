"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const allMonthsData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 278 },
    { name: "May", value: 189 },
    { name: "Jun", value: 239 },
    { name: "Jul", value: 389 },
    { name: "Aug", value: 129 },
    { name: "Sep", value: 279 },
    { name: "Oct", value: 159 },
    { name: "Nov", value: 339 },
    { name: "Dec", value: 289 },
  ];

const recentTransactions = [
  { id: 1, user: "John Doe", type: "Deposit", amount: 1000, date: "2023-07-05" },
  { id: 2, user: "Jane Smith", type: "Withdrawal", amount: 500, date: "2023-07-04" },
  { id: 3, user: "Bob Johnson", type: "Transfer", amount: 250, date: "2023-07-03" },
  // Add more transactions as needed
]

const monthNames = [
  "All Months",
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function AdminDashboard() {
    const [selectedMonth, setSelectedMonth] = useState("All Months");
    const filteredData = selectedMonth === "All Months" ? allMonthsData : allMonthsData.filter(item => item.name === selectedMonth);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total Transactions" value="1,234" />
        <MetricCard title="Total Deposits" value="$56,789" />
        <MetricCard title="Total Withdrawals" value="$34,567" />
        <MetricCard title="Total Transfers" value="$12,345" />
        <MetricCard title="Total Fees" value="$2,345" />
        <MetricCard title="Total Users" value="890" />
        <MetricCard title="Total Fees" value="$10,456" />
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction Overview</CardTitle>
            <Select onValueChange={setSelectedMonth} defaultValue="All Months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Months" />
                </SelectTrigger>
                <SelectContent>
                    {monthNames.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent User Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

