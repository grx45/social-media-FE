import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Helper";
import Sidebarsticky from "../Components/Sidebar";
import Feed from "../Components/Feed";
import { AiFillCamera } from "react-icons/ai";
import ModalImg from "../Components/ModalImg";

function MyProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, Setdata] = React.useState(null);
  const [tweetList, setTweetList] = React.useState([]);
  const { username } = useSelector((state) => state.SocioReducer);

  const getDataUser = async () => {
    try {
      let response = await axios.post(`${API_URL}user/oneuser`, {
        username: username,
      });

      Setdata(response.data.data[0]);
    } catch (error) {
      console.log("error = ", error);
    }
  };
  const getPostUser = async () => {
    try {
      let response = await axios.post(`${API_URL}user/post`, {
        username: username,
      });
      // console.log("data get post user", response.data.count);
      setTweetList(response.data.count);
    } catch (error) {
      console.log("error = ", error);
    }
  };
  const printTweet = () => {
    let likedByLoggedInUser = [];
    let newArr = tweetList.map((val) => {
      // console.log("hasil dri val utk cari like = ", val.countLike);
      // console.log("mappingan val", val.id);
      if (val.likes.length > 0) {
        likedByLoggedInUser = val.likes.filter(
          (likes) => likes.user.username === username && likes.isliked === true
        );
      }

      return (
        <Feed
          countlike={val.countLike}
          username={username}
          likedByLoggedInUser={likedByLoggedInUser}
          postUsername={val.user.username}
          imgProfile={val.user.imgProfile}
          posting={val.posting}
          id={val.id}
          date={val.createdAt}
          getAllTweet={getPostUser}
        />
      );
    });

    return newArr;
  };

  React.useEffect(() => {
    getDataUser();
    getPostUser();
    printTweet();
  }, [username]);

  return (
    <Box pos="relative" maxW="7xl" mt="20" mx="auto">
      <Flex justifyContent="center">
        <Box>
          <Sidebarsticky />
        </Box>

        <Box w={{ base: "95vw", lg: "75vw" }}>
          <Box h="300px" pos="relative">
            <Image
              align="bottom"
              w="full"
              h="full"
              borderTopLeftRadius="xl"
              borderTopRightRadius="xl"
              src={data?.imgBanner}
              alt="Banner"
              zIndex="auto"
            />
            <IconButton
              cursor="pointer"
              type="button"
              boxSize="6"
              variant="unstyled"
              pos="absolute"
              zIndex={"banner"}
              right="0"
              bottom={"3"}
              as={AiFillCamera}
              _hover={{ opacity: "0.4" }}
              onClick={onOpen}
            />
            {/* ==================================================== */}
            <ModalImg isOpen={isOpen} onClose={onClose} />
          </Box>
          <Box
            bottom="12"
            w="full"
            boxShadow="xl"
            border="1px"
            borderColor="gray.200"
            borderBottomRightRadius="xl"
            borderBottomLeftRadius="xl"
          >
            <Box pos="relative" bottom="12" left="10" mb={"-3"} z="auto">
              <Image
                w="24"
                h="24"
                zIndex="auto"
                alignItems={"center"}
                borderRadius="full"
                objectFit="cover"
                src={data?.imgProfile}
                alt="Profile"
              ></Image>
              <IconButton
                cursor="pointer"
                type="button"
                boxSize="6"
                variant="unstyled"
                pos="absolute"
                bottom="2"
                left="70px"
                as={AiFillCamera}
                _hover={{ opacity: "0.4" }}
                onClick={onOpen}
              />
            </Box>
            <Box pl="10" pb="10">
              <Heading
                as="h5"
                mb="1"
                fontSize="3xl"
                fontWeight="semibold"
                color="gray.900"
              >
                {username}
              </Heading>
              <Text as="span" fontSize="lg" color="gray.500">
                @{data?.email}
              </Text>

              <Flex mt={{ base: "4", md: "6" }} gap="3">
                <Text as="span" fontWeight="semibold">
                  100
                </Text>
                <Text as="span" color="gray.500">
                  FOLLOWING
                </Text>
                <Text as="span" fontWeight="semibold">
                  100
                </Text>
                <Text as="span" color="gray.500">
                  FOLLOWER
                </Text>
              </Flex>
            </Box>
          </Box>
          {/* ============================================TWEET AREA============================================== */}
          <Box my="3">{printTweet()}</Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default MyProfile;
