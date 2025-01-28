import React from "react";
import RadixProvider from "./components/radix-provider";
import { Button, Heading } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserMenu from "./components/user-menu";
import CategoryList from "./components/category-list";
import CategoryAdder from "./components/category-adder";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RadixProvider>
        <header className="sticky top-0 bg-gradient-to-b from-gray-2">
          <div className="container2 flex h-14 items-center justify-between">
            <Heading>Elo Ranker</Heading>
            <UserMenu />
          </div>
        </header>
        <main className="container2 py-4">
          <CategoryAdder />
          <CategoryList />
        </main>
      </RadixProvider>
    </QueryClientProvider>
  );
};

export default App;
