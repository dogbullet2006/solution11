"use client"

import { useState, useEffect } from "react"
import { fetchCandidateLevels } from "@/lib/api"

interface UseCandidateLevelsProps {
  initialLevels: string[]
  initialError: string | null
}

export function useCandidateLevels({ initialLevels, initialError }: UseCandidateLevelsProps) {
  const [levels, setLevels] = useState<string[]>(initialLevels)
  const [isLoading, setIsLoading] = useState(initialLevels.length === 0 && !initialError)
  const [error, setError] = useState<string | null>(initialError)

  useEffect(() => {
    if (initialLevels.length === 0 && !initialError) {
      fetchLevels()
    }
  }, [initialLevels, initialError])

  const fetchLevels = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const levelsData = await fetchCandidateLevels()
      setLevels(levelsData)
    } catch (error) {
      setError("Failed to load candidate levels. Please try again later.")
      console.error("Error fetching levels:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const retryLoading = () => {
    fetchLevels()
  }

  return {
    levels,
    isLoading,
    error,
    retryLoading,
  }
}

