import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

export const SearchBox = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={400}
      align="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      rounded="full"
    >
      <Input
        ref={searchInputRef}
        color="gray.50"
        variant="unstyled"
        placeholder="Search in platform"
        _placeholder={{ color: "gray.400" }}
        px="4"
        mr="4"
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
};
