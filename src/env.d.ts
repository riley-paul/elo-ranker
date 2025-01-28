/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    session: import("./lib/types").SessionSelect | null;
    user: import("./lib/types").UserSelect | null;
  }
}
