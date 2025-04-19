"use client"

import Layout from "../layout"
import TransactionsList from "./transactions-list"
import TransactionsHeader from "./transactions-header"
import TransactionsFilters from "./transactions-filters"
import { useState } from "react"
import type { Transaction, TransactionType, TransactionStatus, TransactionCategory } from "./types"
import { MOCK_TRANSACTIONS } from "./mock-data"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS)
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    search: "",
    dateRange: { from: undefined, to: undefined },
    type: [] as TransactionType[],
    status: [] as TransactionStatus[],
    category: [] as TransactionCategory[],
    minAmount: "",
    maxAmount: "",
  })

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)

    let filtered = [...transactions]

    // Apply search filter
    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase()
      filtered = filtered.filter(
        (transaction) =>
          transaction.title.toLowerCase().includes(searchLower) ||
          transaction.description?.toLowerCase().includes(searchLower),
      )
    }

    // Apply date range filter
    if (newFilters.dateRange.from) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        return transactionDate >= newFilters.dateRange.from!
      })
    }

    if (newFilters.dateRange.to) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        return transactionDate <= newFilters.dateRange.to!
      })
    }

    // Apply type filter
    if (newFilters.type.length > 0) {
      filtered = filtered.filter((transaction) => newFilters.type.includes(transaction.type))
    }

    // Apply status filter
    if (newFilters.status.length > 0) {
      filtered = filtered.filter((transaction) => newFilters.status.includes(transaction.status))
    }

    // Apply category filter
    if (newFilters.category.length > 0) {
      filtered = filtered.filter((transaction) => newFilters.category.includes(transaction.category))
    }

    // Apply amount range filter
    if (newFilters.minAmount) {
      const minAmount = Number.parseFloat(newFilters.minAmount)
      filtered = filtered.filter(
        (transaction) => Number.parseFloat(transaction.amount.replace(/[^0-9.-]+/g, "")) >= minAmount,
      )
    }

    if (newFilters.maxAmount) {
      const maxAmount = Number.parseFloat(newFilters.maxAmount)
      filtered = filtered.filter(
        (transaction) => Number.parseFloat(transaction.amount.replace(/[^0-9.-]+/g, "")) <= maxAmount,
      )
    }

    setFilteredTransactions(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  return (
    <Layout>
      <div className="space-y-6">
        <TransactionsHeader
          totalTransactions={filteredTransactions.length}
          filters={filters}
          onFiltersChange={applyFilters}
        />

        <TransactionsFilters filters={filters} onFiltersChange={applyFilters} />

        <TransactionsList
          transactions={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </Layout>
  )
}
