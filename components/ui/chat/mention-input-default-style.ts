export const defaultStyle = {
  control: {
    wordBreak: "break-word",
    // maxHeight: 150,
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
      // maxHeight: 150,
      overflowY: "auto",
      "&:focus-visible": {
        borderColor: "red",
      },
    },
  },
  suggestions: {
    list: {
      backgroundColor: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
    },
    item: {
      padding: "4px 16px",
      borderBottom: "1px solid hsl(var(--border))",
      "&focused": {
        backgroundColor: "hsl(var(--card))",
      },
    },
  },
};
