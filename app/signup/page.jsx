"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import userContext from "../context/userContext";
import toast, { Toaster } from "react-hot-toast";
import { signUpAction } from "../actions/authActions";
import { useRouter } from "next/navigation";

const page = () => {
  const { name, setName, email, setEmail, password, setPassword } =
    useContext(userContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formData = {
    name,
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signUpAction(formData);
      if (result.success) {
        router.push("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full font-[Geist] h-screen bg-zinc-900 text-white flex items-center justify-center">
        <Toaster />
        <form
          className="bg-white text-black rounded p-5 w-96 h-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-xl ">Welcome To My App.</h1>
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name..."
              id="name"
              type="text"
              className="bg-transparent outline-none border-gray-500 border h-12 rounded p-2"
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email..."
              id="email"
              type="email"
              className="bg-transparent outline-none border-gray-500 border h-12 rounded p-2"
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="pass">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password..."
              id="pass"
              type="password"
              className="bg-transparent outline-none border-gray-500 border h-12 rounded p-2"
            />
          </div>
          <div className="btn w-full mt-3 flex items-center justify-end">
            <button
              disabled={loading}
              className="px-6 disabled:cursor-not-allowed disabled:bg-zinc-500 py-2 bg-black text-white rounded transition-all duration-300 hover:bg-zinc-900"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
          <Link
            className="text-center underline w-full flex items-center justify-center mt-3"
            href="/login"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default page;
