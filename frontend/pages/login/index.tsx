import axios from "axios";
import { LoginForm } from "components/LoginForm";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, setUserDetails } from "store/user/userSlice";
import { LoginFormDataType } from "types";

const InitFormData: LoginFormDataType = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormDataType>(InitFormData);
  const dispatch = useDispatch();
  async function onLoginHandler(e) {
    e.preventDefault();
    console.log(formData);
    await axios
      .post(`http://127.0.0.1:3333/api/v1/auth/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log("response", response);
        dispatch(
          setUserDetails({
            id: response.data.id,
            isLogin: true,
            token: response.data.token,
            email: response.data.email,
          })
        );
        dispatch(
          loginSuccess({
            id: response.data.id,
            isLogin: true,
            token: response.data.token,
            email: response.data.email,
          })
        );
        Router.push("/");
        return response;
      })
      .catch((error) => {
        if (error.response) alert(error.response.data.message);
        console.log(error.response);
        return error;
      });
  }
  return (
    <div className="z-0 pt-[96px] pb-16">
      <h2 className="text-[36px] font-bold  pb-3 text-white ">Login </h2>
      <div className="p-20 rounded-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  border border-gray-200 border-opacity-30 shadow-2xl">
        <form
          autoComplete="off"
          onSubmit={(e) => onLoginHandler(e)}
          className="sm:w-[360px] md:w-[480px] lg:w-[740px] max-w-lg justify-self-center z-50 pb-3"
        >
          <LoginForm formData={formData} setFormData={setFormData} />
          <button
            type="submit"
            className="w-full text-white bg-gray-200/20 hover:bg-gray-200/30 font-bold py-2 px-4 mt-5 rounded-2xl border border-gray-200 border-opacity-40 "
          >
            Login
          </button>
        </form>

        <Link className="flex items-center" href={"/register"} replace>
          <a className={`underline	text-white  text-sm font-medium mr-5 `}>
            Register
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Login;
