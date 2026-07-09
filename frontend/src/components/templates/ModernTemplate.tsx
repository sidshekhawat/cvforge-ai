type Education = {
  degree: string;
  college: string;
};

type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

type Project = {
  title: string;
  description: string;
};

interface ModernTemplateProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;

  education: Education[];
  experience: Experience[];
  projects: Project[];

  skills: string[];
  certifications: string[];
  achievements: string[];
}
export default function ModernTemplate({
  name,
  email,
  phone,
  location,
  linkedin,
  github,
  portfolio,
  education,
  experience,
  projects,
  skills,
  certifications,
  achievements,
}: ModernTemplateProps) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
          <div className="text-black">
            <div className="mb-6 border-b-2 pb-4">
                <h1 className="text-4xl font-bold tracking-wide">
                    {name || "Your Name"}
                </h1>

                <p className="mt-2 text-gray-600">
                    {email} • {phone} • {location}
                </p>

                <p className="text-gray-600">
                    {linkedin} • {github}
                </p>

                {portfolio && (
                    <p className="text-gray-600">
                    {portfolio}
                    </p>
                )}
                </div>

          <h3 className="mt-8 mb-4 border-l-4 border-black pl-3 text-lg font-bold uppercase tracking-wider">
            Education
          </h3>

          {education.map((edu, index) => (
            <div
            key={index}
            className="mb-4 rounded-xl border border-gray-300 p-4 shadow-sm"
            >
              <p className="font-medium">
                {edu.degree || "Degree"}
              </p>

              <p className="text-zinc-400">
                {edu.college || "College"}
              </p>
            </div>
          ))}

          <h3 className="mt-8 mb-4 border-l-4 border-black pl-3 text-lg font-bold uppercase tracking-wider">
            Experience
          </h3>

          {experience.map((exp, index) => (
            <div
            key={index}
            className="mb-4 rounded-xl border border-gray-300 p-4 shadow-sm"
            >
              <p className="text-lg font-bold">
                {exp.role || "Role"}
              </p>

              <p className="text-sm text-gray-600">
                {exp.company || "Company"} • {exp.duration || "Duration"}
              </p>

              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                • {exp.description || "Description"}
              </p>
            </div>
          ))}

          <h3 className="mt-8 mb-4 border-l-4 border-black pl-3 text-lg font-bold uppercase tracking-wider">
            Projects
          </h3>

          {projects.map((project, index) => (
            <div
            key={index}
            className="mb-4 rounded-xl border border-gray-300 p-4 shadow-sm"
            >
              <p className="text-lg font-bold">
                {project.title || "Project Name"}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed">
                • {project.description || "Project Description"}
              </p>
            </div>
          ))}

          <h3 className="mt-8 mb-4 border-l-4 border-black pl-3 text-lg font-bold uppercase tracking-wider">
            Skills
          </h3>

        <div className="flex flex-wrap gap-2">
        {skills
            .filter((skill) => skill.trim())
            .map((skill, index) => (
            <span
                key={index}
                className="rounded-full border border-gray-300 px-3 py-1 text-sm font-medium"
            >
                {skill}
            </span>
            ))}
        </div>

          <h3 className="mt-8 mb-4 border-l-4 border-black pl-3 text-lg font-bold uppercase tracking-wider">
            Certifications
          </h3>

          {certifications.map((certification, index) => (
            <p key={index} className="mb-2">
              • {certification || "Certification"}
            </p>
          ))}

          <h3 className="mt-8 mb-4 border-l-4 border-black pl-3 text-lg font-bold uppercase tracking-wider">
            Achievements
          </h3>

          {achievements.map((achievement, index) => (
            <p key={index} className="mb-2">
              • {achievement || "Achievement"}
            </p>
          ))}
        </div>
        </div>
  );
}