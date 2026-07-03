"use client";

import { useState } from "react";
import { analyzeResume } from "@/src/services/api";
import { ATSAnalysis } from "@/src/types/ats";

export default function HomePage() {
  const [result, setResult] = useState<ATSAnalysis | null>(null);

  async function handleTest() {
    try {
      const data = await analyzeResume(
        "Python FastAPI",
        "Python FastAPI PostgreSQL Docker AWS"
      );

      setResult(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="p-8">
      <button
        onClick={handleTest}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Test ATS API
      </button>

      {result && (
        <pre className="mt-6 rounded-lg bg-gray-100 p-4 text-black overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}