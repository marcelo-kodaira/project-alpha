"use client"

import { cn } from "@/lib/utils"
import {
  Wallet,
  ShoppingCart,
  CreditCard,
  Coffee,
  Car,
  Music,
  Home,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Download,
  Copy,
  Trash2,
} from "lucide-react"
import type { Transaction } from "./types"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TransactionsListProps {
  transactions: Transaction[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage: number
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export default function TransactionsList({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: TransactionsListProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "shopping":
        return <ShoppingCart className="h-4 w-4" />
      case "food":
        return <Coffee className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      case "entertainment":
        return <Music className="h-4 w-4" />
      case "utilities":
        return <Home className="h-4 w-4" />
      case "income":
        return <Wallet className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
          >
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
          >
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800"
          >
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-[#1F1F23]/50">
                <TableHead className="w-[250px]">Transaction</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            "bg-zinc-100 dark:bg-zinc-800",
                            "border border-zinc-200 dark:border-zinc-700",
                          )}
                        >
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{transaction.title}</div>
                          {transaction.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.description}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(transaction.date), "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {getCategoryIcon(transaction.category)}
                        <span className="capitalize">{transaction.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          transaction.type === "incoming"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {transaction.type === "incoming" ? "+" : "-"}
                        {transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {transactions.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          "bg-zinc-100 dark:bg-zinc-800",
                          "border border-zinc-200 dark:border-zinc-700",
                        )}
                      >
                        {getCategoryIcon(transaction.category)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{transaction.title}</div>
                        {transaction.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.description}</div>
                        )}
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        transaction.type === "incoming"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400",
                      )}
                    >
                      {transaction.type === "incoming" ? "+" : "-"}
                      {transaction.amount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(transaction.date), "MMM d, yyyy • h:mm a")}
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(transaction.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download receipt
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">No transactions found.</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(Number.parseInt(value))}
            >
              <SelectTrigger className="h-8 w-[70px] mx-1">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            per page
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(page)}
                className={cn("h-8 w-8", {
                  "hidden sm:flex":
                    page > 2 &&
                    page < totalPages - 1 &&
                    totalPages > 5 &&
                    page !== currentPage &&
                    page !== currentPage - 1 &&
                    page !== currentPage + 1,
                })}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
