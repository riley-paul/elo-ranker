import React from "react";
import RadixProvider from "./components/radix-provider";
import { Heading } from "@radix-ui/themes";

type Props = {};

const App: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <RadixProvider>
      <header className="container-2 py-7">
        <Heading>Elo Ranker</Heading>
      </header>
    </RadixProvider>
  );
};

export default App;
