import axios from "axios";
import { CreatePartyForm } from "components/CreatePartyForm";
import { LoginForm } from "components/LoginForm";
import RequireAuth from "components/RequireAuth";
import { API_ENDPOINT } from "config";
import Router from "next/router";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserState,
  loginSuccess,
  setUserDetails,
} from "store/user/userSlice";
import { CreateFormDataType } from "types";

const InitFormData: CreateFormDataType = {
  name: "",
  description: "",
  limit: 2,
};

const CreateParty = () => {
  const [formData, setFormData] = useState<CreateFormDataType>(InitFormData);
  const { token, email } = useSelector(getUserState);
  async function onCreateHandler(e) {
    e.preventDefault();
    console.log(formData);
    const response = await axios
      .post(
        `${API_ENDPOINT}/party`,
        {
          email: email,
          createPartyDto: {
            name: formData.name,
            description: formData.description || "",
            limit: formData.limit,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
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
    <RequireAuth>
      <div className="z-0 pt-[96px] pb-16">
        <h2 className="text-[36px] font-bold  pb-3 text-white">Create </h2>
        <div className="p-20 rounded-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  border border-gray-200 border-opacity-30 shadow-2xl">
          <form
            onSubmit={(e) => onCreateHandler(e)}
            className="sm:w-[360px] md:w-[480px] lg:w-[740px] justify-self-center "
          >
            <CreatePartyForm formData={formData} setFormData={setFormData} />
            <button
              type="submit"
              className="w-full text-white bg-gray-200/20 hover:bg-gray-200/30 font-bold py-2 px-4 mt-5 rounded-2xl border border-gray-200 border-opacity-40 "
            >
              Create Party
            </button>
          </form>
        </div>
      </div>
    </RequireAuth>
  );
};
export default CreateParty;
