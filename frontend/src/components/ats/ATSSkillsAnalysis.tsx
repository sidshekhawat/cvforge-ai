type Props = {
  matchedSkills: string[];
  missingSkills: string[];
};

export default function ATSSkillsAnalysis({
  matchedSkills,
  missingSkills,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Skills Analysis
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <h3 className="mb-3 font-medium text-green-700">
            Matched Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {matchedSkills.length > 0 ? (
                matchedSkills.map((skill) => (
                    <span
                    key={skill}
                    className="
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-sm
                        text-green-700
                    "
                    >
                    {skill}
                    </span>
                ))
                ) : (
                <p className="text-sm text-gray-500">
                    No matched skills found.
                </p>
                )}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-medium text-red-700">
            Missing Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {missingSkills.length > 0 ? (
                missingSkills.map((skill) => (
                    <span
                    key={skill}
                    className="
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-sm
                        text-green-700
                    "
                    >
                    {skill}
                    </span>
                ))
                ) : (
                <p className="text-sm text-gray-500">
                 No missing skills detected.
                </p>
                )}
          </div>
        </div>

      </div>
    </div>
  );
}