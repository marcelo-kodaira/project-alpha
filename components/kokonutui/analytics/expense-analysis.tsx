"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ExpenseAnalysisProps {
  dateRange: DateRange | undefined
}

export default function ExpenseAnalysis({ dateRange }: ExpenseAnalysisProps) {
  // In a real application, this data would come from an API based on the date range
  const expenseData = [
    { name: "Housing", value: 2500, color: "#8884d8" },
    { name: "Food", value: 1200, color: "#82ca9d" },
    { name: "Transportation", value: 800, color: "#ffc658" },
    { name: "Entertainment", value: 600, color: "#ff8042" },
    { name: "Utilities", value: 450, color: "#0088fe" },
    { name: "Healthcare", value: 350, color: "#00C49F" },
    { name: "Other", value: 850, color: "#FFBB28" },
  ]

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0)

  // Calculate percentages for each category
  const expenseDataWithPercentage = expenseData.map((item) => ({
    ...item,
    percentage: ((item.value / totalExpenses) * 100).toFixed(1),
  }))

  // Find the largest expense category
  const largestExpense = [...expenseData].sort((a, b) => b.value - a.value)[0]

  // Find the fastest growing category (in a real app, this would be calculated from historical data)
  const fastestGrowingCategory = "Entertainment"
  const fastestGrowingPercentage = 18.5

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Analysis of your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px] w-full flex items-center justify-center">
            <ChartContainer
              config={{
                expenses: {
                  label: "Expenses",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    activeIndex={undefined}
                    activeShape={(props) => {
                      const RADIAN = Math.PI / 180
                      const {
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        startAngle,
                        endAngle,
                        fill,
                        percent,
                        value,
                        name,
                      } = props
                      const sin = Math.sin(-RADIAN * midAngle)
                      const cos = Math.cos(-RADIAN * midAngle)
                      const sx = cx + (outerRadius + 10) * cos
                      const sy = cy + (outerRadius + 10) * sin
                      const mx = cx + (outerRadius + 30) * cos
                      const my = cy + (outerRadius + 30) * sin
                      const ex = mx + (cos >= 0 ? 1 : -1) * 22
                      const ey = my
                      const textAnchor = cos >= 0 ? "start" : "end"

                      return (
                        <g>
                          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
                            {name}
                          </text>
                          <Sector
                            cx={cx}
                            cy={cy}
                            innerRadius={innerRadius}
                            outerRadius={outerRadius + 10}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            fill={fill}
                          />
                          <Sector
                            cx={cx}
                            cy={cy}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            innerRadius={outerRadius + 6}
                            outerRadius={outerRadius + 10}
                            fill={fill}
                          />
                          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                          <text
                            x={ex + (cos >= 0 ? 1 : -1) * 12}
                            y={ey}
                            textAnchor={textAnchor}
                            fill="#333"
                            className="text-xs"
                          >
                            {`${name}: $${value.toLocaleString()}`}
                          </text>
                          <text
                            x={ex + (cos >= 0 ? 1 : -1) * 12}
                            y={ey}
                            dy={18}
                            textAnchor={textAnchor}
                            fill="#999"
                            className="text-xs"
                          >
                            {`(${(percent * 100).toFixed(1)}%)`}
                          </text>
                        </g>
                      )
                    }}
                    onMouseEnter={(data, index) => {
                      document.querySelector(".recharts-pie")?.classList.add("cursor-pointer")
                    }}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--background)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={
                      <div className="bg-background border border-border rounded-md shadow-md p-2 text-sm">
                        <p className="font-medium">{`${expenseData[0]?.name || ""}`}</p>
                        <p className="text-muted-foreground">{`Amount: $${expenseData[0]?.value.toLocaleString() || ""}`}</p>
                        <p className="text-muted-foreground">{`Percentage: ${((expenseData[0]?.value / totalExpenses) * 100).toFixed(1) || ""}%`}</p>
                      </div>
                    }
                    wrapperStyle={{ outline: "none" }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="space-y-4 flex flex-col justify-center h-full">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Top Expense Category</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{largestExpense.name}</span>
                <span className="text-lg">${largestExpense.value.toLocaleString()}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {((largestExpense.value / totalExpenses) * 100).toFixed(1)}% of total expenses
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Fastest Growing Category</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{fastestGrowingCategory}</span>
                <span className="text-sm font-medium text-red-500">+{fastestGrowingPercentage}%</span>
              </div>
              <div className="text-sm text-muted-foreground">Consider reviewing your spending in this category</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Potential Savings</h3>
              <div className="text-sm">
                Reducing your <span className="font-medium">{largestExpense.name}</span> expenses by 10% would save you{" "}
                <span className="font-medium">${(largestExpense.value * 0.1).toLocaleString()}</span> per month.
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 gap-1">
              View Detailed Expense Report
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
