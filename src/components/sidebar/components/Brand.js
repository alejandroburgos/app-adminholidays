import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import logo_cubos from "../../../assets/img/dashboards/logo_cubos.png";
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <img src={logo_cubos} alt='logo' />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
