import { Link as ChakraLink, Icon, Text, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  href: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  icon,
  children,
  href,
  ...rest
}) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        align="center"
        _hover={{ color: "pink.400" }}
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
};
