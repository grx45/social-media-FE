import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../Helper";
import Sidebarsticky from "../Components/Sidebar";
import Feed from "../Components/Feed";
import Spinner from "../Components/Spinner";

function OtherProfile(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [data, Setdata] = React.useState(null);
  const [tweetList, setTweetList] = React.useState([]);
  const username = useSelector((state) => state.SocioReducer.username);
  const [loading, setLoading] = React.useState(true);

  // console.log("Get from req.params url browser", params);

  const getDataUser = async () => {
    try {
      let response = await axios.post(`${API_URL}user/oneuser`, {
        username: params?.username,
      });

      Setdata(response.data.data[0]);
      setLoading(!loading); // buat loading nati jdi true  atau false

      console.log("data user habis dari params =", response.data.data[0]);
      if (!response.data.data[0]) {
        navigate("*");
      }
    } catch (error) {
      console.log("error = ", error);
    }
  };
  const getPostUser = async () => {
    try {
      let response = await axios.post(`${API_URL}user/post`, {
        username: params?.username,
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

  const autoReroute = () => {
    let token = localStorage.getItem("socio_login");
    // console.log("username = ", username);

    if (token) {
      if (username === params?.username) {
        navigate("/myprofile");
      }
    }
  };

  React.useEffect(() => {
    autoReroute();
    getDataUser();
    getPostUser();
  }, []);
  React.useEffect(() => {
    autoReroute();
  }, [username]);

  return (
    <Box pos="relative" maxW="7xl" mt="20" mx="auto">
      {loading === true ? (
        <Spinner />
      ) : (
        <Flex justifyContent="center">
          <Box>
            <Sidebarsticky />
          </Box>

          <Box w={{ base: "95vw", lg: "75vw" }}>
            <Box h="300px">
              <Image
                align="bottom"
                w="full"
                h="full"
                borderTopLeftRadius="xl"
                borderTopRightRadius="xl"
                src={data?.imgBanner}
                alt="Banner"
              />
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
              <Box pos="relative" bottom="12" left="10" mb={"-3"}>
                <Image
                  w="24"
                  h="24"
                  zIndex="auto"
                  alignItems={"center"}
                  borderRadius="full"
                  objectFit="cover"
                  src={data?.imgProfile}
                  alt="Profile"
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
                  {params?.username}
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
      )}
    </Box>
  );
}

export default OtherProfile;
