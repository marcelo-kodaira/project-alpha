"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Download } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { format, subMonths, subWeeks, subYears } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AnalyticsHeaderProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  activeView: "overview" | "detailed"
  onViewChange: (view: "overview" | "detailed") => void
}

export default function AnalyticsHeader({
  dateRange,
  onDateRangeChange,
  activeView,
  onViewChange,
}: AnalyticsHeaderProps) {
  const handleQuickDateSelect = (option: string) => {
    const now = new Date()
    let from: Date

    switch (option) {
      case "1w":
        from = subWeeks(now, 1)
        break
      case "1m":
        from = subMonths(now, 1)
        break
      case "3m":
        from = subMonths(now, 3)
        break
      case "6m":
        from = subMonths(now, 6)
        break
      case "1y":
        from = subYears(now, 1)
        break
      case "ytd":
        from = new Date(now.getFullYear(), 0, 1) // January 1st of current year
        break
      default:
        from = subMonths(now, 3)
    }

    onDateRangeChange({ from, to: now })
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Gain insights into your financial health and spending patterns
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2">
          <Tabs
            value={activeView}
            onValueChange={(v) => onViewChange(v as "overview" | "detailed")}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1">
            {["1w", "1m", "3m", "6m", "1y", "ytd"].map((period) => (
              <Button
                key={period}
                variant="outline"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => handleQuickDateSelect(period)}
              >
                {period.toUpperCase()}
              </Button>
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Date Range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={onDateRangeChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
