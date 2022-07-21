import React, { useState } from "react";
import { RegisterFormDataType } from "types";
import { Dispatch, SetStateAction } from "react";
export const RegisterForm = ({
  formData,
  setFormData,
}: {
  formData: RegisterFormDataType;
  setFormData: Dispatch<SetStateAction<RegisterFormDataType>>;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      {" "}
      <div className="grid pt-6 xl:grid-cols-1 xl:gap-6">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-[18px] font-bold  text-white-900 dark:text-white-400"
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
              className="block py-2.5 px-0 w-full text-m text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-purple-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
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
            className="block text-[18px] font-bold  text-white-900 dark:text-white-400"
          >
            Password
          </label>
          <div className="relative w-full inline-flex items-center">
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
              className="py-2.5 px-0 w-full text-m text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-purple-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
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
      <div className="grid pt-6 xl:grid-cols-1 xl:gap-6">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-[18px] font-bold  text-white-900 dark:text-white-400"
          >
            Confirm Password
          </label>
          <div className="relative w-full inline-flex items-center">
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              value={formData?.confirmPassword}
              type={visible ? "text" : "password"}
              autoComplete="new-password"
              name="floating_last_name"
              id="floating_last_name"
              className="py-2.5 px-0 w-full text-m text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
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
          {formData?.confirmPassword !== formData?.password ? (
            <div className="pt-2 text-xs text-red-400">
              Password must be same!
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
