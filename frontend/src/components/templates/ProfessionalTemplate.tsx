import { Mail, Phone } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
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

interface ProfessionalTemplateProps {
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
export default function ProfessionalTemplate({
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
}: ProfessionalTemplateProps) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
    
          <div className="text-black">
            <div className="text-center">
              <h1 className="text-3xl font-bold uppercase tracking-wide">
                {name || "Your Name"}
              </h1>
              <div className="mt-4 flex justify-between text-[15px] text-gray-600">
              
             <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{phone}</span>
                </div>

                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {location}
                </p>
              </div>

              <div className="space-y-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <FaLinkedin size={14} />
                  <span>{linkedin}</span>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <FaGithub size={14} />
                  <span>{github}</span>
                </div>

                <p>
                  <span className="font-medium">Portfolio:</span>{" "}
                  {portfolio}
                </p>
              </div>
            </div>
            </div>
          
          <hr className="my-6 border-gray-400" />

          <h3 className="mt-6 mb-3 border-b border-gray-400 pb-1 text-sm font-bold uppercase tracking-wider">
            Education
          </h3>

          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">
                {edu.degree || "Degree"}
              </p>

              <p className="text-zinc-400">
                {edu.college || "College"}
              </p>
            </div>
          ))}

          <hr className="my-4 border-zinc-700" />

          <h3 className="mt-6 mb-3 border-b border-gray-400 pb-1 text-sm font-bold uppercase tracking-wider">
            Experience
          </h3>

          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
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

          <h3 className="mt-6 mb-3 border-b border-gray-400 pb-1 text-sm font-bold uppercase tracking-wider">
            Projects
          </h3>

          {projects.map((project, index) => (
            <div key={index} className="mb-6">
              <p className="text-lg font-bold">
                {project.title || "Project Name"}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed">
                • {project.description || "Project Description"}
              </p>
            </div>
          ))}

          <hr className="my-4 border-zinc-700" />

          <h3 className="mt-6 mb-3 border-b border-gray-400 pb-1 text-sm font-bold uppercase tracking-wider">
            Skills
          </h3>

          <p className="text-sm">
            {skills
              .filter((skill) => skill.trim())
              .join(" • ")}
          </p>

          <h3 className="mt-6 mb-3 border-b border-gray-400 pb-1 text-sm font-bold uppercase tracking-wider">
            Certifications
          </h3>

          {certifications.map((certification, index) => (
            <p key={index} className="mb-2">
              • {certification || "Certification"}
            </p>
          ))}

          <h3 className="mt-6 mb-3 border-b border-gray-400 pb-1 text-sm font-bold uppercase tracking-wider">
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