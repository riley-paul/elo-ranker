import React from "react";
import RadixProvider from "./components/radix-provider";
import { Button, Heading } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserMenu from "./components/user-menu";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RadixProvider>
        <header className="bg-gradient-to-b from-gray-2 sticky top-0">
          <div className="container2 h-14 flex items-center justify-between">
            <Heading>Elo Ranker</Heading>
            <UserMenu />
          </div>
        </header>
        <main className="container2 py-4">
          <Button>Click Me</Button>
        </main>
      </RadixProvider>
    </QueryClientProvider>
  );
};

export default App;
