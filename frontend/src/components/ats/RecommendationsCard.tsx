type Props = {
  recommendations: string[];
};

export default function RecommendationsCard({
  recommendations,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900">
        Improvement Suggestions
      </h2>

      <ul className="space-y-2">
        {recommendations.map((recommendation) => (
          <li 
          key={recommendation}
          className="text-gray-700"
          >
            • {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
}