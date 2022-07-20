import axios from "axios";
import { useDispatch, useSelector } from "../store";
import { API_ENDPOINT } from "config";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { getUserState, loginSuccess } from "store/user/userSlice";
import RequireAuth from "components/RequireAuth";
import Link from "next/link";

export async function getServerSideProps(context) {
  const response = await axios
    .get(`${API_ENDPOINT}/party`)
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
              <Link key={idx} href={`/party/${party._id}`}>
                <div className="p-2 border-2">{JSON.stringify(party)}</div>
              </Link>
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
