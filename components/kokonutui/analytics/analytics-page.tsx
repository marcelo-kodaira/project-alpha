"use client"

import { useState } from "react"
import Layout from "../layout"
import AnalyticsHeader from "./analytics-header"
import AnalyticsOverview from "./analytics-overview"
import ExpenseAnalysis from "./expense-analysis"
import TransactionTrends from "./transaction-trends"
import InvestmentPerformance from "./investment-performance"
import Recommendations from "./recommendations"
import type { DateRange } from "react-day-picker"
import { subMonths } from "date-fns"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 3),
    to: new Date(),
  })

  const [activeView, setActiveView] = useState<"overview" | "detailed">("overview")

  return (
    <Layout>
      <div className="space-y-6">
        <AnalyticsHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <AnalyticsOverview dateRange={dateRange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseAnalysis dateRange={dateRange} />
          <TransactionTrends dateRange={dateRange} />
        </div>

        <InvestmentPerformance dateRange={dateRange} />

        <Recommendations dateRange={dateRange} />
      </div>
    </Layout>
  )
}
