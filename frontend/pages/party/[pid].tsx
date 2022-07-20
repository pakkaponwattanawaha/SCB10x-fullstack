import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { PartyDetails } from "types";
import RequireAuth from "components/RequireAuth";
import { useSelector, useDispatch } from "react-redux";

import { getUserDetails, getUserState } from "store/user/userSlice";
export async function getServerSideProps({ query }) {
  const partyId = query.pid;
  const response = await axios
    .get(`http://127.0.0.1:3333/api/v1/party/${partyId}`, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNTE1ZjljOTdmZjA4OTE4NzdjYWUzIiwiZW1haWwiOiJhZG1pbjRAZ21haWwuY29tIn0sImlhdCI6MTY1ODIyNTY3MywiZXhwIjoxNjU4MzEyMDczfQ.f3-vEA0unkKQgvDSNWJE-0yaLGB0JfBSIpnZ_UTDtWY",
      },
    })
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

const Pid: NextPage = (party: PartyDetails) => {
  return (
    <RequireAuth>
      <div className="pt-[96px]">Party:{JSON.stringify(party)}</div>
    </RequireAuth>
  );
};

export default Pid;
