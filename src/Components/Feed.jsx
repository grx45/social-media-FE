import React from "react";
import axios from "axios";
import { API_URL } from "../Helper";
import { AiFillHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";

function Feed(props) {
  const onBtnLike = async () => {
    try {
      let token = localStorage.getItem("socio_login");

      await axios.patch(
        `${API_URL}user/like`,
        { feedId: props.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      props.getAllTweet();
    } catch (error) {
      console.log("error = ", error);
    }
  };

  const getDuration = () => {
    let postdate = Date.parse(props.date.split("T").splice(0, 1));
    let delta =
      Date.parse(new Date().toISOString().split("T").splice(0, 1)) - postdate;
    let daysdiff = Math.ceil(delta / (1000 * 3600 * 24));

    if (daysdiff === 0) {
      return "Today";
    } else if (daysdiff === 1) {
      return "Yesterday";
    } else {
      return daysdiff + " days ago";
    }
  };

  return (
    <Box
      minW="full"
      maxW="md"
      my="4"
      border="1px"
      borderRadius="xl"
      borderColor="gray.100"
    >
      <Flex spacing="4" mt="2" ml="2">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Image
            alt="profile"
            src={props?.imgProfile}
            objectFit="4"
            w={14}
            h={14}
            borderRadius="full"
            mr="4"
          />

          <Flex fontWeight="semibold" size="sm">
            <Text mx={2}>{props.postUsername}</Text>
            <Text>{getDuration()}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Text marginX={"auto"} maxW={"80%"} wordBreak={"break-word"}>
        {props.posting}
      </Text>

      <Flex
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        {props.likedByLoggedInUser.length > 0 ? (
          <>
            <Flex alignItems="center">
              <Button
                leftIcon={<AiFillHeart size={"25px"} />}
                colorScheme="white"
                variant="solid"
                textColor={"red.600"}
                onClick={onBtnLike}
              ></Button>
              <Text>{props.countlike}</Text>
            </Flex>
          </>
        ) : (
          <>
            <Flex alignItems="center">
              <Button
                leftIcon={<AiFillHeart size={"25px"} />}
                colorScheme="white"
                variant="solid"
                textColor={"black"}
                onClick={onBtnLike}
              ></Button>
              <Text>{props.countlike}</Text>
            </Flex>
          </>
        )}
        <Button
          leftIcon={<FaRetweet />}
          colorScheme="white"
          variant="solid"
          textColor="black"
        >
          {props.like}
        </Button>
        <Button
          leftIcon={<BsReply />}
          colorScheme="white"
          variant="solid"
          textColor="black"
        >
          {props.like}
        </Button>
      </Flex>
    </Box>
  );
}

export default Feed;
