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
      <div className="pt-[96px] pb-16">
        <h2 className="mx-5  md:mx-10 text-[36px] font-bold  pb-3 text-white">
          Opening Party{" "}
        </h2>
        <div className="m-5 p-5 md:p-10 md:m-10 rounded-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20  border border-gray-200 border-opacity-30 shadow-2xl">
          <div className="grid grid-cols-1  lg:grid-cols-2 4xl:grid-cols-3  gap-5">
            {parties ? (
              parties.map((party, idx) => {
                return (
                  <div
                    key={idx}
                    className="cursor-pointer rounded-md border border-gray-200 border-opacity-30 shadow-xl shadow-xl w-full max-w-[640px] min-h-[100px]
                    pt-8 p-6 flex flex-col hover:scale-[105%] transition duration-300"
                  >
                    <Link href={`/party/${party._id}`}>
                      <div>
                        <div className="flex items-center justify-between">
                          <h1 className="text-[20px] font-bold">
                            {party.name}
                          </h1>
                          <h3 className="font-md font-bold">
                            {party.members.length}/{party.limit}
                          </h3>
                        </div>

                        <h3 className="text-left font-md">
                          {party.owner.email}
                        </h3>

                        <div className="overflow-hidden h-[52px] pt-2">
                          <p className="break-words text-[14px]">
                            {party.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Home;
