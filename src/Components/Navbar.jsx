import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/SocioAction";
import { BsChevronDown } from "react-icons/bs";
import { Button, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Spinner from "./Spinner";
import { Menu } from "@chakra-ui/react";

function Navbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //mengambil data dari globalStore reducer ---->SocioReducer
  const username = useSelector((state) => state.SocioReducer.username);

  return (
    <nav className=" bg-white px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className=" max-w-7xl flex flex-wrap items-center justify-between mx-auto ">
        <span className="flex items-center self-center text-2xl font-bold whitespace-nowrap hover:opacity-30 cursor-pointer ">
          Social
        </span>

        <div className="flex md:order-2 font-semibold text-sm ">
          {props.loading ? (
            <Spinner />
          ) : !username ? (
            <>
              <button
                type="button"
                className="bg-white hover:text-white text-green-500  hover:bg-green-500 border border-green-500 rounded-lg px-5 py-2.5 text-center mr-3 md:mr-2"
                onClick={() => navigate("/")}
              >
                Login
              </button>

              <button
                type="button"
                className="text-white bg-green-500 hover:bg-green-700 border border-green-500 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center mr-3 md:mr-0"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <Menu>
                <MenuButton
                  bg={"white"}
                  border="1px"
                  borderColor={"green.500"}
                  color={"green.500"}
                  borderRadius={"full"}
                  as={Button}
                  rightIcon={<BsChevronDown />}
                >
                  {username}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(logoutAction());
                      navigate("/");
                    }}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
