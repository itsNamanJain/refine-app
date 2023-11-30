import { useEffect, useState } from "react";
import { HttpError, useForm } from "@refinedev/core";

import { PowerBiType } from "../index";

type FormValues = Omit<PowerBiType, "id">;

const Create: React.FC = () => {
  const { formLoading, onFinish, queryResult } = useForm<
    PowerBiType,
    HttpError,
    FormValues
  >({
    meta: {
      fields: ["id", "report_id", "email"],
    },
  });
  const defaultValues = queryResult?.data?.data;

  const [formValues, seFormValues] = useState<FormValues>({
    report_id: defaultValues?.report_id || "",
    email: defaultValues?.email || "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    seFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFinish(formValues);
  };

  useEffect(() => {
    seFormValues({
      report_id: defaultValues?.report_id || "",
      email: defaultValues?.email || "",
    });
  }, [defaultValues]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-2/3 flex flex-col border px-6 py-6 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-1 bg-blueGray-50 w-full">
            <p className="text-lg font-bold w-full text-center mb-3">
              Create PowerBi User
            </p>
            <div className="flex w-full items-center my-2">
              <label className="text-sm font-bold mr-4">Report Id:</label>
              <input
                type="text"
                id="report_id"
                name="report_id"
                value={formValues.report_id}
                onChange={handleOnChange}
                placeholder="Report ID"
                className="shadow text-sm font-medium border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex w-full items-center my-2">
              <label className="text-sm font-bold mr-4">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleOnChange}
                placeholder="Email"
                className="shadow text-sm font-medium border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              disabled={formLoading}
              className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              {formLoading && <div>Loading...</div>}
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
