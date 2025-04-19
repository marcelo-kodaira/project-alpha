"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { ArrowDown, ArrowUp, DollarSign, LineChart, PiggyBank, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface AnalyticsOverviewProps {
  dateRange: DateRange | undefined
}

export default function AnalyticsOverview({ dateRange }: AnalyticsOverviewProps) {
  // In a real application, this data would come from an API based on the date range
  const overviewData = {
    totalIncome: 12500,
    totalExpenses: 8750,
    savingsRate: 30,
    netWorth: 45000,
    monthlyChange: 1250,
    monthlyChangePercentage: 2.8,
    budgetProgress: 75,
    investmentReturn: 8.5,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${overviewData.totalIncome.toLocaleString()}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              12.5%
            </span>
            <span>from previous period</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${overviewData.totalExpenses.toLocaleString()}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="flex items-center text-red-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              8.2%
            </span>
            <span>from previous period</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overviewData.savingsRate}%</div>
          <div className="mt-2">
            <Progress value={overviewData.savingsRate} className="h-2" />
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>Target: 25%</span>
            <span className="text-emerald-500">+5%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${overviewData.netWorth.toLocaleString()}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span
              className={cn(
                "flex items-center",
                overviewData.monthlyChangePercentage >= 0 ? "text-emerald-500" : "text-red-500",
              )}
            >
              {overviewData.monthlyChangePercentage >= 0 ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {Math.abs(overviewData.monthlyChangePercentage)}%
            </span>
            <span>monthly change</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
