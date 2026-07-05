"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ATSScoreCard from "@/src/components/ats/ATSScoreCard";
import SectionScores from "@/src/components/ats/SectionScores";
import StrengthsCard from "@/src/components/ats/StrengthsCard";
import WeaknessesCard from "@/src/components/ats/WeaknessesCard";
import MissingSkillsCard from "@/src/components/ats/MissingSkillsCard";
import RecommendationsCard from "@/src/components/ats/RecommendationsCard";
import ImprovementReportCard from "@/src/components/ats/ImprovementReportCard";
import { ATSAnalysis } from "@/src/types/ats";
import {
  analyzeResume,
  uploadResume,
  getAnalysisHistory,
} from "@/src/services/api";

function getATSVerdict(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent Match",
      color: "text-green-600",
    };
  }

  if (score >= 75) {
    return {
      label: "Strong Match",
      color: "text-blue-600",
    };
  }

  if (score >= 60) {
    return {
      label: "Moderate Match",
      color: "text-yellow-600",
    };
  }

  return {
    label: "Weak Match",
    color: "text-red-600",
  };
}

export default function DashboardPage() {

    const router = useRouter();

    const [analysis, setAnalysis] =
    useState<ATSAnalysis | null>(null);

    const [expandedAnalysisId, setExpandedAnalysisId] =
    useState<number | null>(null);

    const [loading, setLoading] =
    useState(false);

    const [resume, setResume] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    type AnalysisHistory = {
        id: number;
        keyword_score: number | null;
        structure_score: number | null;
        skills_score: number | null;
        ai_review_score: number | null;
        ats_score: number;
        analysis_feedback: string | null;
        resume_text: string;
        job_description: string;
        created_at: string;
    };
    
    const [history, setHistory] = useState<AnalysisHistory[]>([]);

    useEffect(() => {
        const token =
            localStorage.getItem("access_token")
            getAnalysisHistory()
            .then(setHistory)
            .catch(console.error);

        if (!token) {
            router.push("/login");
        }
    }, [router]);

    function logout() {
        localStorage.removeItem(
            "access_token"
        );

        window.location.href = "/login";
    }

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
return (
    <main className="mx-auto max-w-6xl bg-gray-100 p-8 min-h-screen">

        <div className="mb-8 flex items-center justify-between">

            <div>
                <h1 className="text-lg font-semibold text-gray-900">
                    ATS Analysis Dashboard
                </h1>

                <p className="leading-relaxed text-gray-700">
                    Resume evaluation and career coaching insights.
                </p>
            </div>

            <button
                onClick={logout}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
                Logout
            </button>

        </div>

        <div className="mb-6 space-y-4">
            <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume here..."
                className="w-full rounded-lg border p-3 text-gray-900"
                rows={8}
            />


        <div className="mb-4">
            <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
                className="block w-full text-sm text-gray-700"
            />
        </div>

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
                <h2 className="text-lg font-semibold text-gray-900">
                No Analysis Generated Yet
                </h2>

                <p className="leading-relaxed text-gray-700">
                Paste a resume and job description above, then click
                &quot;Run ATS Analysis&quot;.
                </p>
            </div>
            )}

        <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
                Analysis History
            </h2>

        {history.map((item, index) => {
            const versionNumber = history.length - index;

            const previousScore =
                history[index + 1]?.ats_score;

            const scoreDifference =
                previousScore !== undefined
                    ? item.ats_score - previousScore
                    : null;

            const isLatest = index === 0;

            return (
            <div
            key={item.id}
            className="mt-3 rounded border bg-white p-4 shadow"
            >
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-900">
                Resume Version {versionNumber}
            </p>

            {isLatest && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                    Latest
                </span>
            )}
        </div>

            <span
                className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${
                item.ats_score >= 90
                    ? "bg-green-500"
                    : item.ats_score >= 75
                    ? "bg-blue-500"
                    : item.ats_score >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
            >
                {item.ats_score}
            </span>
            </div>

            <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    item.ats_score >= 90
                    ? "bg-green-100 text-green-700"
                    : item.ats_score >= 75
                    ? "bg-blue-100 text-blue-700"
                    : item.ats_score >= 60
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
                >
                {getATSVerdict(item.ats_score).label}
                </span>

                {scoreDifference !== null && scoreDifference !== 0 && (
                    <p
                        className={`mt-2 text-sm font-medium ${
                            scoreDifference >= 0
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {scoreDifference >= 0 ? "▲" : "▼"}{" "}
                        {Math.abs(scoreDifference)} ATS points
                        from previous version
                    </p>
                )}

            <p className="mt-1 text-sm text-gray-500">
                {new Date(
                item.created_at
                ).toLocaleDateString()}
            </p>

            <button
            onClick={() =>
                setExpandedAnalysisId(
                expandedAnalysisId === item.id
                    ? null
                    : item.id
                )
            }
            className="mt-3 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
            {expandedAnalysisId === item.id
                ? "Hide Report"
                : "View Full Report"}
            </button>

            {expandedAnalysisId === item.id && (
            <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900">
                Feedback
                </h3>

            <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900">
                ATS Score Breakdown
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-4">

                <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-sm text-gray-600">
                    Keyword Match
                </p>
                <p className="text-2xl font-bold text-gray-900">
                    {item.keyword_score ?? 0}
                </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm text-gray-600">
                    Structure
                </p>
                <p className="text-2xl font-bold text-gray-900">
                    {item.structure_score ?? 0}
                </p>
                </div>

                <div className="rounded-lg bg-yellow-50 p-3">
                <p className="text-sm text-gray-600">
                    Skills
                </p>
                <p className="text-2xl font-bold text-gray-900">
                    {item.skills_score ?? 0}
                </p>
                </div>

                <div className="rounded-lg bg-purple-50 p-3">
                <p className="text-sm text-gray-600">
                    AI Review
                </p>
                <p className="text-2xl font-bold text-gray-900">
                    {item.ai_review_score ?? 0}
                </p>
                </div>

            </div>
            </div>

                <p className="mt-2 leading-relaxed text-gray-700">
                {item.analysis_feedback}
                </p>

                <div className="mt-6">
                <h3 className="font-semibold text-gray-900">
                Resume
                </h3>

                <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border bg-white p-4 whitespace-pre-wrap text-gray-700 shadow-sm">
                   {item.resume_text}
                </div>

                <div className="mt-6">
                <h3 className="font-semibold text-gray-900">
                    Job Description
                </h3>
                <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border bg-white p-4 whitespace-pre-wrap text-gray-700 shadow-sm">
                    {item.job_description}
                </div>
                </div>
                </div>
            </div>
            )}
            </div>
        );
})}
        </div>

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
