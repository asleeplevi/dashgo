import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useContext } from "react";
import { RiMenuLine } from "react-icons/ri";
import { SidebarDrawerContext } from "../../contexts/sidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

const Header: React.FC = () => {
  const { onOpen } = useContext(SidebarDrawerContext);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          icon={<Icon as={RiMenuLine} />}
        />
      )}
      <Logo />
      {isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
};
export default Header;
