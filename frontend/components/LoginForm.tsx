import React from "react";
import { LoginFormDataType } from "types";
import { Dispatch, SetStateAction } from "react";
export const LoginForm = ({
  formData,
  setFormData,
}: {
  formData: LoginFormDataType;
  setFormData: Dispatch<SetStateAction<LoginFormDataType>>;
}) => {
  return (
    <div>
      {" "}
      <div className="grid pt-6 xl:grid-cols-1 xl:gap-6">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-[18px] font-bold  text-gray-900 dark:text-gray-400"
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
              className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>
        </div>
      </div>
      <div className="grid pt-6 xl:grid-cols-1 xl:gap-6"></div>
      <div className="grid pt-6 xl:grid-cols-1 xl:gap-6">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-[18px] font-bold  text-gray-900 dark:text-gray-400"
          >
            Password
          </label>
          <div className="relative inline-flex items-center">
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              value={formData?.password}
              type="password"
              name="floating_last_name"
              id="floating_last_name"
              className="py-2.5 px-0 w-[50px] text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <span className="px-3 text-[16px] font-bold  ">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
