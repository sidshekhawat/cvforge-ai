type Props = {
  skills: string[];
};

export default function MissingSkillsCard({
  skills,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900">
        Missing Skills
      </h2>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}