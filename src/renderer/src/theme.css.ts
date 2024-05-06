import { createTheme } from "@vanilla-extract/css";
import { themes } from "./themes";
const theme = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('theme')!) : null

console.log(themes)

export const SPACING_UNIT = 8;

export const [themeClass, vars] = createTheme({
  color: {
    background: theme ? theme.scheme.background : "#1c1c1c",
    darkBackground: theme ? theme.scheme.darkBackground : "#151515",
    muted: theme ? theme.scheme.muted : "#c0c1c7",
    bodyText: theme ? theme.scheme.font : "#8e919b",
    border: theme ? theme.scheme.border : "#424244",
  },
  opacity: {
    disabled: "0.5",
    active: "0.7",
  },
  size: {
    bodyFontSize: "14px",
  },
});
