import Router from "next/router";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserDetails, getUserState } from "store/user/userSlice";
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();

  const { token } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  if (token == null) {
    Router.push("/login");
  }
  return <>{children}</>;
};

export default RequireAuth;
