type Props = {
  title: string;
  score: number;
};

export default function ATSMetricCard({
  title,
  score,
}: Props) {
  const scoreColor =
    score >= 90
      ? "text-green-600"
      : score >= 75
      ? "text-blue-600"
      : score >= 60
      ? "text-yellow-600"
      : score >= 40
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h3
        className={`mt-2 text-3xl font-bold ${scoreColor}`}
      >
        {score}%
      </h3>
    </div>
  );
}