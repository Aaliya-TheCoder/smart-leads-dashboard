import {
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../api/axios";

import {
  AuthContext,
} from "../contexts/AuthContext";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useContext(
      AuthContext
    );

  const [formData,
    setFormData] =
    useState({

      email: "",

      password: "",
    });

  // HANDLE INPUT CHANGE

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE LOGIN

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const res =
        await API.post(
          "/auth/login",
          formData
        );

      console.log(res.data);

      // SAVE TOKEN

      login(
        res.data.token
      );

      // SAVE ROLE

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      // GO TO DASHBOARD

      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Login Failed"
      );
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <form
        onSubmit={handleSubmit}

        className="
          bg-white
          p-8
          rounded-2xl
          shadow-2xl
          w-96
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-center
            mb-8
            text-gray-800
          "
        >

          Login

        </h1>

        {/* EMAIL */}

        <input
          type="email"

          name="email"

          placeholder="Email"

          value={formData.email}

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            p-3
            rounded-lg
            mb-4
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* PASSWORD */}

        <input
          type="password"

          name="password"

          placeholder="Password"

          value={formData.password}

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            p-3
            rounded-lg
            mb-6
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* LOGIN BUTTON */}

        <button
          className="
            w-full
            bg-black
            hover:bg-gray-800
            text-white
            p-3
            rounded-lg
            transition
            duration-300
          "
        >

          Login

        </button>

        {/* REGISTER LINK */}

        <p
          className="
            text-center
            mt-4
          "
        >

          Don't have an account?

          <span
            onClick={() =>
              navigate(
                "/register"
              )
            }

            className="
              text-blue-500
              cursor-pointer
              ml-1
              hover:underline
            "
          >

            Register

          </span>

        </p>

      </form>

    </div>
  );
};

export default Login;