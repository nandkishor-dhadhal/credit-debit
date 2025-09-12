import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function AppTheme() {
  const savedDarkMode = localStorage.getItem("darkMode") === "dark";
  const [isDarkMode, setIsDarkMode] = useState(savedDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }

    localStorage.setItem("darkMode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="fixed top-4 right-4">
      <input
        type="checkbox"
        id="darkmode-toggle"
        className="sr-only"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />

      <label
        htmlFor="darkmode-toggle"
        className="cursor-pointer flex items-center"
      >
        {isDarkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-400" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-600" />
        )}
      </label>
    </div>
  );
}
