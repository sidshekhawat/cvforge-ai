"use client";
import { useState } from "react";
import ProfessionalTemplate from "@/src/components/templates/ProfessionalTemplate";
import ModernTemplate from "@/src/components/templates/ModernTemplate";
import MinimalTemplate from "@/src/components/templates/MinimalTemplate";
import A4Page from "@/src/components/resume/A4Page";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Trash2 } from "lucide-react";
export default function ResumePage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [linkedin, setLinkedin] = useState("");
const [github, setGithub] = useState("");
const [portfolio, setPortfolio] = useState("");
const [location, setLocation] = useState("");
const [education, setEducation] = useState([
  {
    degree: "",
    college: "",
  },
]);

const [projects, setProjects] = useState([
  {
    title: "",
    description: "",
  },
]);

const [skills, setSkills] = useState({
  languages: [""],
  frameworks: [""],
  databases: [""],
  tools: [""],
  concepts: [""],
});

const [experience, setExperience] = useState([
  {
    role: "",
    company: "",
    duration: "",
    description: "",
  },
]);
const [certifications, setCertifications] = useState([""]);
const [achievements, setAchievements] = useState([""]);
const [selectedTemplate, setSelectedTemplate] =
  useState("professional");
const resumeRef = useRef<HTMLDivElement>(null);
const handlePrint = useReactToPrint({
  contentRef: resumeRef,
  documentTitle: `${name || "Resume"}-CVForge`,
});
const skillCategories = [
  {
    key: "languages",
    label: "Programming Languages",
  },
  {
    key: "frameworks",
    label: "Frameworks & Libraries",
  },
  {
    key: "databases",
    label: "Databases",
  },
  {
    key: "tools",
    label: "Tools & Platforms",
  },
  {
    key: "concepts",
    label: "Core Concepts",
  },
] as const;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white">
          Resume Builder
        </h1>
        <p className="mt-1 text-lg text-gray-400">
          Create, preview and export ATS-friendly resumes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
          <h2 className="mb-6 text-2xl font-semibold">
            Resume Form
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block">
                Full Name
              </label>

              <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
                className="
                  w-full
                  rounded-lg
                  border
                  border-cyan-400/20
                  bg-black/30
                  p-3
                "
              />
            </div>

            <div>
              <label className="mb-2 block">
                Email
              </label>

              <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
                className="
                  w-full
                  rounded-lg
                  border
                  border-cyan-400/20
                  bg-black/30
                  p-3
                "
              />
            </div>

            <div>
              <label className="mb-2 block">
                Phone
              </label>

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-cyan-400/20
                  bg-black/30
                  p-3
                "
              />
            </div>

            <label className="block text-sm mb-2">
              LinkedIn
            </label>

            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
            />

            <label className="block text-sm mb-2">
              GitHub
            </label>

            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="github.com/username"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
            />

            <label className="block text-sm mb-2">
              Portfolio
            </label>

            <input
              type="text"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="yourwebsite.com"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
            />

            <label className="block text-sm mb-2">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
            />
            <h2 className="text-xl font-semibold mt-6 mb-4">
              Education
            </h2>

            {education.map((edu, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg border border-zinc-700 p-4"
              >
                {education.length > 1 && (
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setEducation(
                          education.filter((_, i) => i !== index)
                        )
                      }
                      className="
                        text-zinc-500
                        hover:text-red-400
                        transition-colors
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm mb-2">
                    Degree
                  </label>

                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const updatedEducation = [...education];
                      updatedEducation[index].degree =
                        e.target.value;
                      setEducation(updatedEducation);
                    }}
                    placeholder="Enter degree"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">
                    College
                  </label>

                  <input
                    type="text"
                    value={edu.college}
                    onChange={(e) => {
                      const updatedEducation = [...education];
                      updatedEducation[index].college =
                        e.target.value;
                      setEducation(updatedEducation);
                    }}
                    placeholder="Enter college"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setEducation([
                  ...education,
                  {
                    degree: "",
                    college: "",
                  },
                ])
              }
              className="
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                bg-zinc-900
                text-zinc-400
                border
                border-zinc-700
                hover:bg-zinc-800
                hover:text-white
                transition-all
              "
            >
              + Add Education
            </button>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Experience
            </h2>

            {experience.map((exp, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg border border-zinc-700 p-4"
              >
                {experience.length > 1 && (
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setExperience(
                          experience.filter((_, i) => i !== index)
                        )
                      }
                      className="
                        text-zinc-500
                        hover:text-red-400
                        transition-colors
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm mb-2">
                    Role
                  </label>

                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => {
                      const updatedExperience = [...experience];
                      updatedExperience[index].role =
                        e.target.value;
                      setExperience(updatedExperience);
                    }}
                    placeholder="Enter role or position"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">
                    Company
                  </label>

                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const updatedExperience = [...experience];
                      updatedExperience[index].company =
                        e.target.value;
                      setExperience(updatedExperience);
                    }}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">
                    Duration
                  </label>

                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => {
                      const updatedExperience = [...experience];
                      updatedExperience[index].duration =
                        e.target.value;
                      setExperience(updatedExperience);
                    }}
                    placeholder="Enter duration"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Description
                  </label>

                  <textarea
                    value={exp.description}
                    onChange={(e) => {
                      const updatedExperience = [...experience];
                      updatedExperience[index].description =
                        e.target.value;
                      setExperience(updatedExperience);
                    }}
                    placeholder="Describe your work, achievements, and responsibilities"
                    rows={4}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setExperience([
                  ...experience,
                  {
                    role: "",
                    company: "",
                    duration: "",
                    description: "",
                  },
                ])
              }
                className="
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                bg-zinc-900
                text-zinc-400
                border
                border-zinc-700
                hover:bg-zinc-800
                hover:text-white
                transition-all
              "
            >
              + Add Experience
            </button>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg border border-zinc-700 p-4"
              >
                {projects.length > 1 && (
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setProjects(
                          projects.filter((_, i) => i !== index)
                        )
                      }
                      className="
                        text-zinc-500
                        hover:text-red-400
                        transition-colors
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              <div className="mb-4">
                <label className="block text-sm mb-2">
                  Project Name
                </label>

                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].title =
                      e.target.value;
                    setProjects(updatedProjects);
                  }}
                  placeholder="Enter project name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">
                  Project Description
                </label>

                <textarea
                  value={project.description}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].description =
                      e.target.value;
                    setProjects(updatedProjects);
                  }}
                  placeholder="Describe your project"
                  rows={4}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                />
              </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setProjects([
                  ...projects,
                  {
                    title: "",
                    description: "",
                  },
                ])
              }
              className="
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                bg-zinc-900
                text-zinc-400
                border
                border-zinc-700
                hover:bg-zinc-800
                hover:text-white
                transition-all
              "
            >
              + Add Project
            </button>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Skills
            </h2>

            {skillCategories.map(({ key, label }) => (
              <div key={key} className="mb-6">
                <label className="block text-sm mb-2">
                  {label}
                </label>

                {skills[key].map((skill, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => {
                        const updated = [...skills[key]];
                        updated[index] = e.target.value;

                        setSkills({
                          ...skills,
                          [key]: updated,
                        });
                      }}
                      placeholder={`Enter ${label}`}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setSkills({
                      ...skills,
                      [key]: [...skills[key], ""],
                    })
                  }
                  className="
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    font-medium
                    bg-zinc-900
                    text-zinc-400
                    border
                    border-zinc-700
                    hover:bg-zinc-800
                    hover:text-white
                    transition-all
                  "
                >
                  + Add {label}
                </button>
              </div>
            ))}

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Certifications
            </h2>
            {certifications.map((certification, index) => (
              <div key={index} className="mb-3">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm">
                    Certification {index + 1}
                  </label>

                  {certifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setCertifications(
                          certifications.filter((_, i) => i !== index)
                        )
                      }
                      className="
                        text-zinc-500
                        hover:text-red-400
                        transition-colors
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={certification}
                  onChange={(e) => {
                    const updatedCertifications = [...certifications];
                    updatedCertifications[index] = e.target.value;
                    setCertifications(updatedCertifications);
                  }}
                  placeholder="Enter Certifications"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setCertifications([
                  ...certifications,
                  "",
                ])
              }
              className="
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                bg-zinc-900
                text-zinc-400
                border
                border-zinc-700
                hover:bg-zinc-800
                hover:text-white
                transition-all
              "
            >
              + Add Certification
            </button>

          <h2 className="text-xl font-semibold mt-6 mb-4">
            Achievements
          </h2>

          {achievements.map((achievement, index) => (
            <div key={index} className="mb-3">

              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm">
                  Achievement {index + 1}
                </label>

                {achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setAchievements(
                        achievements.filter((_, i) => i !== index)
                      )
                    }
                    className="
                      text-zinc-500
                      hover:text-red-400
                      transition-colors
                    "
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <input
                type="text"
                value={achievement}
                onChange={(e) => {
                  const updated = [...achievements];
                  updated[index] = e.target.value;
                  setAchievements(updated);
                }}
                placeholder="Enter Achievement"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
              />
            </div>
          ))}

            <button
              onClick={() =>
                setAchievements([...achievements, ""])
              }
              className="
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                bg-zinc-900
                text-zinc-400
                border
                border-zinc-700
                hover:bg-zinc-800
                hover:text-white
                transition-all
              "
            >
              + Add Achievement
            </button>
            
            </div>
          </div>
        <div className="sticky top-6 self-start max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 bg-black pb-4">
             <div className="mb-4 flex items-center justify-start gap-13">
                <h2 className="text-xl font-semibold">
                  Choose Template
                </h2>

                <button
                  onClick={handlePrint}
                  className="
                    rounded-lg
                    px-3
                    py-1.5
                    text-sm
                    font-medium
                    bg-zinc-900
                    text-zinc-400
                    border-zinc-700
                    hover:bg-zinc-800
                    hover:text-white
                    transition-all border
                  "
                >
                  Download PDF
                </button>
              </div>

            <div className="flex gap-4 pl-2">
            <button
              onClick={() => setSelectedTemplate("professional")}
              className={`rounded-lg px-4 py-2 font-medium transition-all border ${
                selectedTemplate === "professional"
                  ? "bg-white text-black border-white"
                  : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Professional
            </button>

            <button
              onClick={() => setSelectedTemplate("modern")}
              className={`rounded-lg px-4 py-2 font-medium transition-all border ${
                selectedTemplate === "modern"
                  ? "bg-white text-black border-white"
                  : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Modern
            </button>

            <button
              onClick={() => setSelectedTemplate("minimal")}
              className={`rounded-lg px-4 py-2 font-medium transition-all border ${
                selectedTemplate === "minimal"
                  ? "bg-white text-black border-white"
                  : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Minimal
            </button>
          </div>
          </div>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-400">
            Resume Preview
          </h3>
          <div className="rounded-2xl bg-zinc-900 p-6 border border-zinc-800">
          <div ref={resumeRef}>
          {selectedTemplate === "professional" && (
             <A4Page>
            <ProfessionalTemplate
              name={name}
              email={email}
              phone={phone}
              location={location}
              linkedin={linkedin}
              github={github}
              portfolio={portfolio}
              education={education}
              experience={experience}
              projects={projects}
              skills={skills}
              certifications={certifications}
              achievements={achievements}
            />
             </A4Page>
          )}
          {selectedTemplate === "modern" && (
              <A4Page>
            <ModernTemplate
              name={name}
              email={email}
              phone={phone}
              location={location}
              linkedin={linkedin}
              github={github}
              portfolio={portfolio}
              education={education}
              experience={experience}
              projects={projects}
              skills={skills}
              certifications={certifications}
              achievements={achievements}
            />
             </A4Page>
          )}
          {selectedTemplate === "minimal" && (
            <A4Page>
            <MinimalTemplate
              name={name}
              email={email}
              phone={phone}
              location={location}
              linkedin={linkedin}
              github={github}
              portfolio={portfolio}
              education={education}
              experience={experience}
              projects={projects}
              skills={skills}
              certifications={certifications}
              achievements={achievements}
            />
             </A4Page>
          )}
        </div>
        </div>
        </div>
        </div>
      </div>
    );
}
      