import React from "react";

import {
  Card,
  CardBody,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputRightElement,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { API_URL } from "../Helper";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Reset() {
  const params = useParams();
  const navigate = useNavigate();
  const [Type, setType] = React.useState("password");
  const [Pass, setPass] = React.useState("");
  const [Confirm, setConfirm] = React.useState("");

  const showPassword = () => {
    let temp = Type;

    if (temp === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const onBtnclick = async () => {
    try {
      if (Pass !== Confirm) {
        alert("Please ensure that both fields contain the same input");
      } else {
        let res = await axios.patch(
          // param kedua axios.patch kosong krena buat akses req.header di backend hrus di parameter ketiga, param keuda untuk req.body
          `${API_URL}user/reset`,
          {
            password: Pass,
            confirmation_password: Confirm,
          },
          {
            headers: {
              Authorization: `Bearer ${params.token}`,
            },
          }
        );
        console.log("hasil res =", res);
        alert("buttonclick");
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
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
      <Card boxShadow={"md"} border="1px" borderColor={"gray.200"} w="md">
        <CardBody>
          <FormControl mb="5">
            <FormLabel fontWeight="semibold" fontSize={"lg"}>
              New Password
            </FormLabel>
            <InputGroup>
              <Input
                type={Type}
                placeholder="Enter new password"
                isRequired="true"
                onChange={(e) => setPass(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  backgroundColor={"transparent"}
                  icon={
                    Type === "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                  }
                  onClick={showPassword}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl mb="5">
            <FormLabel fontWeight="semibold" fontSize={"lg"}>
              Password Confirmation
            </FormLabel>
            <InputGroup>
              <Input
                type={Type}
                placeholder="Please confirm your new password"
                isRequired="true"
                onChange={(e) => setConfirm(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  backgroundColor={"transparent"}
                  icon={
                    Type === "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                  }
                  onClick={showPassword}
                />
              </InputRightElement>
            </InputGroup>
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
        </CardBody>
      </Card>
    </Flex>
  );
}
export default Reset;
