import CategoryAdder from "@/components/category-adder";
import CategoryList from "@/components/category-list";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="container2 py-4">
      <CategoryAdder />
      <CategoryList />
    </main>
  );
}
