import { RegisterForm } from "components/RegisterForm";
import { API_ENDPOINT } from "config";
import React, { useState, useEffect } from "react";
import { AuthFormDataType } from "types";
const initialAuthFormData = {
  email: "",
  password: "",
};
const Register = () => {
  const [formData, setFormData] =
    useState<AuthFormDataType>(initialAuthFormData);
  async function handleFormSumbit(e) {
    e.preventDefault();
    console.log(formData);
    // call POST {API_ENDPOINT}/auth/register
  }
  return (
    <div className="pt-[96px] ">
      Register
      <form
        onSubmit={(e) => handleFormSumbit(e)}
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
