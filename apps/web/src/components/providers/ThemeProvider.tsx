"use client";

import {
  ThemeProvider as _ThemeProvider,
  type ThemeProviderProps,
} from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <_ThemeProvider
      {...props}
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >
      {children}
    </_ThemeProvider>
  );
};

export default ThemeProvider;
