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
      .post(`${API_ENDPOINT}auth/register`, {
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
    <div className="pt-[96px] ">
      Register
      <form
        onSubmit={(e) => onLoginHandler(e)}
        className="w-full max-w-lg justify-self-center"
      >
        <RegisterForm formData={formData} setFormData={setFormData} />
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
export default Register;
