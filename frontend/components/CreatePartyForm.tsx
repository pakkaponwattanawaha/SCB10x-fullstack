import React from "react";
import { CreateFormDataType } from "types";
import { Dispatch, SetStateAction } from "react";
export const CreatePartyForm = ({
  formData,
  setFormData,
}: {
  formData: CreateFormDataType;
  setFormData: Dispatch<SetStateAction<CreateFormDataType>>;
}) => {
  return (
    <div>
      {" "}
      <div className="grid xl:grid-cols-1 xl:gap-6">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-[18px] font-bold  text-white dark:text-white"
          >
            Party Name
          </label>

          <div className="flex flex-row">
            <input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData?.name}
              type="form"
              step="any"
              min="0"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-m text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-purple-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
          </div>
        </div>
      </div>
      <div className="grid pt-6 xl:grid-cols-1 ">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-[18px] font-bold  text-white dark:text-white"
          >
            Description
          </label>
          <div className="relative w-full inline-flex items-center">
            <textarea
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              value={formData?.description}
              // type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="py-2.5 px-0  w-full text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-purple-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
          </div>
        </div>
        <div className="grid pt-6 xl:grid-cols-1 xl:gap-6">
          <div className="relative z-0 w-full pb-2 group">
            <label
              htmlFor="message"
              className="block text-[18px] font-bold  text-white-900 dark:text-white-400"
            >
              Member Limit
            </label>
            <div className="relative inline-flex items-center">
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    limit: Number(e.target.value),
                  })
                }
                value={formData?.limit}
                type="number"
                min={2}
                max={100}
                name="floating_last_name"
                id="floating_last_name"
                className="py-2.5 px-0 w-[80px] text-m text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-400 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
