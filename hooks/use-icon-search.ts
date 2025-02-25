"use client"

import { useState, useCallback } from "react"
import { useDebouncedCallback } from "use-debounce"
import Fuse from "fuse.js"
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"

type IconSearchResult = {
  name: string
  icon: LucideIcon
  category: string
}

const iconList: IconSearchResult[] = Object.entries(Icons).map(([name, icon]) => ({
  name,
  icon: icon as LucideIcon,
  category: categorizeIcon(name),
}))

function categorizeIcon(name: string): string {
  if (name.includes("Arrow")) return "Arrows"
  if (name.includes("File")) return "Files"
  if (name.includes("User")) return "Users"
  // Add more categories as needed
  return "Other"
}

const fuse = new Fuse(iconList, {
  keys: ["name", "category"],
  threshold: 0.3,
})

export function useIconSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<IconSearchResult[]>(iconList)

  const debouncedSearch = useDebouncedCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(iconList)
      return
    }

    const searchResults = fuse.search(searchQuery)
    setResults(searchResults.map((result) => result.item))
  }, 300)

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery)
      debouncedSearch(searchQuery)
    },
    [debouncedSearch],
  )

  return {
    query,
    results,
    handleSearch,
  }
}

