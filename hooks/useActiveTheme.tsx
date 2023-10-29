import { useTheme } from "next-themes"

export const useActiveThemeColor = () => {
  const { theme, systemTheme } = useTheme()

  if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
    return "dark"
  }
  
  return "light"
}