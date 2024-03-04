"use client";

import "./globals.css";
import { Box, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import Navbar from "@/components/navbar/navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ThemeLayout from "./theme-layout";
import LanguageLayout from "./language-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full bg-slate-100 dark:bg-slate-900">
      <head>
        <title>Calended | Minimalistic Work Calendar</title>
      </head>
      <body className="select-none">
        <Provider store={makeStore()}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeLayout>
              <LanguageLayout>
                <Box className="bg-slate-100 dark:bg-slate-900 transition-bg">
                  <Navbar />
                  <Box className="pt-20 mx-10">{children}</Box>
                </Box>
              </LanguageLayout>
            </ThemeLayout>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
