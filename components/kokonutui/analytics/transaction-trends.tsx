"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface TransactionTrendsProps {
  dateRange: DateRange | undefined
}

export default function TransactionTrends({ dateRange }: TransactionTrendsProps) {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("monthly")

  // In a real application, this data would come from an API based on the date range and timeframe
  const dailyData = [
    { date: "Apr 1", income: 150, expenses: 120 },
    { date: "Apr 2", income: 200, expenses: 180 },
    { date: "Apr 3", income: 180, expenses: 150 },
    { date: "Apr 4", income: 250, expenses: 220 },
    { date: "Apr 5", income: 300, expenses: 250 },
    { date: "Apr 6", income: 200, expenses: 180 },
    { date: "Apr 7", income: 150, expenses: 130 },
    { date: "Apr 8", income: 220, expenses: 200 },
    { date: "Apr 9", income: 250, expenses: 230 },
    { date: "Apr 10", income: 300, expenses: 280 },
    { date: "Apr 11", income: 280, expenses: 250 },
    { date: "Apr 12", income: 220, expenses: 200 },
    { date: "Apr 13", income: 250, expenses: 230 },
    { date: "Apr 14", income: 300, expenses: 270 },
  ]

  const weeklyData = [
    { date: "Week 1", income: 1200, expenses: 950 },
    { date: "Week 2", income: 1500, expenses: 1200 },
    { date: "Week 3", income: 1300, expenses: 1100 },
    { date: "Week 4", income: 1700, expenses: 1400 },
    { date: "Week 5", income: 1600, expenses: 1300 },
    { date: "Week 6", income: 1800, expenses: 1500 },
    { date: "Week 7", income: 1900, expenses: 1600 },
    { date: "Week 8", income: 2000, expenses: 1700 },
    { date: "Week 9", income: 1800, expenses: 1500 },
    { date: "Week 10", income: 1700, expenses: 1400 },
    { date: "Week 11", income: 1900, expenses: 1600 },
    { date: "Week 12", income: 2100, expenses: 1800 },
  ]

  const monthlyData = [
    { date: "Jan", income: 5000, expenses: 4200 },
    { date: "Feb", income: 5500, expenses: 4500 },
    { date: "Mar", income: 5200, expenses: 4300 },
    { date: "Apr", income: 6000, expenses: 4800 },
    { date: "May", income: 5800, expenses: 4700 },
    { date: "Jun", income: 6200, expenses: 5000 },
    { date: "Jul", income: 6500, expenses: 5200 },
    { date: "Aug", income: 6300, expenses: 5100 },
    { date: "Sep", income: 6700, expenses: 5400 },
    { date: "Oct", income: 6900, expenses: 5600 },
    { date: "Nov", income: 6800, expenses: 5500 },
    { date: "Dec", income: 7200, expenses: 5800 },
  ]

  const getDataByTimeframe = () => {
    switch (timeframe) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      default:
        return monthlyData
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Transaction Trends</CardTitle>
          <CardDescription>Income vs. expenses over time</CardDescription>
        </div>
        <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as "daily" | "weekly" | "monthly")}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              income: {
                label: "Income",
                color: "hsl(var(--chart-1))",
              },
              expenses: {
                label: "Expenses",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getDataByTimeframe()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="var(--color-income)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Average Monthly Income:</span>
            <span className="font-medium">
              ${(monthlyData.reduce((sum, item) => sum + item.income, 0) / monthlyData.length).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Average Monthly Expenses:</span>
            <span className="font-medium">
              ${(monthlyData.reduce((sum, item) => sum + item.expenses, 0) / monthlyData.length).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Highest Income Month:</span>
            <span className="font-medium">
              {monthlyData.reduce((max, item) => (item.income > max.income ? item : max), monthlyData[0]).date} ($
              {monthlyData
                .reduce((max, item) => (item.income > max.income ? item : max), monthlyData[0])
                .income.toLocaleString()}
              )
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Highest Expense Month:</span>
            <span className="font-medium">
              {monthlyData.reduce((max, item) => (item.expenses > max.expenses ? item : max), monthlyData[0]).date} ($
              {monthlyData
                .reduce((max, item) => (item.expenses > max.expenses ? item : max), monthlyData[0])
                .expenses.toLocaleString()}
              )
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
