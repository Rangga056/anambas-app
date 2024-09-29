'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';

// Ini masih sementara/ temporary
const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState('');  
  const [successMessage, setSuccessMessage] = useState('');  

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setErrorMessage(''); 
    setSuccessMessage(''); 

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (data.password !== data['verify-password']) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', data);
      setSuccessMessage("Registration successful!");
      console.log(response.data); 
    } catch (error) {
      if (error.response && error.response.data) {
  
        setErrorMessage(error.response.data.message || "Registration failed.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <main className="container w-full min-h-screen flex items-center justify-center">
      <div className="rounded-lg border-slate-700 border p-10 pt-6">
        <div>
          <h1 className="my-8 text-3xl text-center w-full font-semibold">
            Register Form
          </h1>
        </div>
         {/* Erorr Message */}
         {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        {/* Succes Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Success:</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        {/* Register Form */}
        <form onSubmit={handleSubmit} method="post">
          {/* Username */}
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <Input
            type="text"
            id="username"
            name="username"
            className="border border-black my-4 w-[350px]"
            required
          />

          {/* Email */}
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            className="border border-black my-4 w-[350px]"
            required
          />

          {/* Password */}
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            className="border border-black my-4 w-[350px]"
            required
          />

          {/* Verify Password */}
          <label htmlFor="verify-password" className="font-semibold">
            Verify Password
          </label>
          <Input
            type="password"
            id="verify-password"
            name="verify-password"
            className="border border-black my-4 w-[350px]"
            required
          />

          {/* Register button */}
          <div className="w-full flex items-center justify-center mt-10">
            <Button
              type="submit"
              className="hover:border-2 border-black font-semibold hover:text-black hover:bg-transparent transition-colors"
              size="lg"
            >
              Register
            </Button>
          </div>
        </form>
        <div>
          <h3 className="my-8 text-center w-full font-medium">
            Have Account? Login{" "}
            <Link
              href={"/dashboard/login"}
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

export default RegisterPage;