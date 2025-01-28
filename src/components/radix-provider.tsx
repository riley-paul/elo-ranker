import { Theme } from "@radix-ui/themes";
import React from "react";

const RadixProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Theme appearance="dark" grayColor="mauve" accentColor="iris">
      {children}
    </Theme>
  );
};

export default RadixProvider;
