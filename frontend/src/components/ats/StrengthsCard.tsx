import { TrendingUp } from "lucide-react";
type Props = {
  strengths: string[];
};

export default function StrengthsCard({
  strengths,
}: Props) {

  console.log("Strengths:", strengths);
  
  return (
    <div className="min-h-[180px] rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp
          size={20}
          className="text-green-600"
        />

        <h2 className="text-xl font-semibold text-gray-900">
          Strengths
        </h2>
      </div>

      <ul className="space-y-2">
        {strengths.length > 0 ? (
          strengths.map((strength) => (
            <li
              key={strength}
              className="text-gray-700"
            >
              ✓ {strength}
            </li>
          ))
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            No strengths identified yet.
          </div>
        )}
      </ul>
    </div>
  );
}