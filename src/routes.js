import React from "react";

import { Icon } from "@chakra-ui/react";

// Admin Imports
import MainDashboard from "views/admin/default";
import {Books} from "views/admin/books";
import { CalendarBooks } from "views/admin/calendar";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import { CgBookmark } from "react-icons/cg";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { MdLock, MdOutlineShoppingCart } from "react-icons/md";
const routes = [
  {
    name: "Resumen principal",
    layout: "/admin",
    path: "/resumen-principal",
    icon: <Icon as={BsBarChartLine} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Reservas",
    layout: "/admin",
    path: "/reservas",
    icon: <Icon as={CgBookmark} width='20px' height='20px' color='inherit' />,
    component: Books,
  },
  {
    name: "Calendario",
    layout: "/admin",
    path: "/calendario",
    icon: <Icon as={AiTwotoneCalendar} width='20px' height='20px' color='inherit' />,
    component: CalendarBooks,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  ,{
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
