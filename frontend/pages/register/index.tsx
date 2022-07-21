import axios from "axios";
import { RegisterForm } from "components/RegisterForm";
import { API_ENDPOINT } from "config";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import { RegisterFormDataType } from "types";

const initialFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [formData, setFormData] =
    useState<RegisterFormDataType>(initialFormData);

  async function onLoginHandler(e) {
    e.preventDefault();
    if (formData?.confirmPassword !== formData?.password) {
      alert("Password must be the same!! ");
      return;
    }

    console.log(formData);
    await axios
      .post(`${API_ENDPOINT}/auth/register`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log("response", response);
        Router.push("/login");
        return response;
      })
      .catch((error) => {
        if (error.response) alert(error.response.data.message);
        console.log(error.response);
        return error;
      });
  }
  return (
    <div className="pt-[96px] pb-16">
      <h2 className="text-[36px] font-bold  pb-3 text-white">Register </h2>
      <div className="pt-10 pb-20 px-20 rounded-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  border border-gray-200 border-opacity-20 shadow-2xl">
        <form
          onSubmit={(e) => onLoginHandler(e)}
          className="sm:w-[360px] md:w-[480px] lg:w-[740px] max-w-lg justify-self-center z-50"
        >
          <RegisterForm formData={formData} setFormData={setFormData} />
          <button
            type="submit"
            className="w-full text-white bg-gray-200/20 hover:bg-gray-200/30 font-bold py-2 px-4 mt-5 rounded-2xl border border-gray-200 border-opacity-40 "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
