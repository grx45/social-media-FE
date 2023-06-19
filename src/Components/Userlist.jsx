import { Flex, Image, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Userlist(props) {
  return (
    <Flex
      w="80%"
      my="2"
      p="4"
      _hover={{ bgColor: "gray.200" }}
      border="1px"
      borderColor="gray.200"
      rounded="lg"
      shadow="base"
      alignItems="center"
      justifyContent="space-between"
      fontSize="xl"
    >
      <Flex>
        <Image
          src={props?.imgProfile}
          alt="profile"
          w="14"
          h="14"
          rounded="full"
          mr="4"
          objectFit="cover"
        ></Image>

        <Flex flexDirection="col" maxW={"50px"} flexWrap="wrap">
          <Link to={`/${props.username}`}>
            <Text
              as="h5"
              letterSpacing={"tight"}
              color="green.500"
              fontWeight="semibold"
            >
              {props.username}
            </Text>
          </Link>
          <Text fontSize="sm" color="gray.500" as="p">
            {props.email}
          </Text>
        </Flex>
      </Flex>
      <Icon
        as={BsFillPersonPlusFill}
        color="green.500"
        boxSize={{ lg: "8", xl: "10" }}
        mt="1"
      />
    </Flex>
  );
}

export default Userlist;
