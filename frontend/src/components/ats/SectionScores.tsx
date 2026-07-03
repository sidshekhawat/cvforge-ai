type Props = {
  skills: number;
  experience: number;
  projects: number;
  education: number;
  certifications: number;
};

export default function SectionScores({
  skills,
  experience,
  projects,
  education,
  certifications,
}: Props) {
  const scores = [
    { label: "Skills", value: skills },
    { label: "Experience", value: experience },
    { label: "Projects", value: projects },
    { label: "Education", value: education },
    { label: "Certifications", value: certifications },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900">
        Section Scores
      </h2>

      <div className="text-gray-700">
        {scores.map((score) => (
          <div
            key={score.label}
            className="space-y-1"
          >
            <div className="flex justify-between">
              <span>{score.label}</span>

              <span className="font-medium">
                {score.value}%
              </span>
            </div>

            <div className="h-2 rounded bg-gray-200">
              <div
                className="h-2 rounded bg-blue-500"
                style={{
                  width: `${score.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}