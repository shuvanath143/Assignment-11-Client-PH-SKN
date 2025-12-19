import useTheme from "../../hooks/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm btn-ghost"
      title="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <MdDarkMode /> "Dark Mode"
        </>
      ) : (
        <>
          <MdLightMode /> "Light Mode"
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
