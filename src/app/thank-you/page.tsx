import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your assignment has been successfully submitted",
}

export default function ThankYouPage() {
  return (
    <div className="container mx-auto py-20 px-4 flex-1 flex items-center">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">Your assignment has been successfully submitted. We will review it shortly.</p>
          <Link href="/" passHref>
            <Button>Return to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

