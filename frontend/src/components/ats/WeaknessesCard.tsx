import { TriangleAlert } from "lucide-react";
type Props = {
  weaknesses: string[];
};

export default function WeaknessesCard({
  weaknesses,
}: Props) {
  return (
    <div className="min-h-[180px] rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <TriangleAlert
          size={20}
          className="text-amber-500"
        />

        <h2 className="text-xl font-semibold text-gray-900">
          Weaknesses
        </h2>
      </div>

      <ul className="space-y-2">
        {weaknesses.map((weakness) => (
          <li
            key={weakness}
            className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
          >
            ⚠ {weakness}
          </li>
        ))}
      </ul>
    </div>
  );
}