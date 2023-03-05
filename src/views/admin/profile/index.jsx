
// Chakra imports
import { Avatar, Box, Button, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
// import avatar from "assets/img/avatars/avatar4.png";
import React from "react";
import { constants } from "Constants";
import { TemplateEmail } from "components/nodemailer/TemplateEmail";
export default function Overview() {

  // session storage
  const session = JSON.parse(sessionStorage.getItem("login-user"));

  // send nodemail
  const sendEmail = () => {
    fetch(`${constants.urlLocal}sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "aleburgosmoreno@gmail.com",
        subject: "test",
        text: "test",
        html: html,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const html = `
  <div style="background-color: #f5f5f5; padding: 20px;">
    <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
      <h1 style="text-align: center; color: #000;">Hola ${session.user}</h1>
      <p style="text-align: center; color: #000;">
        Te recordamos que tienes una reserva para el día 20 de Julio a las 10:00 hs.
        Por favor, recuerda contactar al cliente para confirmar la hora de llegada.
      </p>
      <div style="text-align: center;">
        <a href="https://www.google.com" style="text-decoration: none; color: #fff;">
          <button style="background-color: #000; padding: 10px 20px; border: none; border-radius: 5px;">
            Ver reserva
          </button>
        </a>
    </div>
  </div>`
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          name={session.user}
          job='aleburgosmoreno@gmail.com'
          posts='17'
          followers='9.7k'
          following='274'
        />
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
          session={session}
        />
        <Notifications
          used={25.6}
          total={50}
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "2 / 1 / 3 / 3",
            "2xl": "1 / 3 / 2 / 4",
          }}
        />
      </Grid>
      {/* BUTTON SAVE */}
      <Box
        display='flex'
        justifyContent='flex-end'
        mt='20px'
        mb='20px'
        mr='20px'>
        <Button
          colorScheme='blue'
          variant='solid'
          size='md'
          w='100px'
          h='40px'
          onClick={sendEmail}>
          Guardar
        </Button>
      </Box>

    </Box>
  );
}


