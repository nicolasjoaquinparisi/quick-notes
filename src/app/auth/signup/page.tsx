"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError((_) => "");
      }, 3000);
    }
  }, [error]);

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const responseJSON = await response.json();

    if (!responseJSON.ok) {
      setError(responseJSON.message);
    }
  });

  return (
    <main className="md:flex md:justify-center md:items-center min-h-screen md: -translate-y-[5%]">
      <div className="w-full max-w-screen md:max-w-sm bg-[#3581B8] md:rounded-md">
        <div className="container mx-auto flex justify-center items-end py-5">
          <h1 className="text-white font-extrabold text-3xl">Sign Up</h1>
        </div>

        <form
          className="md:max-w-sm mx-auto px-5 pt-5 pb-6 bg-gray-100 md:rounded-b-md md:shadow-lg"
          onSubmit={onSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
              {...register("email", {
                required: { value: true, message: "Email required" },
              })}
            />

            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("password", {
                required: { value: true, message: "Password required" },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("confirmPassword", {
                required: { value: true, message: "Confirm password required" },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <small>
              Already register?{" "}
              <Link
                href={"/auth/login"}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Log in
              </Link>
            </small>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`text-white bg-[#3581B8] hover:bg-[#88CCF1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            Register new account
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
