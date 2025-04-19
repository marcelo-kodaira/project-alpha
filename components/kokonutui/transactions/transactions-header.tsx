"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { FileDown, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { exportToExcel, exportToPDF } from "./export-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface TransactionsHeaderProps {
  totalTransactions: number
  filters: any
  onFiltersChange: (filters: any) => void
}

export default function TransactionsHeader({ totalTransactions, filters, onFiltersChange }: TransactionsHeaderProps) {
  const [searchValue, setSearchValue] = useState(filters.search)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFiltersChange({ ...filters, search: searchValue })
  }

  const clearSearch = () => {
    setSearchValue("")
    onFiltersChange({ ...filters, search: "" })
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {totalTransactions} {totalTransactions === 1 ? "transaction" : "transactions"} found
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="search"
            placeholder="Search transactions..."
            className="w-full sm:w-[250px] pr-8"
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => exportToExcel()}>Export to Excel</DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportToPDF()}>Export to PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
