import Router from "next/router";
import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { getUserDetails, getUserState } from "store/user/userSlice";
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  dispatch(getUserDetails());
  const { token } = useSelector(getUserState);
  if (token == null) {
    Router.push("/login");
  }
  return <>{children}</>;
};

export default RequireAuth;
