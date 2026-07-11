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

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">

        <div className="flex flex-col items-center">
          <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-blue-500">
            <span className="text-3xl font-bold text-gray-900">
              {score}%
            </span>
          </div>

          <div
            className={`mt-4 rounded-full px-3 py-1 text-sm font-medium ${badgeColor}`}
          >
            {verdict}
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