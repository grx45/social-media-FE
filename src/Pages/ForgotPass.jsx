import React from "react";

import {
  Card,
  CardBody,
  Text,
  Input,
  CardFooter,
  Button,
  Stack,
  Flex,
  FormControl,
} from "@chakra-ui/react";

import { API_URL } from "../Helper";
import axios from "axios";

function ForgotPass() {
  const [Email, setEmail] = React.useState("");

  const onBtnclick = async () => {
    try {
      //1. kirim data yg dri field email ke api backend
      let response = await axios.post(`${API_URL}user/forgot`, {
        email: Email,
      });
      alert("mail has been sent");
      // 2. di backend
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Flex
      width={{ base: "95vw", md: "100vw" }}
      maxW={"md"}
      marginX="auto"
      marginY="48"
      justifyContent="center"
      padding={"8"}
    >
      <Card boxShadow={"md"} border="1px" borderColor={"gray.200"}>
        <CardBody>
          <Stack spacing="5">
            <Text textAlign="center" fontWeight="semibold" fontSize="2xl">
              Forgot Password
            </Text>
            <Text textAlign="center">
              Enter your email below and we'll send you a link to reset your
              password
            </Text>
            <FormControl>
              <Input
                placeholder="Please enter email"
                size="lg"
                isRequired="true"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Flex justifyContent={"center"} w="full">
              <Button
                w="50%"
                variant="solid"
                colorScheme="green"
                color="white"
                type="button"
                onClick={onBtnclick}
                rounded="lg"
              >
                Submit
              </Button>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default ForgotPass;
