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
  limit: 1,
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
      <div className="pt-[96px]">
        <form
          onSubmit={(e) => onCreateHandler(e)}
          className="w-full max-w-lg justify-self-center"
        >
          <CreatePartyForm formData={formData} setFormData={setFormData} />
          <button
            type="submit"
            className="w-full bg-main1 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded-2xl focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </form>
      </div>
    </RequireAuth>
  );
};
export default CreateParty;
