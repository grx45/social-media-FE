import React from "react";

import { BiLike } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import {
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

function Feed(props) {
  const [likeState, setLikeState] = React.useState(false); // buat menyimpan current condition button
  // console.log("status like", likeState);
  const onBtnLike = (id, like) => {
    setLikeState(!likeState);
    if (likeState === false) {
      like += 1;
    } else {
      like -= 1;
    }
  };

  return (
    <Card maxW="md" marginY="4" width="480px">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <div className="relative inline-flex justify-center items-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full mr-4">
              <span className="font-medium text-gray-600 flex">S</span>
            </div>

            <Box>
              <Heading size="sm">{props.username}</Heading>
            </Box>
            <Text>X days ago</Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{props.posting}</Text>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button
          leftIcon={<BiLike />}
          colorScheme="white"
          variant="solid"
          textColor={likeState === false ? "black" : "red.100"}
          onClick={() => {
            onBtnLike(props.id, props.like);
          }}
        >
          {props.like}
        </Button>
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
      </CardFooter>
    </Card>
  );
}

export default Feed;
