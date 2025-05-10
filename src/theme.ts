// theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1D3557", // SaddleBrown – główny odcień brązu
      light: "#A8DADC", // RosyBrown – jasny odcień brązu
    },
    secondary: {
      main: "#457B9D", // DarkOliveGreen – ziemisty odcień zieleni
    },
    background: {
      default: "#F9F9F9", // Beige – delikatny beż jako tło całej aplikacji
      paper: "#fff8ed", // Cornsilk – jasny odcień dla elementów typu "paper" (np. panele, karty)
    },
  },

  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontWeightBold: 700,
  },
});
