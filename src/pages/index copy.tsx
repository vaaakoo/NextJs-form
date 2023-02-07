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
      } else if (values.password.length < 12) {
        errors.password = "Password must be 12 characters or longer";
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
      formik.resetForm();
      setAye(false);
    },
  });

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAye(true);
    formik.handleChange(event);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAye(false);
    formik.handleChange(event);
  };

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            {aye ? (
              <Image src={close} alt="open" />
            ) : (
              <Image src={open} alt="open" />
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
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
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword">ConfirmPassword</label>
            <input
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

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
