import axios from "axios";
import React from "react";
import Sidebarsticky from "../Components/Sidebar";
import { API_URL } from "../Helper";
import { useSelector } from "react-redux";
import Userlist from "../Components/Userlist";

import { BsImage, BsMic, BsEmojiSmile } from "react-icons/bs";

import Feed from "../Components/Feed";
import { Flex } from "@chakra-ui/react";
import Spinner from "../Components/Spinner";

function Landing(props) {
  // Menampung semua user data yang diambil
  const [userList, setUserList] = React.useState([]);
  // step 1. bikin fitur posting setup usestate untuk post
  const [textarea, setTextArea] = React.useState("");
  // step 5. bikin variable baru untuk nyimpen data dri json server
  const [tweetlist, setTweetList] = React.useState([]);
  const [limitval, setlimitVal] = React.useState(3);

  // step 2. ngambil username dan id dri redux
  const username = useSelector((state) => state.SocioReducer.username); // untuk ngambil username dri redux
  const id = useSelector((state) => state.SocioReducer.id); // untuk ngambil username dri id

  // step 3. bikin function utk get post yd di dalam textarea ke json server
  const btnTweet = async () => {
    try {
      if (textarea === "") {
        alert("please fill in posting field");
      } else {
        await axios.post(`${API_URL}feed`, {
          iduser: id,
          username: username,
          like: 0,
          posting: textarea,
        });
        setTextArea(""); // untuk reset textarea jdi kosong stelah click tweet button
        getAllTweet();
      }
    } catch (error) {
      console.log("error");
    }
  };

  // step 4. bkin function utk mengambil data dri json server buat kasih liat posting di feed
  const getAllTweet = async () => {
    try {
      let response = await axios.get(`${API_URL}feed?_sort=id&_order=desc`);
      setTweetList(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAllUser = async () => {
    try {
      //below buat ambil data dri json server
      let response = await axios.get(
        `${API_URL}user?&id_ne=${localStorage.getItem(
          "socio_login"
        )}&_limit=${limitval}`
      );
      // console.log("current limit val = ", limitval);
      // console.log("response.data = ", response.data);
      setUserList(response.data);
    } catch (error) {
      console.log("error");
    }
  };

  console.log("limit before click:", limitval);
  const showMore = () => {
    if (limitval === 6) {
      setlimitVal(3);
    } else {
      setlimitVal(6);
    }
    console.log("limit after click:", limitval);
  };

  // step 6. msukin getalltweet ke useeffect biar saat render smua function dlam useeffect langsung jalan
  React.useEffect(() => {
    getAllUser();
    getAllTweet();
  }, [limitval]);

  // step 7. bikin fucntion untuk print feed
  const printTweet = () => {
    let newArr = tweetlist.map((val, idx) => {
      return (
        <Feed
          username={val.username}
          posting={val.posting}
          like={val.like}
          id={val.id}
        />
      );
    });
    return newArr;
  };

  const printUser = () => {
    let newArr = userList.map((val) => {
      return (
        <Userlist
          avatar={val.username[0]}
          id={val.id}
          username={val.username}
        />
      );
    });
    return newArr;
  };

  return (
    <section className="w-[60vw] mt-[73px] flex mx-auto ">
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <Sidebarsticky />
          {/* ----------------------------------------------------------------------------------- */}
          <div className="w-1/2 text-center h-screen">
            <div className="w-full h-[300px]  ">
              <div className="w-full flex h-1/2">
                <div className="avatar-container">
                  <div className="relative inline-flex justify-center w-10 h-10 overflow-hidden bg-green-500 rounded-full">
                    <span className="font-medium text-white text-center flex text-2xl">
                      {username[0] + username[1]}
                    </span>
                  </div>
                </div>
                <textarea
                  id="postarea"
                  className="tweetpost shadow-sm relative"
                  placeholder="What happened today ?"
                  onChange={(element) => setTextArea(element.target.value)}
                  maxLength="150"
                  value={textarea}
                ></textarea>
              </div>
              <Flex justifyContent="end" fontWeight="semibold">
                {textarea.length}/150
              </Flex>

              <div className="flex justify-between items-center w-full  text-2xl  mt-3">
                <div className="flex">
                  <BsImage className="mx-3 text-green-500" />
                  <BsMic className="mx-3 text-green-500" />
                  <BsEmojiSmile className="mx-3 text-green-500" />
                </div>
                <button
                  type="button"
                  className="text-center rounded-xl bg-green-500 text-xl text-white py-2 px-3 shadow-md hover:opacity-60"
                  onClick={btnTweet}
                >
                  Share
                </button>
              </div>
              <hr className=" flex mx-auto h-1 w-11/12 my-4"></hr>
              <p className=" w-full text-5xl text-left opacity-10 font-bold pl-5">
                Whats happening
              </p>
            </div>

            {/* --------------------------------------------------------------------------------------------------------- */}
            {/* card baut tweet */}
            <Flex flexDirection="column" alignItems="center">
              {printTweet()}
            </Flex>
          </div>
          {/* ----------------------------------------------------------------------------------- */}
          <div className="w-1/4">
            <div className="w-full  shadow-md rounded-xl ml-5 flex flex-col items-center">
              <span className="w-4/5 flex justify-start py-4 text-2xl font-bold">
                Who to Follow
              </span>
              {printUser()}
              <button
                type="button"
                className=" text-xl text-blue-500 flex justify-center py-2 hover:opacity-60"
                onClick={showMore}
              >
                Show More
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------------------------------------- */}
        </>
      )}
    </section>
  );
}

export default Landing;
