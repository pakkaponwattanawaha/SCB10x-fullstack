import axios from "axios";
import { useDispatch, useSelector } from "../store";
import { API_ENDPOINT } from "config";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { getUserState, loginSuccess } from "store/user/userSlice";
import RequireAuth from "components/RequireAuth";

export async function getServerSideProps(context) {
  const response = await axios
    .get(`http://127.0.0.1:3333/api/v1/party`, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNTE1ZjljOTdmZjA4OTE4NzdjYWUzIiwiZW1haWwiOiJhZG1pbjRAZ21haWwuY29tIn0sImlhdCI6MTY1ODIyNTY3MywiZXhwIjoxNjU4MzEyMDczfQ.f3-vEA0unkKQgvDSNWJE-0yaLGB0JfBSIpnZ_UTDtWY",
      },
    })
    .then((response) => {
      console.log("GET party", response);
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return {
    props: {
      parties: response.data,
    },
  };
}

const Home: NextPage = ({ parties }: any) => {
  console.log(parties);

  return (
    <RequireAuth>
      <div className="pt-[96px]">
        Home
        {parties ? (
          parties.map((party, idx) => {
            return (
              <div className="p-2 border-2" key={idx}>
                {" "}
                {JSON.stringify(party)}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </RequireAuth>
  );
};

export default Home;
