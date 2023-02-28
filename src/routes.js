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
import { MdLock, MdOutlineShoppingCart, MdPerson } from "react-icons/md";
import { EditBooking } from "views/admin/edit";
import { BooksDetails } from "views/admin/booksDetails";
const routes = [
  {
    name: "Resumen principal",
    layout: "/admin",
    path: "/resumen-principal",
    icon: <Icon as={BsBarChartLine} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
    hidden: false
  },
  {
    name: "Reservas",
    layout: "/admin",
    path: "/reservas",
    icon: <Icon as={CgBookmark} width='20px' height='20px' color='inherit' />,
    component: Books,
    hidden: false
  },
  {
    name: "Ver reserva",
    layout: "/admin",
    path: "/reserva/:id",
    icon: <Icon as={CgBookmark} width='20px' height='20px' color='inherit' />,
    component: BooksDetails,
    hidden: true,
  },
  {
    name: "Calendario",
    layout: "/admin",
    path: "/calendario",
    icon: <Icon as={AiTwotoneCalendar} width='20px' height='20px' color='inherit' />,
    component: CalendarBooks,
    hidden: false
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Perfil",
    layout: "/admin",
    path: "/perfil",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
    hidden: true
  },
  ,{
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered
  },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
