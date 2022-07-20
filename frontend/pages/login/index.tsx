import axios from "axios";
import { LoginForm } from "components/LoginForm";
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
    <div className="pt-[96px]">
      <form
        onSubmit={(e) => onLoginHandler(e)}
        className="w-full max-w-lg justify-self-center"
      >
        <LoginForm formData={formData} setFormData={setFormData} />
        <button
          type="submit"
          className="w-full bg-main1 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded-2xl focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;
