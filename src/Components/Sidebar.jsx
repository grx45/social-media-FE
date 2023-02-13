import React from "react";

import { useNavigate } from "react-router-dom";
import { BiHomeSmile, BiNotification, BiMessageAlt } from "react-icons/bi";
import { RxPerson } from "react-icons/rx";

function Sidebarsticky() {
  const Navigate = useNavigate();
  return (
    <aside className="sm:w-1/4  hidden sm:block mr-5" aria-label="Sidebar">
      <div className="px-3 py-4 overflow-y-auto rounded-xl shadow-xl">
        <ul className="flex flex-col items-start">
          <li>
            <button
              onClick={() => Navigate("/landing")}
              className="flex items-center p-3 text-xl font-normal text-gray-900 rounded-lg  hover:bg-gray-100 cursor-pointer "
            >
              <BiHomeSmile />
              <span className="flex-1 ml-3 whitespace-nowrap font-bold">
                Home
              </span>
            </button>
          </li>
          <li>
            <span className="flex items-center p-3 text-xl font-normal text-gray-900 rounded-lg  hover:bg-gray-100 cursor-pointer ">
              <BiNotification />
              <span className="flex-1 ml-3 whitespace-nowrap font-bold">
                Notification
              </span>
            </span>
          </li>
          <li>
            <span className="flex items-center p-3 text-xl font-normal text-gray-900 rounded-lg  hover:bg-gray-100 cursor-pointer ">
              <BiMessageAlt />
              <span className="flex-1 ml-3 whitespace-nowrap font-bold">
                Messages
              </span>
            </span>
          </li>
          <li>
            <span className="flex items-center p-3 text-xl font-normal text-gray-900 rounded-lg  hover:bg-gray-100 cursor-pointer ">
              <RxPerson />
              <span className="flex-1 ml-3 whitespace-nowrap font-bold">
                Profile
              </span>
            </span>
          </li>
        </ul>
        <button
          type="button"
          className=" w-full flex justify-center text-xl text-green-500 border border-green-500 shadow-md rounded-full font-bold py-1 mt-6 hover:bg-gray-100"
        >
          Trending
        </button>
      </div>
    </aside>
  );
}

export default Sidebarsticky;
