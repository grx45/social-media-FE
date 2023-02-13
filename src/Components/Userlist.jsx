import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Userlist(props) {
  return (
    <div className="w-4/5 my-2 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 font-normal text-2xl flex items-center justify-between">
      <div className="flex">
        <div className="relative inline-flex justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full mr-4">
          <span className="font-medium text-gray-600 flex ">
            {props.avatar}
          </span>
        </div>
        <Link to={`other/${props.id}`}>
          <h5 className=" tracking-tight text-green-500">{props.username}</h5>
        </Link>
      </div>
      <BsFillPersonPlusFill className="text-green-500" />
    </div>
  );
}

export default Userlist;
