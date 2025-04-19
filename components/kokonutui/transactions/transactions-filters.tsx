"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import type { TransactionCategory, TransactionStatus, TransactionType } from "./types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface TransactionsFiltersProps {
  filters: {
    search: string
    dateRange: { from: Date | undefined; to: Date | undefined }
    type: TransactionType[]
    status: TransactionStatus[]
    category: TransactionCategory[]
    minAmount: string
    maxAmount: string
  }
  onFiltersChange: (filters: any) => void
}

export default function TransactionsFilters({ filters, onFiltersChange }: TransactionsFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleTypeToggle = (type: TransactionType) => {
    setLocalFilters((prev) => {
      const types = prev.type.includes(type) ? prev.type.filter((t) => t !== type) : [...prev.type, type]
      return { ...prev, type: types }
    })
  }

  const handleStatusToggle = (status: TransactionStatus) => {
    setLocalFilters((prev) => {
      const statuses = prev.status.includes(status) ? prev.status.filter((s) => s !== status) : [...prev.status, status]
      return { ...prev, status: statuses }
    })
  }

  const handleCategoryToggle = (category: TransactionCategory) => {
    setLocalFilters((prev) => {
      const categories = prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category]
      return { ...prev, category: categories }
    })
  }

  const applyFilters = () => {
    onFiltersChange(localFilters)
  }

  const resetFilters = () => {
    const resetFiltersObj = {
      search: "",
      dateRange: { from: undefined, to: undefined },
      type: [],
      status: [],
      category: [],
      minAmount: "",
      maxAmount: "",
    }
    setLocalFilters(resetFiltersObj)
    onFiltersChange(resetFiltersObj)
  }

  const hasActiveFilters = () => {
    return (
      localFilters.dateRange.from !== undefined ||
      localFilters.dateRange.to !== undefined ||
      localFilters.type.length > 0 ||
      localFilters.status.length > 0 ||
      localFilters.category.length > 0 ||
      localFilters.minAmount !== "" ||
      localFilters.maxAmount !== ""
    )
  }

  // Filter options
  const transactionTypes: { value: TransactionType; label: string }[] = [
    { value: "incoming", label: "Incoming" },
    { value: "outgoing", label: "Outgoing" },
  ]

  const transactionStatuses: { value: TransactionStatus; label: string }[] = [
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ]

  const transactionCategories: { value: TransactionCategory; label: string }[] = [
    { value: "shopping", label: "Shopping" },
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
    { value: "entertainment", label: "Entertainment" },
    { value: "utilities", label: "Utilities" },
    { value: "income", label: "Income" },
  ]

  // Desktop filters
  const DesktopFilters = () => (
    <div className="hidden md:flex flex-wrap gap-3 items-center">
      {/* Date Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={localFilters.dateRange.from || localFilters.dateRange.to ? "default" : "outline"}
            className="gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            {localFilters.dateRange.from && localFilters.dateRange.to ? (
              <>
                {format(localFilters.dateRange.from, "MMM d, yyyy")} -{" "}
                {format(localFilters.dateRange.to, "MMM d, yyyy")}
              </>
            ) : localFilters.dateRange.from ? (
              <>From {format(localFilters.dateRange.from, "MMM d, yyyy")}</>
            ) : localFilters.dateRange.to ? (
              <>Until {format(localFilters.dateRange.to, "MMM d, yyyy")}</>
            ) : (
              "Date Range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={localFilters.dateRange.from}
            selected={{
              from: localFilters.dateRange.from,
              to: localFilters.dateRange.to,
            }}
            onSelect={(range) => {
              handleFilterChange("dateRange", {
                from: range?.from,
                to: range?.to,
              })
            }}
            numberOfMonths={2}
          />
          <div className="flex items-center justify-between p-3 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => {
                handleFilterChange("dateRange", { from: undefined, to: undefined })
              }}
              size="sm"
            >
              Clear
            </Button>
            <Button onClick={() => applyFilters()} size="sm">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Type Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={localFilters.type.length > 0 ? "default" : "outline"} className="gap-2">
            <Filter className="h-4 w-4" />
            {localFilters.type.length > 0 ? `Type: ${localFilters.type.length}` : "Type"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]" align="start">
          <div className="space-y-2">
            {transactionTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.value}`}
                  checked={localFilters.type.includes(type.value)}
                  onCheckedChange={() => handleTypeToggle(type.value)}
                />
                <Label htmlFor={`type-${type.value}`}>{type.label}</Label>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <Button variant="ghost" onClick={() => handleFilterChange("type", [])} size="sm">
              Clear
            </Button>
            <Button onClick={() => applyFilters()} size="sm">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Status Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={localFilters.status.length > 0 ? "default" : "outline"} className="gap-2">
            <Filter className="h-4 w-4" />
            {localFilters.status.length > 0 ? `Status: ${localFilters.status.length}` : "Status"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]" align="start">
          <div className="space-y-2">
            {transactionStatuses.map((status) => (
              <div key={status.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status.value}`}
                  checked={localFilters.status.includes(status.value)}
                  onCheckedChange={() => handleStatusToggle(status.value)}
                />
                <Label htmlFor={`status-${status.value}`}>{status.label}</Label>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <Button variant="ghost" onClick={() => handleFilterChange("status", [])} size="sm">
              Clear
            </Button>
            <Button onClick={() => applyFilters()} size="sm">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Category Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={localFilters.category.length > 0 ? "default" : "outline"} className="gap-2">
            <Filter className="h-4 w-4" />
            {localFilters.category.length > 0 ? `Category: ${localFilters.category.length}` : "Category"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]" align="start">
          <div className="space-y-2">
            {transactionCategories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.value}`}
                  checked={localFilters.category.includes(category.value)}
                  onCheckedChange={() => handleCategoryToggle(category.value)}
                />
                <Label htmlFor={`category-${category.value}`}>{category.label}</Label>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <Button variant="ghost" onClick={() => handleFilterChange("category", [])} size="sm">
              Clear
            </Button>
            <Button onClick={() => applyFilters()} size="sm">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Amount Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={localFilters.minAmount || localFilters.maxAmount ? "default" : "outline"} className="gap-2">
            <Filter className="h-4 w-4" />
            {localFilters.minAmount || localFilters.maxAmount ? "Amount: Custom" : "Amount"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px]" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="min-amount">Min Amount</Label>
              <Input
                id="min-amount"
                type="number"
                placeholder="0.00"
                value={localFilters.minAmount}
                onChange={(e) => handleFilterChange("minAmount", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-amount">Max Amount</Label>
              <Input
                id="max-amount"
                type="number"
                placeholder="1000.00"
                value={localFilters.maxAmount}
                onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => {
                handleFilterChange("minAmount", "")
                handleFilterChange("maxAmount", "")
              }}
              size="sm"
            >
              Clear
            </Button>
            <Button onClick={() => applyFilters()} size="sm">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Reset Filters Button */}
      {hasActiveFilters() && (
        <Button variant="ghost" onClick={resetFilters} className="gap-1">
          <X className="h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  )

  // Mobile filters
  const MobileFilters = () => (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters() && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-[10px] flex items-center justify-center text-primary-foreground">
                {Object.values(localFilters).flat().filter(Boolean).length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="py-4 overflow-y-auto h-[calc(100%-10rem)]">
            <Accordion type="single" collapsible className="w-full">
              {/* Date Range Filter */}
              <AccordionItem value="date">
                <AccordionTrigger>Date Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Calendar
                      mode="range"
                      selected={{
                        from: localFilters.dateRange.from,
                        to: localFilters.dateRange.to,
                      }}
                      onSelect={(range) => {
                        handleFilterChange("dateRange", {
                          from: range?.from,
                          to: range?.to,
                        })
                      }}
                      className="rounded-md border"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleFilterChange("dateRange", { from: undefined, to: undefined })
                      }}
                      size="sm"
                      className="w-full"
                    >
                      Clear Dates
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Type Filter */}
              <AccordionItem value="type">
                <AccordionTrigger>Transaction Type</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {transactionTypes.map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-type-${type.value}`}
                          checked={localFilters.type.includes(type.value)}
                          onCheckedChange={() => handleTypeToggle(type.value)}
                        />
                        <Label htmlFor={`mobile-type-${type.value}`}>{type.label}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Status Filter */}
              <AccordionItem value="status">
                <AccordionTrigger>Status</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {transactionStatuses.map((status) => (
                      <div key={status.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-status-${status.value}`}
                          checked={localFilters.status.includes(status.value)}
                          onCheckedChange={() => handleStatusToggle(status.value)}
                        />
                        <Label htmlFor={`mobile-status-${status.value}`}>{status.label}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Category Filter */}
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {transactionCategories.map((category) => (
                      <div key={category.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-category-${category.value}`}
                          checked={localFilters.category.includes(category.value)}
                          onCheckedChange={() => handleCategoryToggle(category.value)}
                        />
                        <Label htmlFor={`mobile-category-${category.value}`}>{category.label}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Amount Range Filter */}
              <AccordionItem value="amount">
                <AccordionTrigger>Amount Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-min-amount">Min Amount</Label>
                      <Input
                        id="mobile-min-amount"
                        type="number"
                        placeholder="0.00"
                        value={localFilters.minAmount}
                        onChange={(e) => handleFilterChange("minAmount", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile-max-amount">Max Amount</Label>
                      <Input
                        id="mobile-max-amount"
                        type="number"
                        placeholder="1000.00"
                        value={localFilters.maxAmount}
                        onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex gap-2 mt-4 border-t border-border pt-4">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              Reset All
            </Button>
            <Button
              onClick={() => {
                applyFilters()
                document
                  .querySelector("[data-radix-collection-item]")
                  ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
              }}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <div className="space-y-4">
      <DesktopFilters />
      <MobileFilters />
    </div>
  )
}
