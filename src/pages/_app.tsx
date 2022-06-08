import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/sidebarDrawerContext";
import { makeServer } from "../services/mirage";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../services/queryClient";
import { AuthProvider } from "../contexts/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  // if (process.env.NODE_ENV === "development") makeServer();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools />
        <SidebarDrawerProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </SidebarDrawerProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
