import { useEffect, useState } from "react";
import ATSProgressRing from "./ATSProgressRing";
type Props = {
  score: number;
  verdict: string;
  summary: string;
};

export default function ATSHeroCard({
  score,
  verdict,
  summary,
}: Props) {
  const badgeColor =
    verdict === "Excellent Match"
      ? "bg-green-100 text-green-700"
      : verdict === "Strong Match"
      ? "bg-blue-100 text-blue-700"
      : verdict === "Good Match"
      ? "bg-yellow-100 text-yellow-700"
      : verdict === "Moderate Match"
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700";

  const [animatedScore, setAnimatedScore] =
  useState(0);
    useEffect(() => {
      let current = 0;

      const interval = setInterval(() => {
        const increment =
          Math.max(1, Math.ceil(score / 50));

        current += increment;

        if (current >= score) {
          current = score;
          clearInterval(interval);
        }

        setAnimatedScore(current);
      }, 20);

      return () => clearInterval(interval);
    }, [score]);


   let grade = "F";

    if (score >= 92) {
      grade = "A+";
    } else if (score >= 85) {
      grade = "A";
    } else if (score >= 75) {
      grade = "B";
    } else if (score >= 65) {
      grade = "C";
    } else if (score >= 50) {
      grade = "D";
    }

    let gradeColor =
      "bg-red-100 text-red-700";

    if (grade === "A+" || grade === "A") {
      gradeColor =
        "bg-green-100 text-green-700";
    } else if (grade === "B") {
      gradeColor =
        "bg-blue-100 text-blue-700";
    } else if (grade === "C") {
      gradeColor =
        "bg-yellow-100 text-yellow-700";
    } else if (grade === "D") {
      gradeColor =
        "bg-orange-100 text-orange-700";
    }

    let readiness = "Not Ready";

    if (score >= 85) {
      readiness = "Ready to Apply";
    } else if (score >= 70) {
      readiness = "Almost Ready";
    } else if (score >= 50) {
      readiness = "Needs Improvement";
    }
    
    let readinessColor =
      "bg-red-100 text-red-700";

    if (readiness === "Ready to Apply") {
      readinessColor =
        "bg-green-100 text-green-700";
    } else if (
      readiness === "Almost Ready"
    ) {
      readinessColor =
        "bg-blue-100 text-blue-700";
    } else if (
      readiness === "Needs Improvement"
    ) {
      readinessColor =
        "bg-yellow-100 text-yellow-700";
    }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">

        <div className="flex flex-col items-center">
          <ATSProgressRing score={animatedScore} />

          <div className="mt-4 flex flex-wrap gap-2">

            <div
              className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor}`}
            >
              {verdict}
            </div>

            <div
              className={`rounded-full px-3 py-1 text-sm font-medium ${gradeColor}`}
            >
              Grade {grade}
            </div>

            <div
              className={`rounded-full px-3 py-1 text-sm font-medium ${readinessColor}`}
            >
              {readiness}
            </div>

          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            ATS Match Analysis
          </h2>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {summary}
          </p>
        </div>

      </div>
    </div>
  );
}