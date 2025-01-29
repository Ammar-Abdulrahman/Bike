import React from "react";
import { ThemeAppProvider } from "@Context/themeContext";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeAppProvider>{children}</ThemeAppProvider>;
};

export default ThemeProvider;
