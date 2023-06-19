import axios from "axios";
import React from "react";
import {
  Card,
  CardBody,
  Text,
  Button,
  Stack,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

function Verify() {
  const params = useParams();
  const navigate = useNavigate();

  console.log("value dari params", params);
  // console.log("value dari lcoation", location);

  const onVerify = async () => {
    try {
      let res = await axios.patch(
        // param kedua axios.pathc kosong krena buat akses req.header di backend hrus di parameter ketiga, param keuda untuk req.body
        "http://localhost:2000/user/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Flex
      maxW={"md"}
      marginX="auto"
      marginY="48"
      justifyContent="center"
      padding={"8"}
    >
      <Card boxShadow={"md"} border="1px" borderColor={"gray.200"}>
        <CardBody>
          <Stack spacing={"5"}>
            <Heading fontSize={"2xl"}> Verify your Email Address</Heading>
            <Text> Click the button below to verify your email address. </Text>
            <Flex justify={"center"}>
              <Button
                onClick={onVerify}
                variant="solid"
                textColor={"white"}
                colorScheme={"green"}
                type="button"
                borderRadius={"lg"}
                fontWeight="semibold"
              >
                Click Here
              </Button>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Verify;
