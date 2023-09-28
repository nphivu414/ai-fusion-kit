import { usePathname } from "next/navigation";

export const useChatIdFromPathName = () => {
  const pathname = usePathname();
  const chatId = pathname.split('/').pop();
  return chatId;
}