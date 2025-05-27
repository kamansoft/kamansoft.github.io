
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "dark") {
      return <Moon className="h-5 w-5" />
    } else if (theme === "light") {
      return <Sun className="h-5 w-5" />
    } else {
      // system theme - show based on actual preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      return isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-white hover:bg-white/10"
      title={`Current theme: ${theme}. Click to switch.`}
    >
      {getIcon()}
    </Button>
  )
}
