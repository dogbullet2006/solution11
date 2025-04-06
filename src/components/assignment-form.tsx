"use client";

import { AlertCircle, Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useAssignmentSubmission } from "@/hooks/use-assignment-submission";
import { useCandidateLevels } from "@/hooks/use-candidate-levels";

interface AssignmentFormClientProps {
  initialLevels: string[];
  initialError: string | null;
}

export default function AssignmentForm({
  initialLevels,
  initialError
}: AssignmentFormClientProps) {
  const {
    levels,
    isLoading: isLoadingLevels,
    error: levelsError,
    retryLoading: retryLoadingLevels
  } = useCandidateLevels({ initialLevels, initialError });

  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch
    },
    submitError,
    isSubmitting,
    onSubmit
  } = useAssignmentSubmission();

  return (
    <Card className="max-w-2xl mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Assignment Submission</CardTitle>
        <CardDescription>
          Fill out the form below to submit your assignment
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Assignment Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your assignment"
              className={`min-h-[120px] ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="githubUrl" className="text-sm font-medium">
              GitHub Repository URL <span className="text-red-500">*</span>
            </label>
            <Input
              id="githubUrl"
              {...register("githubUrl")}
              placeholder="https://github.com/username/repository"
              className={errors.githubUrl ? "border-red-500" : ""}
            />
            {errors.githubUrl && (
              <p className="text-red-500 text-sm">{errors.githubUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="candidateLevel" className="text-sm font-medium">
              Candidate Level <span className="text-red-500">*</span>
            </label>

            {levelsError ? (
              <div>
                <Alert variant="destructive" className="mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{levelsError}</AlertDescription>
                </Alert>
                <Button
                  type="button"
                  variant="outline"
                  onClick={retryLoadingLevels}
                  className="w-full"
                >
                  Retry Loading Levels
                </Button>
              </div>
            ) : (
              <Select
                disabled={isLoadingLevels}
                onValueChange={value => setValue("candidateLevel", value)}
                value={watch("candidateLevel")}
              >
                <SelectTrigger
                  className={errors.candidateLevel ? "border-red-500" : ""}
                >
                  <SelectValue
                    placeholder={
                      isLoadingLevels ? "Loading levels..." : "Select a level"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingLevels ? (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Loading levels...</span>
                    </div>
                  ) : Array.isArray(levels) && levels.length > 0 ? (
                    levels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                      No levels available
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}

            {errors.candidateLevel && (
              <p className="text-red-500 text-sm">
                {errors.candidateLevel.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isLoadingLevels}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Assignment"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
