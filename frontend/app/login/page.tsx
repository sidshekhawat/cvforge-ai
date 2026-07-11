"use client";

import { useState } from "react";
import { login } from "@/src/services/auth";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const result = await login(
        email,
        password
      );

      console.log(result);

      localStorage.setItem(
        "access_token",
        result.access_token
      );
      console.log(
        "SAVED TOKEN:",
        localStorage.getItem("access_token")
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      alert("Login failed.");
    }
  }

  return (
    <main className="mx-auto max-w-md p-8 min-h-screen bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 placeholder:text-gray-500">
        Login
      </h1>

      <div className="space-y-4 rounded-xl bg-white p-6 shadow">
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
          onClick={handleLogin}
          className="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </main>
  );
}