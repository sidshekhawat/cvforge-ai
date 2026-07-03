type Props = {
  strengths: string[];
};

export default function StrengthsCard({
  strengths,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900">
        Strengths
      </h2>

      <ul className="space-y-2">
        {strengths.map((strength) => (
          <li 
          key={strength}
          className="text-gray-700"
          >
            ✓ {strength}
          </li>
        ))}
      </ul>
    </div>
  );
}