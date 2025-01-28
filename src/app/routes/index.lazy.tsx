import CategoryAdder from "@/components/category-adder";
import CategoryList from "@/components/category-list";
import UserMenu from "@/components/user-menu";
import { Heading } from "@radix-ui/themes";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
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
    </div>
  );
}
