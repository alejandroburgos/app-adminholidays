// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { constants } from "Constants";
import React, { useEffect, useState } from "react";
import Information from "views/admin/profile/components/Information";
import AddInformation from "./AddInformation";

// Assets
export default function GeneralInformation(props) {
  const {session, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [properties, setProperties] = useState([])

  // get properties
  const getProperties = async () => {
    try {
      const response = await fetch(`${constants.urlLocal}property/${session.user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (id) => {
    const response = await fetch(`${constants.urlLocal}property/${id}/${session.user}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setProperties(data.data);
  };

  useEffect(() => {
    getProperties();
  }, []);
  console.log(properties)
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Información general
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Aquí puedes encontrar información general sobre tu perfil
      </Text>
      <SimpleGrid columns='2' gap='20px'>
        {properties && properties?.map((p, i) => (
          <Information 
          key={i}
          boxShadow={cardShadow}
          title='Propiedad'
          value={p.name}
          id={p._id}
          deleteProperty={deleteProperty}
          />
        ))}
        <AddInformation
          boxShadow={cardShadow}
          session={session}
          setProperties={setProperties}
          title='Propiedad'
          value='Finca Los Acebuches'/>
        {/* <Information
          boxShadow={cardShadow}
          title='Languages'
          value='English, Spanish, Italian'
        />
        <Information
          boxShadow={cardShadow}
          title='Department'
          value='Product Design'
        />
        <Information
          boxShadow={cardShadow}
          title='Work History'
          value='Google, Facebook'
        />
        <Information
          boxShadow={cardShadow}
          title='Organization'
          value='Simmmple Web LLC'
        />
        <Information
          boxShadow={cardShadow}
          title='Birthday'
          value='20 July 1986'
        /> */}
      </SimpleGrid>
    </Card>
  );
}
