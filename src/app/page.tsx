import AssignmentForm from "@/components/assignment-form";
import { fetchCandidateLevels } from '@/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Submit Assignment",
  description: "Submit your assignment for review",
}

export default async function HomePage() {
  let initialLevels: string[] = []
  let error: string | null = null

  try {
    initialLevels = await fetchCandidateLevels()
  } catch (e) {
    error = "Failed to load candidate levels. You can retry loading them after the page loads."
    console.error("Error pre-fetching candidate levels:", e)
  }

  return (
    <div className="container mx-auto py-10 px-4 flex-1 flex items-center">
      <AssignmentForm initialLevels={initialLevels} initialError={error} />
    </div>
  );
}
