import { Input } from "@/@/components/ui/input";
import Link from "next/link";
import React from "react";

// Ini masih sementara/ temporary
const LoginPage = () => {
  return (
    <main className="container w-full h-screen flex items-center justify-center">
      <div className="rounded-lg border-slate-700 border p-10 pt-6">
        <div>
          <h1 className="my-8 text-3xl text-center w-full font-semibold">
            Login Form
          </h1>
        </div>
        {/* Login Form */}
        <form>
          {/* Username */}
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <Input
            type="text"
            id="username"
            className="border border-black my-4 w-[350px]"
          />

          {/* Passworwd */}
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Input
            type="password"
            id="password"
            className="border border-black my-4 w-[350px]"
          />
        </form>
        {/* link to "/register" */}
        <div>
          <h3 className="my-8 text-center w-full font-medium">
            Don't have an account yet? Register{" "}
            <Link
              href={"/dashboard/register"}
              className="text-blue-500 hover:underline underline-offset-1 font-medium"
            >
              Here
            </Link>
          </h3>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
