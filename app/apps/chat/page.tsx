import { redirect } from "next/navigation"

export default async function NewChatPage() {
  return redirect(`/apps/chat`)
}
