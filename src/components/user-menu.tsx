import { Avatar, Button, Heading, Popover, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { actions } from "astro:actions";
import React from "react";
import LoginButton from "./login-button";
import { useDarkMode } from "usehooks-ts";

const UserMenu: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: actions.users.getMe.orThrow,
  });

  const { isDarkMode, toggle } = useDarkMode();

  if (!data) return <LoginButton />;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <button>
          <Avatar
            size="2"
            radius="full"
            src={data.avatarUrl ?? undefined}
            fallback={<i className="fas fa-user" />}
          />
        </button>
      </Popover.Trigger>
      <Popover.Content align="end" className="grid gap-5">
        <div className="flex gap-4">
          <Avatar
            size="4"
            radius="full"
            src={data.avatarUrl ?? undefined}
            fallback={<i className="fas fa-user" />}
          />
          <header>
            <Heading as="h3" size="4" weight="bold">
              {data.name}
            </Heading>
            <Text size="2" color="gray">
              {data.email}
            </Text>
          </header>
        </div>
        <div className="grid gap-3">
          <Button
            color="gray"
            variant="soft"
            onClick={toggle}
            className="relative"
          >
            {isDarkMode ? (
              <>
                <i className="fas fa-sun absolute left-4"></i>
                Light mode
              </>
            ) : (
              <>
                <i className="fas fa-moon absolute left-4"></i>
                Dark mode
              </>
            )}
          </Button>
          <Button asChild className="relative">
            <a href="/logout">
              <i className="fas fa-arrow-right-from-bracket absolute left-4"></i>
              Logout
            </a>
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default UserMenu;
