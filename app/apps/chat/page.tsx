import { Metadata } from "next"
import { Heading1 } from "@/components/ui/typography"

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
}

export default function PlaygroundPage() {
  return (
    <Heading1>Welcome to Chat App</Heading1>
  )
}
