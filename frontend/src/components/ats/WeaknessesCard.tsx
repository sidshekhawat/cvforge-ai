type Props = {
  weaknesses: string[];
};

export default function WeaknessesCard({
  weaknesses,
}: Props) {
  return (
    <div className="min-h-[180px] rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900">
        Weaknesses
      </h2>

      <ul className="space-y-2">
        {weaknesses.map((weakness) => (
          <li 
          key={weakness}
          className="text-gray-700"
          >
            ⚠ {weakness}
          </li>
        ))}
      </ul>
    </div>
  );
}