"use client";

import { useDispatch, useSelector } from "react-redux";
import "./globals.css";
import { useEffect, useState } from "react";
import {
  DEFAULT_LANG,
  LANG_LOCAL_STORAGE_KEY,
  setLang,
} from "@/lib/features/languages/language-slice";
import { Box } from "@mui/material";

export default function LanguageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (localStorage[LANG_LOCAL_STORAGE_KEY]) {
      dispatch(setLang(localStorage[LANG_LOCAL_STORAGE_KEY]));
    } else {
      dispatch(setLang(DEFAULT_LANG.id));
    }

    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
}
