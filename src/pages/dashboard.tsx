import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dynamic from "next/dynamic";
import { theme } from "../styles/theme";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "dark",
    followCursor: true,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[6000],
    },
    axisTicks: {
      color: theme.colors.gray[6000],
    },
    categories: [
      "2021-03-18T00:00:00.000z",
      "2021-03-19T00:00:00.000z",
      "2021-03-20T00:00:00.000z",
      "2021-03-21T00:00:00.000z",
      "2021-03-22T00:00:00.000z",
      "2021-03-23T00:00:00.000z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
    colors: [theme.colors.pink[300], theme.colors.pink[500]],
  },
  stroke: {
    colors: [theme.colors.pink[500]],
  },
};

const series = [{ name: "subscribers", data: [31, 120, 10, 28, 51, 12] }];

const Dashboard: React.FC = () => {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={["6", "8"]} bg="gray.800" pb="4" rounded={8}>
            <Text fontSize="lg" mb="4">
              Weekly Subscribers
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
          <Box p={["6", "8"]} bg="gray.800" rounded={8}>
            <Text fontSize="lg" mb="4">
              Open Tax
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};
export default Dashboard;
