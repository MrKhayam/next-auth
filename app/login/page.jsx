"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import userContext from "../context/userContext";
import { signInAction } from "../actions/authActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const { email, setEmail, password, setPassword } = useContext(userContext);
  const [loading, setLoading] = useState(false);

    const router = useRouter();
  const handleSignIn = async (e) => {
    setLoading(true);
    try {
        e.preventDefault();
        const formData = { email, password };

        const result = await signInAction(formData);

        console.log(result);
        if (result.success) {
          router.push("/");
        }
    } catch (error) {
        console.log(error);
        toast.error(result.message);
    } finally{
        setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full font-[Geist] h-screen bg-zinc-900 text-white flex items-center justify-center">
        <form
          className="bg-white text-black rounded p-5 w-96 h-auto"
          onSubmit={handleSignIn}
        >
          <h1 className="text-center text-xl ">Login to Your Account</h1>
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email..."
              id="email"
              type="text"
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
              type="text"
              className="bg-transparent outline-none border-gray-500 border h-12 rounded p-2"
            />
          </div>
          <div className="btn w-full mt-3 flex items-center justify-end">
            <button
              disabled={loading}
              className="px-6 disabled:cursor-not-allowed disabled:bg-zinc-500 py-2 bg-black text-white rounded transition-all duration-300 hover:bg-zinc-900"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <Link
            className="text-center underline w-full flex items-center justify-center mt-3"
            href="/signup"
          >
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </>
  );
};

export default page;
