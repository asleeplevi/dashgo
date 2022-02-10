import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

interface CreateUserFormProps {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  password_confirm: yup
    .string()
    .oneOf([null, yup.ref("password")], "passwords not match"),
});

const CreateUser: React.FC = () => {
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const errors = formState.errors;
  const handleRegisterUser: SubmitHandler<CreateUserFormProps> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleRegisterUser)}
          flex="1"
          rounded={8}
          bgColor="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                error={errors.name}
                label="Nome Completo"
                {...register("name")}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                error={errors.email}
                {...register("email")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                error={errors.password}
                label="Senha"
                {...register("password")}
              />
              <Input
                name="password_confirm"
                type="password"
                error={errors.password_confirm}
                label="Confirmar Senha"
                {...register("password_confirm")}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                isLoading={formState.isSubmitting}
                colorScheme="pink"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
export default CreateUser;
