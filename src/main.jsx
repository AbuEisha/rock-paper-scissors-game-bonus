import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Barlow Semi Condensed",
  },
  palette: {
    text: {
      primary: "hsl(229, 25%, 31%)",
      secondary: "hsl(229, 64%, 46%)",
    },
    divider: "hsl(246, 11%, 37%)",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
