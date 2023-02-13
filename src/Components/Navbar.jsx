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
    <nav className="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="w-[63vw] flex flex-wrap items-center justify-between mx-auto">
        <span className="flex items-center">
          <span className="self-center text-2xl font-bold whitespace-nowrap hover:opacity-30 ">
            Social
          </span>
        </span>

        <div className="flex md:order-2">
          {/* <Link type="button" to="/" className="text-white hover:text-green-500 bg-green-500 hover:bg-opacity-20 border border-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-2">
          Login
        </Link> */}
          {/* =================================================================================================================================================== */}

          {props.loading ? (
            <Spinner />
          ) : !username ? (
            <>
              <button
                type="button"
                className="text-white hover:text-green-500 bg-green-500 hover:bg-opacity-20 border border-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-2"
                onClick={() => navigate("/")}
              >
                Login
              </button>

              <button
                type="button"
                className="text-white hover:text-green-500 bg-green-500 hover:bg-opacity-20 border border-green-500 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
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
              {/* <div className="text-green-500 border border-green-500 rounded-full">
                <Dropdown color="white" label={username} dismissOnClick={false}>
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(logoutAction());
                      navigate("/");
                    }}
                  >
                    Log out
                  </Dropdown.Item>
                </Dropdown>
              </div> */}
            </>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {/* di sini klo mau tambah navbar yg tombol */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
