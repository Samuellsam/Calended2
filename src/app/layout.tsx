"use client";

import "./globals.css";
import { Box, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import Navbar from "@/components/navbar/navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ThemeLayout from "./theme-layout";
import LanguageLayout from "./language-layout";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { blueGrey } from "@mui/material/colors";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: blueGrey[900],
      }}
    >
      <head>
        <title>Calended | Minimalistic Work Calendar</title>
      </head>
      <body style={{ userSelect: "none" }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Provider store={makeStore()}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeLayout>
                <LanguageLayout>
                  <Box
                    className="transition-bg"
                    sx={{ backgroundColor: blueGrey[900] }}
                  >
                    <Navbar />
                    <Box sx={{ paddingTop: "100px", marginX: "10px" }}>
                      {children}
                    </Box>
                  </Box>
                </LanguageLayout>
              </ThemeLayout>
            </AppRouterCacheProvider>
          </Provider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
