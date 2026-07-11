import { Lightbulb } from "lucide-react";
type Props = {
  recommendations: string[];
};

export default function RecommendationsCard({
  recommendations,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb
          size={20}
          className="text-blue-600"
        />

        <h2 className="text-xl font-semibold text-gray-900">
          Improvement Suggestions
        </h2>
      </div>

      <ul className="space-y-2">
        {recommendations.map((recommendation) => (
          <li
            key={recommendation}
            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900"
          >
            {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
}