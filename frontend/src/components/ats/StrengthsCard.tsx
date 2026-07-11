type Props = {
  strengths: string[];
};

export default function StrengthsCard({
  strengths,
}: Props) {

  console.log("Strengths:", strengths);
  
  return (
    <div className="min-h-[180px] rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900">
        Strengths
      </h2>

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
          <p className="text-sm text-gray-500">
            No strengths identified yet.
          </p>
        )}
      </ul>
    </div>
  );
}