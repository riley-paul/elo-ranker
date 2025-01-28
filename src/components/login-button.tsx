import { Button } from "@radix-ui/themes";
import React from "react";

const LoginButton: React.FC = () => {
  return (
    <Button asChild>
      <a href="/login/google">Login with Google</a>
    </Button>
  );
};

export default LoginButton;
