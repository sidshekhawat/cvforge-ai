type Props = {
  score: number;
  verdict: string;
};

export default function ATSScoreCard({
  score,
  verdict,
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
    <div className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg md:row-span-2 flex flex-col">
  <h2 className="text-lg font-semibold text-gray-900">
    ATS Score
  </h2>

  <div className="flex flex-1 flex-col items-center justify-center">
    <div className="h-40 w-40 rounded-full border-8 border-blue-500 flex items-center justify-center">
      <span className="text-3xl font-bold">
        {score}%
      </span>
    </div>

    <div
      className={`mt-6 rounded-full px-3 py-1 text-sm font-medium ${badgeColor}`}
    >
      {verdict}
    </div>
  </div>
</div>
  );
}