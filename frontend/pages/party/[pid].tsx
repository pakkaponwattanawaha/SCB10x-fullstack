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
  console.log(party);
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
      <div className="pt-[96px] pb-16 ">
        <div className="m-5 p-5 md:p-10 md:m-10 flex flex-col gap-2 rounded-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  border border-gray-200 border-opacity-30 shadow-2xl ">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-bold  text-white">{party.name} </h2>
            {party.owner.email == email ? (
              <div className="p-1.5 rounded-lg border border-gray-200 border-opacity-30 text-xs">
                Owner
              </div>
            ) : (
              <></>
            )}
          </div>
          <h3 className="text-white">
            Party Owner: <span className="font-bold">{party.owner.email}</span>
          </h3>

          <div>
            <h2 className="pb-2">Description</h2>
            <div className="p-2 rounded-xl border border-gray-200 border-opacity-20 overflow-auto overflow-x-hidden min-h-[78px] max-h-[180px] max-w-[1000px] sm:min-w-[420px] md:min-w-[640px] pt-2 ">
              <span className="break-words  text-[14px]">
                {party.description}
              </span>
            </div>
          </div>
          <div>
            <h2 className="pb-2 text-[18px] font-medium text-white">
              Members: {party.members.length}/{party.limit}
            </h2>
            <div className="flex flex-col p-3 rounded-xl border border-gray-200 border-opacity-20 overflow-auto overflow-x-hidden gap-3">
              {party?.members ? (
                party.members.map((member, idx) => {
                  return (
                    <div
                      className="rounded-lg border border-gray-200 border-opacity-10 px-3 py-2 "
                      key={idx}
                    >
                      {member.email}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>

          <button
            onClick={(e) => joinPartyHandler(e)}
            type="button"
            className="w-[150px] text-white bg-gray-200/20 hover:bg-gray-200/30 font-bold py-2 px-4 mt-5 rounded-2xl border border-gray-200 border-opacity-40 "
          >
            Join
          </button>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Pid;
