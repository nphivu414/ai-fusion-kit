import { MAX_CHAT_INPUT_HEIGHT } from "@/lib/contants";

export const defaultStyle = {
  control: {
    wordBreak: "break-word",
    maxHeight: MAX_CHAT_INPUT_HEIGHT,
    overflowY: "hidden",
  },
  "&multiLine": {
    highlighter: {
      padding: 8,
      border: "1px solid transparent",
      color: "hsl(var(--primary))",
    },
    input: {
      padding: 8,
      border: "1px solid hsl(var(--border))",
      borderRadius: "calc(var(--radius) - 2px)",
      maxHeight: MAX_CHAT_INPUT_HEIGHT,
      overflowY: "auto",
      paddingBottom: 48,
      outlineColor: "hsl(var(--primary))",
    },
  },
  suggestions: {
    list: {
      backgroundColor: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
    },
    item: {
      color: "hsl(var(--foreground))",
      padding: "4px 16px",
      borderBottom: "1px solid hsl(var(--border))",
      "&focused": {
        backgroundColor: "hsl(var(--muted))",
      },
    },
  },
};
