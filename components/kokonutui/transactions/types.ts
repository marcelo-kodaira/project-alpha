export type TransactionType = "incoming" | "outgoing"
export type TransactionStatus = "completed" | "pending" | "failed"
export type TransactionCategory = "shopping" | "food" | "transport" | "entertainment" | "utilities" | "income"

export interface Transaction {
  id: string
  title: string
  description?: string
  amount: string
  type: TransactionType
  category: TransactionCategory
  date: string
  status: TransactionStatus
  account?: string
  reference?: string
}
