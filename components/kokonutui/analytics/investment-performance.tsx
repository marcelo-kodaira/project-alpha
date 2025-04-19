"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface InvestmentPerformanceProps {
  dateRange: DateRange | undefined
}

export default function InvestmentPerformance({ dateRange }: InvestmentPerformanceProps) {
  const [view, setView] = useState<"performance" | "allocation" | "returns">("performance")

  // In a real application, this data would come from an API based on the date range
  const performanceData = [
    { date: "Jan", portfolio: 10000, benchmark: 10000 },
    { date: "Feb", portfolio: 10400, benchmark: 10200 },
    { date: "Mar", portfolio: 10200, benchmark: 10100 },
    { date: "Apr", portfolio: 10600, benchmark: 10300 },
    { date: "May", portfolio: 11000, benchmark: 10500 },
    { date: "Jun", portfolio: 11200, benchmark: 10700 },
    { date: "Jul", portfolio: 11500, benchmark: 10900 },
    { date: "Aug", portfolio: 11800, benchmark: 11100 },
    { date: "Sep", portfolio: 12200, benchmark: 11300 },
    { date: "Oct", portfolio: 12500, benchmark: 11500 },
    { date: "Nov", portfolio: 12800, benchmark: 11700 },
    { date: "Dec", portfolio: 13200, benchmark: 12000 },
  ]

  const allocationData = [
    { name: "Stocks", value: 60 },
    { name: "Bonds", value: 25 },
    { name: "Cash", value: 10 },
    { name: "Real Estate", value: 5 },
  ]

  const returnsData = [
    { name: "Stocks", return: 12.5 },
    { name: "Bonds", return: 4.2 },
    { name: "Real Estate", return: 8.7 },
    { name: "Cash", return: 1.5 },
    { name: "Overall", return: 8.5 },
  ]

  // Calculate portfolio performance metrics
  const startValue = performanceData[0].portfolio
  const endValue = performanceData[performanceData.length - 1].portfolio
  const totalReturn = ((endValue - startValue) / startValue) * 100
  const benchmarkReturn =
    ((performanceData[performanceData.length - 1].benchmark - performanceData[0].benchmark) /
      performanceData[0].benchmark) *
    100
  const outperformance = totalReturn - benchmarkReturn

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Investment Performance</CardTitle>
            <CardDescription>Analysis of your investment portfolio</CardDescription>
          </div>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "performance" | "allocation" | "returns")}>
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {view === "performance" && (
              <ChartContainer
                config={{
                  portfolio: {
                    label: "Portfolio",
                    color: "hsl(var(--chart-1))",
                  },
                  benchmark: {
                    label: "Benchmark",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="portfolio"
                      stroke="var(--color-portfolio)"
                      fill="var(--color-portfolio)"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="benchmark"
                      stroke="var(--color-benchmark)"
                      fill="var(--color-benchmark)"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}

            {view === "allocation" && (
              <ChartContainer
                config={{
                  allocation: {
                    label: "Allocation",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allocationData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="value"
                      fill="var(--color-allocation)"
                      label={{ position: "right", formatter: (value: number) => `${value}%` }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}

            {view === "returns" && (
              <ChartContainer
                config={{
                  return: {
                    label: "Return %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={returnsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="return"
                      fill="var(--color-return)"
                      label={{ position: "top", formatter: (value: number) => `${value}%` }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Portfolio Performance</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total Return</span>
                <span
                  className={cn(
                    "text-lg font-medium flex items-center",
                    totalReturn >= 0 ? "text-emerald-500" : "text-red-500",
                  )}
                >
                  {totalReturn >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                  {totalReturn.toFixed(1)}%
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Benchmark Comparison</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Outperformance</span>
                <span
                  className={cn(
                    "text-lg font-medium flex items-center",
                    outperformance >= 0 ? "text-emerald-500" : "text-red-500",
                  )}
                >
                  {outperformance >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                  {outperformance.toFixed(1)}%
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Top Performing Asset</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">
                  {returnsData.reduce((max, item) => (item.return > max.return ? item : max), returnsData[0]).name}
                </span>
                <span className="text-lg font-medium text-emerald-500 flex items-center">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {returnsData
                    .reduce((max, item) => (item.return > max.return ? item : max), returnsData[0])
                    .return.toFixed(1)}
                  %
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Investment Insights</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                  >
                    Opportunity
                  </Badge>
                  <p className="text-sm">Consider increasing allocation to stocks given their strong performance.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                  >
                    Risk
                  </Badge>
                  <p className="text-sm">Your cash position may be eroding due to inflation. Consider alternatives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
