import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../Helper";
import FormInputLabel from "../Components/Form";

function Register() {
  const Navigate = useNavigate();

  const [User, setUser] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Pass, setPass] = React.useState("");
  const [Type, setType] = React.useState("password");

  const onRegister = async () => {
    try {
      if (User === "" || Email === "" || Pass === "") {
        alert("Tolong isi semua form");
      } else {
        let responseGet = await axios.get(
          `http://localhost:2200/user?email=${Email}`
        );
        if (responseGet.data.length > 0) {
          alert("email already exists");
        } else {
          let domain = /\.(com|id|co.id|org|gov|ac.id|my.id|xyz|tv)/;
          if (Email.includes("@") && Email.match(domain)) {
            let responsePost = axios.post(`${API_URL}user`, {
              username: User,
              password: Pass,
              email: Email,
              status: "unverified",
              imgProfile: "",
              role: "user",
            });
            console.log(responsePost.data); // buat ngecek data
            // dalam kasus ini id akan muncul ketika data sudah berhasil masuk sistem
            // if dibawah untuk mengecek apakah id sudah ada atau tidak
            if (responsePost.data.id) {
              alert("data berhasil ditambah");
            } else {
              alert("registration failed");
            }
          } else {
            alert("Enter a valid mail");
          }
        }
      }
    } catch (error) {
      console.log();
    }
  };

  const showPassword = () => {
    let temp = Type;

    if (temp === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="md:w-full w-[95vw] sm:max-w-sm mx-auto mt-[85px] p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 md:my-56">
      <form className="space-y-6" action="#">
        <h5 className="text-2xl font-bold text-gray-900 ">Register Account</h5>
        <div className="text-sm font-medium text-gray-500">
          Already have an account?
          <span
            className="text-green-700 hover:underline dark:text-blue-500 ml-2"
            onClick={() => Navigate("/")}
          >
            Login
          </span>
          {/* <a href="#" className="text-green-700 hover:underline dark:text-blue-500">Login</a> */}
        </div>

        <FormInputLabel
          type="text"
          onChange={(element) => setUser(element.target.value)}
          placeholder="Enter username"
        >
          Username
        </FormInputLabel>
        {/* <div>
          <label
            for="user"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Username
          </label>
          <input
            type="text"
            name="user"
            id="user"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(element) => setUser(element.target.value)}
            required
          />
        </div> */}
        <FormInputLabel
          type="text"
          onChange={(element) => setEmail(element.target.value)}
          placeholder="Enter Email"
        >
          Email
        </FormInputLabel>

        <div>
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <div className="flex border border-gray-300 rounded-lg">
            <input
              type={Type}
              name="password"
              id="password"
              className="bg-gray-50 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 border-none focus:border-blue-500 block p-2.5 w-full"
              required
              onChange={(element) => setPass(element.target.value)}
            />
            {Type === "password" ? (
              <button
                type="button"
                className="rounded-lg px-2"
                onClick={() => showPassword()}
              >
                {" "}
                <AiFillEye />
              </button>
            ) : (
              <button
                type="button"
                className="rounded-lg px-2"
                onClick={() => showPassword()}
              >
                {" "}
                <AiFillEyeInvisible />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-start md:justify-end">
          <div className="flex items-start"></div>
        </div>
        <button
          type="register"
          className="w-full text-white bg-green-500 hover:text-green-500 hover:bg-white border border-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 hover:opacity-50"
          onClick={() => onRegister()}
        >
          Register
        </button>

        <button
          type="googleregister"
          className="w-full md:h-[40px] border flex justify-center items-center text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 hover:opacity-50"
        >
          <div className="w-1/6 items-start">
            <img
              src="https://th.bing.com/th/id/OIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj?pid=ImgDet&rs=1"
              alt="google-icon"
            />
          </div>
          Sign up with google
        </button>
      </form>
    </div>
  );
}

export default Register;
