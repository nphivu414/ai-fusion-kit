import { usePathname } from "next/navigation";

export const useChatIdFromPathName = () => {
  const pathname = usePathname();

  if (pathname.indexOf("/apps/chat") === -1) {
    return "";
  }

  const chatId = pathname.split("/").pop() || "";
  return chatId;
};
