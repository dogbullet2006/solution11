"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { submitAssignment } from "@/lib/api"
import { formSchema, type FormSchema } from "@/lib/validation"

export function useAssignmentSubmission() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      githubUrl: "",
      candidateLevel: "",
    },
  })

  const onSubmit = async (data: FormSchema) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      await submitAssignment(data)

      router.push("/thank-you")
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred")
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    submitError,
    isSubmitting,
    onSubmit,
  }
}

