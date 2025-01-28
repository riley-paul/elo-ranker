import UserMenu from "@/components/user-menu";
import { Heading } from "@radix-ui/themes";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="sticky top-0 bg-gradient-to-b from-gray-2">
        <div className="container2 flex h-14 items-center justify-between">
          <Heading>Elo Ranker</Heading>
          <UserMenu />
        </div>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
