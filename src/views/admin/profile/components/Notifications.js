// Chakra imports
import { Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import SwitchField from "components/fields/SwitchField";
import Menu from "components/menu/MainMenu";
import { useState } from "react";

export default function Notifications(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const [emailNotification, setEmailNotification] = useState(true)
  return (
    <Card mb="20px" mx="auto" maxW="410px" {...rest}>
      <Flex align="center" w="100%" justify="space-between" mb="30px">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          Notificaciones
        </Text>
        <Menu />
      </Flex>
      <SwitchField
        isChecked={emailNotification}
        onChange={() => setEmailNotification(!emailNotification)}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="1"
        label="Correo electrónico"
      />
      {/* tiempo de notificacion */}
      <Select
        disabled={!emailNotification}
        placeholder="Tiempo de notificación"
        size="sm"
        mb="20px"
        w="100%"
        color="gray.500"
      >
        <option value="option1">1 semana antes</option>
        <option value="option3">2 semanas antes</option>
        <option value="option2">1 mes antes</option>
      </Select>

      
      {/* <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="2"
        label="Item comment notifications"
      />
      <SwitchField
        isChecked={true}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="3"
        label="Buyer review notifications"
      />
      <SwitchField
        isChecked={true}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="4"
        label="Rating reminders notifications"
      />
      <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="5"
        label="Meetups near you notifications"
      />
      <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="6"
        label="Company news notifications"
      />
      <SwitchField
        isChecked={true}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="7"
        label="New launches and projects"
      />
      <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="8"
        label="Monthly product changes"
      />
      <SwitchField
        isChecked={true}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="9"
        label="Subscribe to newsletter"
      />
      <SwitchField
        reversed={true}
        fontSize="sm"
        id="10"
        label="Email me when someone follows me"
      /> */}
    </Card>
  );
}
