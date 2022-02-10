import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useEffect } from "react";

type SidebarDrawerContextProps = UseDisclosureProps;

export const SidebarDrawerContext = createContext(
  {} as SidebarDrawerContextProps
);

export const SidebarDrawerProvider: React.FC = ({ children }) => {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);
  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};
