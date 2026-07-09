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

interface MinimalTemplateProps {
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
export default function MinimalTemplate({
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
}: MinimalTemplateProps) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
    
          <div className="bg-white p-10 text-black">
            <div className="mb-8">
            <h1 className="text-5xl font-light">
                {name || "Your Name"}
            </h1>

            <p className="mt-2 text-sm text-gray-600">
                {email} • {phone} • {location}
            </p>

            <p className="text-sm text-gray-600">
                {linkedin} • {github}
            </p>

            {portfolio && (
                <p className="text-sm text-gray-600">
                {portfolio}
                </p>
            )}
            </div>

          <h3 className="mt-12 mb-4 text-sm font-bold tracking-[0.15em]">
            Education
          </h3>

          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">
                {edu.degree || "Degree"}
              </p>

              <p className="ext-gray-500">
                {edu.college || "College"}
              </p>
            </div>
          ))}

          <h3 className="mt-12 mb-4 text-sm font-bold tracking-[0.15em]">
            Experience
          </h3>

          {experience.map((exp, index) => (
            <div key={index} className="mb-5">
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

          <h3 className="mt-12 mb-4 text-sm font-bold tracking-[0.15em]">
            Projects
          </h3>

          {projects.map((project, index) => (
            <div key={index} className="mb-5">
              <p className="text-lg font-bold">
                {project.title || "Project Name"}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed">
                • {project.description || "Project Description"}
              </p>
            </div>
          ))}

          <h3 className="mt-12 mb-4 text-sm font-bold tracking-[0.15em]">
            Skills
          </h3>

        <p className="text-sm leading-relaxed">
        {skills
            .filter((skill) => skill.trim())
            .join(" • ")}
        </p>

          <h3 className="mt-12 mb-4 text-sm font-bold tracking-[0.15em]">
            Certifications
          </h3>

          {certifications.map((certification, index) => (
            <p key={index} className="mb-2">
              • {certification || "Certification"}
            </p>
          ))}

          <h3 className="mt-12 mb-4 text-sm font-bold tracking-[0.15em]">
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