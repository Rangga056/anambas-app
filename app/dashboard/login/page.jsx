'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from 'axios';
import { useState } from 'react';

// Ini masih sementara/ temporary

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');  
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage(''); 
    setSuccessMessage(''); 

    const formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      localStorage.setItem('token', response.data.access_token);
      setSuccessMessage("Login successful!");
      navigate('/${id}/admin/dashboard'); 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Username or password is incorrect.");
      } else if (error.response && error.response.data) {
  
        setErrorMessage(error.response.data.message || "Login failed.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      console.error(error); 
    }
  };
  return (
    <main className="container w-full h-screen flex items-center justify-center">
      <div className="rounded-lg border-slate-700 border p-10 pt-6">
        <div>
          <h1 className="my-8 text-3xl text-center w-full font-semibold">
            Login Form
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
        {/* Login Form */}
        <form onSubmit={handleSubmit} method="post">
          {/* Username */}
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <Input
            type="text"
            id="username"
            className="border border-black my-4 w-[350px]"
            required
          />

          {/* Passworwd */}
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Input
            type="password"
            id="password"
            className="border border-black my-4 w-[350px]"
            required
          />
          {/* Login button */}
          <div className="w-full flex items-center justify-center mt-10">
            <Button
              type="submit"
              size="lg"
              className="hover:border-2 border-black font-semibold hover:text-black hover:bg-transparent transition-colors"
            >
              Login
            </Button>
          </div>
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
