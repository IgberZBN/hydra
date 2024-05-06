import { useState, useEffect } from "react";
import { themeColor, themeContainer, themeInfo, themeItem, themePreview, themeScheme } from "./theme.css";

const ThemesList = ({ themes }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    if (selectedTheme) {
      localStorage.setItem("theme", JSON.stringify(selectedTheme));
    }
  }, [selectedTheme]);

  const setTheme = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div>
      <h2>Available Themes:</h2>
      <ul className={themeContainer}>
        {themes.map((theme, index) => (
          <li key={index} className={themeItem} onClick={() => setTheme(theme)} >
            <div className={themePreview} style={{ backgroundColor: theme.scheme.background, border: `2px solid${theme.scheme.border}` }}>
              <p style={{ color: theme.scheme.font }}>
                Welcome to Hydra!
              </p>
            </div>
            <div className={themeInfo}>
              <h3>{theme.name}</h3>
              <p>Created by: {theme.createdBy}</p>
              <ul className={themeScheme}>
                <li className={themeColor} style={{ backgroundColor: theme.scheme.font }}></li>
                <li className={themeColor} style={{ backgroundColor: theme.scheme.background }}></li>
                <li className={themeColor} style={{ backgroundColor: theme.scheme.darkBackground }}></li>
                <li className={themeColor} style={{ backgroundColor: theme.scheme.border }}></li>
                <li className={themeColor} style={{ backgroundColor: theme.scheme.muted }}></li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemesList;
