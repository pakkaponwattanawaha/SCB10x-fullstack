import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { PartyDetails } from "types";
import RequireAuth from "components/RequireAuth";
import { useSelector, useDispatch } from "react-redux";

import { getUserDetails, getUserState } from "store/user/userSlice";
import { API_ENDPOINT } from "config";
export async function getServerSideProps({ query }) {
  const partyId = query.pid;
  const response = await axios
    .get(`http://127.0.0.1:3333/api/v1/party/${partyId}`)
    .then((response) => {
      // console.log("GET party", response);
      // console.log(response.data);
      return response;
    })
    .catch((error) => {
      // console.log(error);
      return error;
    });
  return {
    props: {
      party: response.data,
    },
  };
}

const Pid: NextPage = ({ party }: any) => {
  const { email, token } = useSelector(getUserState);
  const joinPartyHandler = async (e) => {
    e.preventDefault();
    const response = await axios
      .patch(
        `${API_ENDPOINT}/party`,
        {
          id: party._id,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        location.reload();
        return response;
      })
      .catch((error) => {
        if (error.response) alert(error.response.data.message);
        console.log(error.response);
        return error;
      });
  };

  return (
    <RequireAuth>
      <div className="pt-[96px]">
        <div>Party:{JSON.stringify(party)}</div>
        <button onClick={(e) => joinPartyHandler(e)}>Join</button>
      </div>
    </RequireAuth>
  );
};

export default Pid;
