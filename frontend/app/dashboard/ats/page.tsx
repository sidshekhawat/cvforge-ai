"use client";

import { useState } from "react";

import { ATSAnalysis } from "@/src/types/ats";

import {
  analyzeResume,
  uploadResume,
} from "@/src/services/api";
import ATSScoreCard from "@/src/components/ats/ATSScoreCard";
import SectionScores from "@/src/components/ats/SectionScores";
import StrengthsCard from "@/src/components/ats/StrengthsCard";
import WeaknessesCard from "@/src/components/ats/WeaknessesCard";
import MissingSkillsCard from "@/src/components/ats/MissingSkillsCard";
import RecommendationsCard from "@/src/components/ats/RecommendationsCard";
import ImprovementReportCard from "@/src/components/ats/ImprovementReportCard";

export default function ATSPage() {

  const [resume, setResume] = useState("");

  const [jobDescription, setJobDescription] =
    useState("");

  const [analysis, setAnalysis] =
    useState<ATSAnalysis | null>(null);

  const [loading, setLoading] =
    useState(false);

async function handleResumeUpload(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  try {
    const extractedText =
      await uploadResume(file);

    setResume(extractedText);
  } catch (error) {
    console.error(error);
    alert("Failed to upload resume.");
  }
}


async function runAnalysis() {
  if (!resume.trim() || !jobDescription.trim()) {
    alert(
      "Please enter both resume and job description."
    );
    return;
  }

  try {
    setLoading(true);

    const result = await analyzeResume(
      resume,
      jobDescription
    );

    setAnalysis(result);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          ATS Analysis
        </h1>

        <p className="mt-2 text-zinc-400">
          Upload your resume and get ATS insights.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Upload Resume
            </h2>

            <div className="space-y-4">

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                placeholder="Paste job description here..."
                className="h-64 w-full rounded-lg bg-zinc-950 p-3 text-white"
              />
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume here..."
                className="h-64 w-full rounded-lg bg-zinc-950 p-3 text-white"
              />

              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
                className="block w-full text-sm text-zinc-400"
              />

              <button
                onClick={runAnalysis}
                disabled={loading}
                className="
                  w-full
                  rounded-lg
                  bg-white
                  px-4
                  py-2
                  font-medium
                  text-black
                "
              >
                {loading
                  ? "Analyzing..."
                  : "Run ATS Analysis"}
              </button>

            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">

          {analysis ? (
          <>
            <ATSScoreCard
              score={analysis.overall_match}
              verdict={analysis.verdict}
            />

            <SectionScores
              skills={analysis.skills_match}
              experience={analysis.experience_match}
              projects={analysis.project_match}
              education={analysis.education_match}
              certifications={analysis.certification_match}
            />

            <StrengthsCard
              strengths={analysis.strengths}
            />

            <WeaknessesCard
              weaknesses={analysis.weaknesses}
            />

            <MissingSkillsCard
              skills={analysis.missing_skills}
            />

            <RecommendationsCard
              recommendations={
                analysis.recommendations
              }
            />

            <ImprovementReportCard
              report={
                analysis.improvement_report
              }
            />
          </>
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">
              No Analysis Yet
            </h2>

            <p className="mt-2 text-zinc-400">
              Paste a resume and job description,
              then click Run ATS Analysis.
            </p>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}