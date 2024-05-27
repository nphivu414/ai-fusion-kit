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
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};
