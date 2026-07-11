import {
  Brain,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award,
} from "lucide-react";

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
  {
    label: "Skills",
    value: skills,
    icon: Brain,
  },
  {
    label: "Experience",
    value: experience,
    icon: Briefcase,
  },
  {
    label: "Projects",
    value: projects,
    icon: FolderGit2,
  },
  {
    label: "Education",
    value: education,
    icon: GraduationCap,
  },
  {
    label: "Certifications",
    value: certifications,
    icon: Award,
  },
];

  return (
  <div className="rounded-xl border bg-white p-5 shadow-md transition hover:shadow-lg">
    <h2 className="text-xl font-semibold text-gray-900">
      Section Scores
    </h2>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {scores.map((score) => {
        const Icon = score.icon;

        const color =
          score.value >= 90
            ? "text-green-600"
            : score.value >= 75
            ? "text-blue-600"
            : score.value >= 60
            ? "text-yellow-600"
            : score.value >= 40
            ? "text-orange-600"
            : "text-red-600";

        return (
          <div
            key={score.label}
            className="rounded-xl border bg-gray-50 p-4 transition hover:shadow-md"
          >
            <div className={`${color} mb-2`}>
              <Icon size={18} />
            </div>

            <p className="text-sm text-gray-500">
              {score.label}
            </p>

            <h3
              className={`mt-2 text-3xl font-bold ${color}`}
            >
              {score.value}%
            </h3>

            <div className="mt-3 h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-current transition-all duration-700"
                style={{
                  width: `${score.value}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}
