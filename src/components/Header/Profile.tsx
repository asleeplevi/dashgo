import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ showProfileData }) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Julio Levi</Text>
          <Text color="gray.300">jlevicarvalho@gmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Julio Levi" />
    </Flex>
  );
};
