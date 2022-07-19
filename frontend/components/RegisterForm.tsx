import React from "react";
import { AuthFormDataType } from "types";
import { Dispatch, SetStateAction } from "react";
export const RegisterForm = ({
  formData,
  setFormData,
}: {
  formData: AuthFormDataType;
  setFormData: Dispatch<SetStateAction<AuthFormDataType>>;
}) => {
  return <div>RegisterForm</div>;
};
