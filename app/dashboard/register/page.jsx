import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

// Ini masih sementara/ temporary
const RegisterPage = () => {
  return (
    <main className="container w-full min-h-screen flex items-center justify-center">
      <div className="rounded-lg border-slate-700 border p-10 pt-6">
        <div>
          <h1 className="my-8 text-3xl text-center w-full font-semibold">
            Register Form
          </h1>
        </div>
        {/* Register Form */}
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

          {/* email */}
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <Input
            type="email"
            id="email"
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

          {/* verify Passworwd */}
          <label htmlFor="verify-password" className="font-semibold">
            Verify Password
          </label>
          <Input
            type="password"
            id="verify-password"
            className="border border-black my-4 w-[350px]"
          />
        </form>
        {/* Register button */}
        <div className="w-full flex items-center justify-center mt-10">
          <Button
            className="hover:border-2 border-black font-semibold hover:text-black hover:bg-transparent transition-colors"
            size="lg"
          >
            Register
          </Button>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
