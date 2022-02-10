import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import {
  RiDashboardLine,
  RiGithubLine,
  RiInputMethodLine,
  RiUserLine,
} from "react-icons/ri";

export const SideBarNav = () => {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink href="/users" icon={RiUserLine}>
          Users
        </NavLink>
      </NavSection>
      <NavSection title="AUTOMATION">
        <NavLink href="/forms" icon={RiInputMethodLine}>
          Forms
        </NavLink>
        <NavLink href="/integration" icon={RiGithubLine}>
          Integration
        </NavLink>
      </NavSection>
    </Stack>
  );
};
