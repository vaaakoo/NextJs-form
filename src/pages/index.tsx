import React, { useState } from "react";
import Image from "next/image";
import open from "../../public/open.png";
import close from "../../public/close.png";
import { useFormik } from "formik";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const Form = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [register, setRegister] = useState({ mail: "", name: "" });
  const [aye, setAye] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be 8 characters or longer";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password does not match";
      }
      if (!values.name) {
        errors.name = "Name is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      setUserName(values.name);
      setRegister({ mail: values.email, name: values.name });
      setShowModal(true);
      formik.resetForm();
      setAye(false);
    },
  });

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setPassword(event.target.value);
    setAye(true);
    formik.handleChange(event);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setPassword(event.target.value);
    setAye(false);
    formik.handleChange(event);
  };

  return (
    <div className="bg-gradient-to-b min-h-screen w-full from-slate-200 via-slate-300 to-slate-400">
      <div className="mx-auto flex flex-row sm:gap-8 justify-center py-2">
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto sm:w-[350px] flex flex-col justify-center gap-2"
        >
          <div className="bg-slate-100 rounded-xl p-8">
            {aye ? (
              <Image
                src={close}
                alt="open"
                className="w-full rounded-xl shadow-md hover:opacity-40 transition"
              />
            ) : (
              <Image
                src={open}
                alt="open"
                className="w-full rounded-xl shadow-md hover:opacity-40 transition"
              />
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow sm:px-4 sm:py-3  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.email ? "border-red-500" : ""
              }`}
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleTextChange}
              // onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              UserName
            </label>
            <input
              className={`shadow sm:px-4 sm:py-3  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.name ? "border-red-500" : ""
              }`}
              id="name"
              type="text"
              placeholder="UserName"
              onChange={handleTextChange}
              // onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow sm:px-4 sm:py-3  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.password ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              // onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className={`shadow sm:px-4 sm:py-3  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.confirmPassword ? "border-red-500" : ""
              }`}
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handlePasswordChange}
              // onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>

        {/* <div className="hidden sm:flex items-center sm:mx-auto">
          Email: {register.mail}
          <br />
          Name: {register.name}
        </div> */}


        {showModal && (
          <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col items-center gap-3">
                <div className="text-lg leading-6 font-medium text-gray-900">
                  Form Submitted
                </div>
                <div className="mt-2 flex flex-col gap-3 items-center">
                  <p className="text-gray-700 font-extrabold text-2xl">
                    {" "}
                    .. {userName} ..{" "}
                  </p>
                  <p className="leading-5 text-gray-500">
                    Your form has been submitted successfully!
                  </p>
                  <Image
                    src="/complate.svg"
                    alt="next"
                    width={60}
                    height={60}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col mx-auto">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-3 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Close
                  </button>
                </span>
              </div>
            </div>
          </div>
        )}
        
      </div>
      <div className="flex text-gray-700 font-mono mx-auto justify-center mt-8">Copyright by @Vaaakoo 2023</div>
    </div>
  );
};

export default Form;
