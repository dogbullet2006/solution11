import type { FormSchema } from "./validation";

export async function fetchCandidateLevels(): Promise<string[]> {
  const response = await fetch(
    "https://tools.qa.ale.ai/api/tools/candidates/levels",
    {
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch candidate levels");
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  } else if (data && typeof data === "object") {
    const possibleArrayProps = ["data", "levels", "results", "items", "values"];

    for (const prop of possibleArrayProps) {
      if (Array.isArray(data[prop])) {
        return data[prop];
      }
    }

    if (Object.keys(data).length > 0) {
      return Object.keys(data);
    }
  }

  throw new Error("Invalid data format received from API");
}

export async function submitAssignment(data: FormSchema): Promise<void> {
  const apiData = {
    name: data.name,
    email: data.email,
    assignment_description: data.description,
    github_repo_url: data.githubUrl,
    candidate_level: data.candidateLevel
  };

  const response = await fetch(
    "https://tools.qa.ale.ai/api/tools/candidates/assignments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiData)
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to submit assignment");
  }

  return;
}
