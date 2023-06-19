import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { UpdateSocioAction } from "../actions/SocioAction";
import axios from "axios";
import { API_URL } from "../Helper";

function Login() {
  const Navigate = useNavigate();
  const Dispatch = useDispatch(); // buat ngejalanin fungsi action

  const [Email, setEmail] = React.useState("");
  const [Pass, setPass] = React.useState("");
  const [Type, setType] = React.useState("password");

  const onLogin = async () => {
    try {
      let response = await axios.post(`${API_URL}user/login`, {
        email: Email,
        password: Pass,
      });
      console.log("response front end", response);
      localStorage.setItem("socio_login", response.data.token); //buat simpan ke local storage browser untuk keep login
      Dispatch(UpdateSocioAction(response.data));
      Navigate("/landing", { replace: true });
    } catch (error) {
      console.log("error = ", error);
      alert(error.response.data.message);
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
    <div className="my-48 mx-auto max-w-xs md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-8 ">
      <form className="space-y-6" action="#">
        <h5 className="text-2xl font-bold text-gray-900 ">
          Sign in for shoping
        </h5>
        <div className="text-sm font-medium text-gray-500">
          Not have account?
          <span
            className="text-green-700 hover:underline ml-2"
            onClick={() => Navigate("/register")}
          >
            Sign up
          </span>
        </div>

        <div>
          <label
            for="text"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={(element) => setEmail(element.target.value)}
          />
        </div>
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
                <AiFillEye />
              </button>
            ) : (
              <button
                type="button"
                className="rounded-lg px-2"
                onClick={() => showPassword()}
              >
                <AiFillEyeInvisible />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-sm font-medium text-gray-500 mr-2">
            Forgot password?
          </span>
          <span
            className="text-sm text-green-500 hover:underline dark:text-blue-500 cursor-pointer"
            onClick={() => Navigate("/forgot")}
          >
            Click here
          </span>
        </div>
        <button
          type="button"
          className="w-full text-white hover:text-green-500 bg-green-500
        border border-green-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center hover:bg-opacity-20"
          onClick={() => onLogin()}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
