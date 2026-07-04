"use client";

import { useState } from "react";
import { signup } from "@/src/services/auth";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    try {
      const result = await signup(
        fullName,
        email,
        password
      );

      console.log(result);

      alert("Account created successfully!");
    } catch (error) {
      console.error(error);

      alert("Signup failed.");
    }
  }

  return (
    <main className="mx-auto max-w-md p-8 min-h-screen bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 placeholder:text-gray-500">
        Create Account
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          className="w-full rounded border p-3 text-gray-900"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded border p-3 text-gray-900"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full rounded border p-3 text-gray-900"
        />

        <button
          onClick={handleSignup}
          className="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}