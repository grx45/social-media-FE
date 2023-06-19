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
  // const [likes, setLikes] = React.useState([]);

  // step 2. ngambil username dan id dri redux
  // untuk ngambil data dri redux
  const { username, imgProfile } = useSelector((state) => state.SocioReducer);

  // step 3. bikin function utk get post yd di dalam textarea ke json server
  const btnTweet = async () => {
    try {
      if (textarea === "") {
        alert("please fill in posting field");
      } else {
        let token = localStorage.getItem("socio_login");
        await axios.post(
          `${API_URL}user/tweet`,
          { posting: textarea },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
      let response = await axios.get(`${API_URL}user/posts`);
      // console.log("response.data tweet = ", response.data.count);
      setTweetList(response.data.count);
    } catch (error) {
      console.log("error = ", error);
      // console.log(error.response.data.message);
    }
  };

  const getAllUser = async () => {
    try {
      // 1. ambil data dari token dlu
      let token = localStorage.getItem("socio_login");
      if (token) {
        //below buat ambil data dri json server
        let response = await axios.post(
          `${API_URL}user/?limit=${limitval}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserList(response.data.data);
        // console.log("current limit val = ", limitval);
        // console.log("response.data = ", response.data.data);
      }
    } catch (error) {
      console.log("error = ", error);
    }
  };

  const printUser = () => {
    let newArr = userList.map((val) => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa", val);
      return (
        <Userlist
          imgProfile={val.imgProfile}
          id={val.id}
          username={val.username}
          email={val.email}
        />
      );
    });
    return newArr;
  };

  // console.log("limit before click:", limitval);
  const showMore = () => {
    if (limitval === 6) {
      setlimitVal(3);
    } else {
      setlimitVal(6);
    }
    // console.log("limit after click:", limitval);
  };

  // step 6. msukin getalltweet ke useeffect biar saat render smua function dlam useeffect langsung jalan
  React.useEffect(() => {
    getAllUser();
    getAllTweet();
  }, [limitval, username]);

  // step 7. bikin fucntion untuk print feed
  const printTweet = () => {
    let likedByLoggedInUser = [];
    let newArr = tweetlist.map((val) => {
      console.log("hasil dri val utk cari like = ", val);
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
          getAllTweet={getAllTweet}
        />
      );
    });

    return newArr;
  };

  return (
    <section className="max-w-7xl mt-20 flex mx-auto">
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <Sidebarsticky />
          {/* ----------------------------------------------------------------------------------- */}
          <div className=" w-[95%] md:w-3/4 lg:w-3/6 text-center h-screen mx-auto pt-2 px-1 ">
            <div className="w-full h-[300px]  ">
              <div className="w-full flex h-1/2">
                <img
                  className="relative inline-flex justify-center w-16 h-16 rounded-full"
                  src={imgProfile}
                  alt="profile"
                ></img>

                <textarea
                  id="postarea"
                  className="relative"
                  placeholder="What happened today?"
                  onChange={(element) => setTextArea(element.target.value)}
                  maxLength="150"
                  value={textarea}
                ></textarea>
              </div>
              <div className="flex justify-end font-normal">
                {textarea.length}/150
              </div>

              <div className="flex justify-between items-center w-full text-2xl mt-3">
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
            </div>

            {/* --------------------------------------------------------------------------------------------------------- */}
            {/* card untuk tweet */}
            <Flex flexDirection="column" overflowY="hidden">
              {printTweet()}
            </Flex>
          </div>
          {/* ----------------------------------------------------------------------------------- */}
          <div className="w-2/6 hidden lg:block">
            <div className="w-full shadow-md rounded-xl ml-5 flex flex-col items-center">
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
