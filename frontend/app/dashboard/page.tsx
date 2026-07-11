"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ATSHeroCard from "@/src/components/ats/ATSHeroCard";
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
  optimizeResume,
  generateCoverLetter,
  jobMatchAnalysis,
  generateImprovementRoadmap
} from "@/src/services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


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

    const [optimizedResume, setOptimizedResume] =
    useState("");

    const [coverLetter, setCoverLetter] =
    useState("");

    const [generatingCoverLetter,
        setGeneratingCoverLetter] =
    useState(false);

    type JobMatchResult = {
    match_score: number;
    matched_skills: string[];
    missing_skills: string[];
    recommendations: string[];
    experience_score: number;
    project_score: number;
    education_score: number;
    certification_score: number;
    };

    const [jobMatchResult,
            setJobMatchResult] =
        useState<JobMatchResult | null>(null)

        const [jobMatchLoading,
            setJobMatchLoading] =
        useState(false);

    type RoadmapItem = {
    priority: string;
    title: string;
    impact: number;
    };

    type ImprovementRoadmap = {
    estimated_score: number;
    roadmap: RoadmapItem[];
    };

    const [
    improvementRoadmap,
    setImprovementRoadmap
    ] =
    useState<
    ImprovementRoadmap | null
    >(null);

    const [
    generatingRoadmap,
    setGeneratingRoadmap
    ] =
