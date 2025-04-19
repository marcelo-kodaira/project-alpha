"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, TrendingDown, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface RecommendationsProps {
  dateRange: DateRange | undefined
}

export default function Recommendations({ dateRange }: RecommendationsProps) {
  // In a real application, these recommendations would be generated based on the user's financial data
  const recommendations = [
    {
      id: 1,
      title: "Reduce dining out expenses",
      description:
        "Your spending on restaurants has increased by 25% compared to last month. Consider cooking at home more often to save money.",
      impact: "Potential monthly savings: $120",
      type: "saving",
      priority: "high",
    },
    {
      id: 2,
      title: "Increase retirement contributions",
      description:
        "You're currently contributing 5% to your retirement account. Increasing to 10% would significantly improve your long-term financial health.",
      impact: "Potential additional retirement savings: $250/month",
      type: "investment",
      priority: "medium",
    },
    {
      id: 3,
      title: "Refinance your mortgage",
      description:
        "Current interest rates are lower than your existing mortgage rate. Refinancing could reduce your monthly payments.",
      impact: "Potential monthly savings: $200",
      type: "saving",
      priority: "high",
    },
    {
      id: 4,
      title: "Diversify investment portfolio",
      description: "Your portfolio is heavily weighted in technology stocks. Consider diversifying to reduce risk.",
      impact: "Potential risk reduction: 15%",
      type: "investment",
      priority: "medium",
    },
    {
      id: 5,
      title: "Cancel unused subscriptions",
      description: "You have multiple streaming services that show low usage. Consider canceling some of them.",
      impact: "Potential monthly savings: $35",
      type: "saving",
      priority: "low",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "saving":
        return <TrendingDown className="h-4 w-4" />
      case "investment":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "saving":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
          >
            Cost Saving
          </Badge>
        )
      case "investment":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800"
          >
            Investment
          </Badge>
        )
      default:
        return <Badge variant="outline">General</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800"
          >
            High Priority
          </Badge>
        )
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
          >
            Medium Priority
          </Badge>
        )
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800"
          >
            Low Priority
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Personalized Recommendations</CardTitle>
            <CardDescription>Actionable insights to improve your financial health</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="flex flex-col h-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900/70 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`h-1 w-full ${
                  recommendation.priority === "high"
                    ? "bg-red-500 dark:bg-red-600"
                    : recommendation.priority === "medium"
                      ? "bg-amber-500 dark:bg-amber-600"
                      : "bg-blue-500 dark:bg-blue-600"
                }`}
              />
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${
                      recommendation.type === "saving"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {getTypeIcon(recommendation.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{recommendation.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          recommendation.type === "saving"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {recommendation.type === "saving" ? "Cost Saving" : "Investment"}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          recommendation.priority === "high"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : recommendation.priority === "medium"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                        }`}
                      >
                        {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-1">{recommendation.description}</p>
                <div className="mt-auto">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">{recommendation.impact}</p>
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    Take Action
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-emerald-200 dark:border-emerald-800 shadow-sm">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-emerald-700 dark:text-emerald-400">Financial Health Score</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-500">
                  Your overall financial health score is 78/100, which is good. Following these recommendations could
                  improve your score by up to 12 points.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-800 shadow-sm">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-amber-700 dark:text-amber-400">Attention Needed</h3>
                <p className="text-sm text-amber-600 dark:text-amber-500">
                  Your emergency fund is below the recommended 3-month expense level. Consider prioritizing this savings
                  goal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
