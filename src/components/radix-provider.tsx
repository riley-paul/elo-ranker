import { Theme } from "@radix-ui/themes";
import React from "react";
import { useDarkMode } from "usehooks-ts";

const RadixProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <Theme
      appearance={isDarkMode ? "dark" : "light"}
      grayColor="mauve"
      accentColor="iris"
    >
      {children}
    </Theme>
  );
};

export default RadixProvider;