useState(false);

    const [optimizing, setOptimizing] =
    useState(false);

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

    const totalAnalyses = history.length;

    const bestScore =
        history.length > 0
            ? Math.max(...history.map(item => item.ats_score))
            : 0;

    const chartData = [...history]
        .reverse()
        .map((item, index) => ({
            version: `V${index + 1}`,
            score: item.ats_score,
        }));

    const latestScore =
        history.length > 0
            ? history[0].ats_score
            : 0;

    const averageScore =
        history.length > 0
            ? Math.round(
                history.reduce(
                    (sum, item) => sum + item.ats_score,
                    0
                ) / history.length
            )
            : 0;

    const improvement =
        history.length > 1
            ? latestScore -
            history[history.length - 1].ats_score
            : 0;

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

    const handleOptimizeResume = async () => {
        try {
            setOptimizing(true);

            const result =
            await optimizeResume(
                resume,
                jobDescription
            );

            setOptimizedResume(
            result.optimized_resume
            );
        } catch (error) {
            console.error(error);
        } finally {
            setOptimizing(false);
        }
        };

    const handleGenerateCoverLetter =
        async () => {
            try {
            setGeneratingCoverLetter(true);

            const result =
                await generateCoverLetter(
                resume,
                jobDescription
                );

            setCoverLetter(
                result.cover_letter
            );
            } catch (error) {
            console.error(error);
            } finally {
            setGeneratingCoverLetter(false);
            }
        };

    const handleJobMatchAnalysis =
        async () => {
            try {
            setJobMatchLoading(true);

            const result =
                await jobMatchAnalysis(
                resume,
                jobDescription
                );

            setJobMatchResult(result);

            } catch (error) {
            console.error(error);
            } finally {
            setJobMatchLoading(false);
            }
        };

    const handleGenerateRoadmap =
        async () => {
            try {
            setGeneratingRoadmap(
                true
            );

            const result =
                await generateImprovementRoadmap(
                resume,
                jobDescription
                );

            setImprovementRoadmap(
                result
            );

            } catch (error) {
            console.error(error);
            } finally {
            setGeneratingRoadmap(
                false
            );
            }
        };

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

        <div className="mb-8 rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                ATS Analytics
            </h2>

            <div className="grid grid-cols-2 gap-4">

                <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-gray-600">
                        Best ATS Score
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                        {bestScore}
                    </p>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                    <p className="text-sm text-gray-600">
                        Latest ATS Score
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                        {latestScore}
                    </p>
                </div>

                <div className="rounded-lg bg-yellow-50 p-4">
                    <p className="text-sm text-gray-600">
                        Average ATS Score
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                        {averageScore}
                    </p>
                </div>

                <div className="rounded-lg bg-purple-50 p-4">
                    <p className="text-sm text-gray-600">
                        Total Analyses
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                        {totalAnalyses}
                    </p>
                </div>

            </div>
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
                Overall Improvement
            </p>

            <p
                className={`text-3xl font-bold ${
                    improvement >= 0
                        ? "text-green-600"
                        : "text-red-600"
                }`}
            >
                {improvement >= 0 ? "+" : ""}
                {improvement}
            </p>

            <p className="text-sm text-gray-500">
                Compared to your first resume version
            </p>
        </div>

        <div className="mt-6 rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                ATS Score Progress
            </h2>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="version" />

                    <YAxis
                    domain={[
                        (dataMin: number) => dataMin - 5,
                        (dataMax: number) => dataMax + 5,
                    ]}
                    />

                    <Tooltip />

                    <Line
                    type="monotone"
                    dataKey="score"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>
            </div>
        
        <div className="mt-4 rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-600">
                Current ATS Verdict
            </p>

            <div className="mt-2">
            <span
                className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                latestScore >= 90
                    ? "bg-green-100 text-green-700"
                    : latestScore >= 75
                    ? "bg-blue-100 text-blue-700"
                    : latestScore >= 60
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
                {getATSVerdict(latestScore).label}
            </span>
            </div>
            </div>

        <div className="mt-8 rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Resume Optimizer
            </h2>

            <button
                onClick={handleOptimizeResume}
                disabled={optimizing}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
                {optimizing
                ? "Optimizing..."
                : "Optimize Resume"}
            </button>

            {optimizedResume && (
                <div className="mt-6">

                <h3 className="font-semibold text-gray-900">
                    Optimized Resume
                </h3>

                <div className="mt-2 max-h-96 overflow-y-auto rounded-lg border bg-gray-50 p-4 whitespace-pre-wrap text-gray-700">
                    {optimizedResume}
                </div>

                </div>
            )}
            </div>

        <div className="mt-8 rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Cover Letter Generator
            </h2>

            <button
                onClick={handleGenerateCoverLetter}
                disabled={generatingCoverLetter}
                className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
                {generatingCoverLetter
                ? "Generating..."
                : "Generate Cover Letter"}
            </button>

            {coverLetter && (
                <div className="mt-6">

                <h3 className="font-semibold text-gray-900">
                    Cover Letter
                </h3>

                <div className="mt-2 max-h-96 overflow-y-auto rounded-lg border bg-gray-50 p-4 whitespace-pre-wrap text-gray-700">
                    {coverLetter}
                </div>

                </div>
            )}
            </div>

        <div className="mt-8 rounded-lg border bg-white p-6 shadow">

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Job Match Analysis
            </h2>

            <button
                onClick={handleJobMatchAnalysis}
                disabled={jobMatchLoading}
                className="rounded bg-green-600 px-4 py-2 text-white"
            >
                {jobMatchLoading
                ? "Analyzing..."
                : "Analyze Job Match"}
            </button>

            {jobMatchResult && (
                <div className="mt-6 space-y-4 text-gray-900">

                <div>
                    <h3 className="font-semibold text-gray-900">
                    Match Score
                    </h3>

                    <p className="text-2xl font-bold text-green-600">
                    {jobMatchResult.match_score}%
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">
                    Matched Skills
                    </h3>

                    <ul>
                    {jobMatchResult.matched_skills.map(
                    (skill) => (
                        <li
                        key={skill}
                        className="text-gray-700"
                        >
                        ✓ {skill.charAt(0).toUpperCase() + skill.slice(1)}
                        </li>
                    )
                    )}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">
                    Missing Skills
                    </h3>

                    <ul>
                    {jobMatchResult.missing_skills.map(
                    (skill) => (
                        <li
                        key={skill}
                        className="text-gray-700"
                        >
                        ✗ {skill.charAt(0).toUpperCase() + skill.slice(1)}
                        </li>
                    )
                    )}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">
                    Recommendations
                    </h3>

                    <ul>
                    {jobMatchResult.recommendations.map(
                        (item: string) => (
                        <li key={item}>
                            • {item}
                        </li>
                        )
                    )}
                    </ul>
                </div>

               <div className="grid grid-cols-2 gap-4">

                <div className="rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                    Experience
                    </p>
                    <p className="text-2xl font-bold">
                    {jobMatchResult.experience_score}
                    </p>
                </div>

                <div className="rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                    Projects
                    </p>
                    <p className="text-2xl font-bold">
                    {jobMatchResult.project_score}
                    </p>
                </div>

                <div className="rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                    Education
                    </p>
                    <p className="text-2xl font-bold">
                    {jobMatchResult.education_score}
                    </p>
                </div>

                <div className="rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                    Certifications
                    </p>
                    <p className="text-2xl font-bold">
                    {jobMatchResult.certification_score}
                    </p>
                </div>

                </div>

                </div>
            )}

            </div>
            
        <div className="mt-8 rounded-lg border bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Resume Improvement Roadmap
        </h2>

        <button
            onClick={handleGenerateRoadmap}
            disabled={generatingRoadmap}
            className="rounded bg-green-600 px-4 py-2 text-white"
        >
            {generatingRoadmap
            ? "Generating..."
            : "Generate Roadmap"}
        </button>

        {improvementRoadmap && (
            <div className="mt-6">

            <div className="mt-6 space-y-4 text-gray-900">
                <p className="font semibold text-gray-900">
                Estimated ATS Gain
                </p>

                <p className="text-2xl font-bold text-green-600">
                +{improvementRoadmap.estimated_score}
                </p>
            </div>

            <div className="space-y-4">
                {improvementRoadmap.roadmap.map(
                (item, index) => (
                    <div
                    key={index}
                    className="rounded-lg border p-4"
                    >
                    <div className="flex items-center justify-between">

                        <span className="font-semibold text-gray-900">
                        {item.title}
                        </span>

                        <span className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-700">
                        {item.priority}
                        </span>

                    </div>

                    <p className="mt-2 text-sm text-gray-600">
                        Impact:
                        {" "}
                        +{item.impact}
                    </p>

                    </div>
                )
                )}
            </div>

            </div>
        )}

        </div>


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
        <ATSHeroCard
            score={analysis.overall_match}
            verdict={analysis.verdict}
            summary={analysis.analysis_summary}
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
