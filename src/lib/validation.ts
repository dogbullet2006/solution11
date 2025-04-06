import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  description: z.string().min(1, "Assignment description is required"),
  githubUrl: z.string().url("Invalid URL format"),
  candidateLevel: z.string().min(1, "Candidate level is required"),
})

export type FormSchema = z.infer<typeof formSchema>
