import React, { useState } from "react";
import { LoginFormDataType } from "types";
import { Dispatch, SetStateAction } from "react";
export const LoginForm = ({
  formData,
  setFormData,
}: {
  formData: LoginFormDataType;
  setFormData: Dispatch<SetStateAction<LoginFormDataType>>;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      {" "}
      <div className="grid pt-6 xl:grid-cols-1 xl:gap-6">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-[18px] font-bold  text-white dark:text-white"
          >
            Email
          </label>

          <div className="flex flex-row">
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData?.email}
              type="form"
              step="any"
              min="0"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-800 dark:focus:border-purple-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
          </div>
        </div>
      </div>
      <div className="grid pt-6 xl:grid-cols-1 xl:gap-6">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-[18px] font-bold  text-white dark:text-white"
          >
            Password
          </label>
          <div className="relative inline-flex w-full items-center">
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              value={formData?.password}
              type={visible ? "text" : "password"}
              autoComplete="new-password"
              name="floating_last_name"
              id="floating_last_name"
              className="py-2.5 px-0 w-full text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-800 dark:focus:border-purple-600 focus:outline-none focus:ring-0 focus:border-purple-600 "
              placeholder=" "
              required
            />
            <img
              onClick={() => {
                setVisible(!visible);
              }}
              className="mx-5 w-[16px] mr-2 hover:text-gray-100 cursor-pointer"
              src="/eye.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
