"use client";
import { useState } from "react";
import ATSScoreCard from "@/src/components/ats/ATSScoreCard";
import SectionScores from "@/src/components/ats/SectionScores";
import StrengthsCard from "@/src/components/ats/StrengthsCard";
import WeaknessesCard from "@/src/components/ats/WeaknessesCard";
import MissingSkillsCard from "@/src/components/ats/MissingSkillsCard";
import RecommendationsCard from "@/src/components/ats/RecommendationsCard";
import ImprovementReportCard from "@/src/components/ats/ImprovementReportCard";
import { ATSAnalysis } from "@/src/types/ats";
import { analyzeResume } from "@/src/services/api";

export default function DashboardPage() {

    const [analysis, setAnalysis] =
    useState<ATSAnalysis | null>(null);

    const [loading, setLoading] =
    useState(false);

    const [resume, setResume] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    async function runAnalysis() {

        if (!resume.trim() || !jobDescription.trim()) {
            alert("Please enter both resume and job description.");
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
    <main className="mx-auto max-w-6xl bg-gray-100 p-8 min-h-screen">

        <div className="mb-8">
        <h1 className="text-lg font-semibold text-gray-900">
            ATS Analysis Dashboard
        </h1>

        <p className="leading-relaxed text-gray-700">
            Resume evaluation and career coaching insights.
        </p>
        </div>
        <div className="mb-6 space-y-4">
            <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume here..."
                className="w-full rounded-lg border p-3 text-gray-900"
                rows={8}
            />

            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full rounded-lg border p-3 text-gray-900"
                rows={8}
            />
        </div>
        <button
            onClick={runAnalysis}
            disabled={loading}
            className="mb-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
            {loading ? "Analyzing..." : "Run ATS Analysis"}
        </button>

        {!analysis && (
            <div className="mb-8 rounded-xl border bg-white p-6 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">
                No Analysis Generated Yet
                </h2>

                <p className="mt-2 text-gray-600">
                Paste a resume and job description above, then click
                &quot;Run ATS Analysis&quot;.
                </p>
            </div>
            )}
        {analysis && (
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
            recommendations={analysis.recommendations}
            />

        <ImprovementReportCard
            report={analysis.improvement_report}
            />
        </>
        )}
    </main>
  );
}
