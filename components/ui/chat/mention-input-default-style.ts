export const defaultStyle = {
  control: {
    // backgroundColor: "#fff",
    // fontSize: 14,
    // fontWeight: "normal",
    wordBreak: "break-word",
  },

  "&multiLine": {
    // control: {
    //   fontFamily: "monospace",
    //   minHeight: 63,
    // },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
      color: "hsl(var(--primary))",
    },
    input: {
      padding: 9,
      border: "1px solid hsl(var(--primary))",
    },
  },
  suggestions: {
    list: {
      backgroundColor: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
      // fontSize: 14,
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
