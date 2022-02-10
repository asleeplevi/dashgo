import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  page: number;
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent = false,
  page,
}) => {
  if (isCurrent)
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{ bgColor: "pink.500", cursor: "default" }}
      >
        {page}
      </Button>
    );
  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      colorScheme="pink"
      bg="gray.700"
      _hover={{ bgColor: "pink.500" }}
    >
      {page}
    </Button>
  );
};
