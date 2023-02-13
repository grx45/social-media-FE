import axios from "axios";
import React from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

function Verify() {
  const params = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // use location buat dapetin pathname stelah main url - kemungkinan buat get active di sidebar

  console.log("value dari params", params);
  // console.log("value dari lcoation", location);

  const onVerify = async () => {
    try {
      let res = await axios.patch(
        // param kedua axios.pathc kosong krena buat akses req.header di backend hrus di parameter ketiga, param keuda untuk req.body
        "http://localhost:2000/expense/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mt-[85px]">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Verify your email address
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia ducimus
        corrupti voluptatibus laboriosam nisi neque. Inventore modi, commodi
        impedit excepturi veritatis velit amet eos alias dolorum quaerat magni
        consequatur officia!
      </p>
      <button
        className="rounded-lg bg-red-500"
        type="button"
        onClick={onVerify}
      >
        click here to verify
      </button>
    </span>
  );
}

export default Verify;
