"use client";
import { useState } from "react";
import ProfessionalTemplate from "@/src/components/templates/ProfessionalTemplate";
import ModernTemplate from "@/src/components/templates/ModernTemplate";
import MinimalTemplate from "@/src/components/templates/MinimalTemplate";
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

const [skills, setSkills] = useState([""]);

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

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Resume Builder
      </h1>

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
                {education.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setEducation(
                        education.filter((_, i) => i !== index)
                      )
                    }
                    className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                  >
                    Delete Education
                  </button>
                )}
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
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2"
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

                {experience.length > 1 && (
                  <button
                    onClick={() =>
                      setExperience(
                        experience.filter((_, i) => i !== index)
                      )
                    }
                    className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                  >
                    Delete
                  </button>
                )}
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
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2"
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
                {/* Project fields go here */}

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
              
              {projects.length > 1 && (
                <button
                  onClick={() =>
                    setProjects(
                      projects.filter((_, i) => i !== index)
                    )
                  }
                  className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                  Delete
                </button>
              )}
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
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2"
            >
              + Add Project
            </button>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Skills
            </h2>

            <div className="mb-4">
              <label className="block text-sm mb-2">
                Skills
              </label>
              {skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm mb-2">
                    Skill {index + 1}
                  </label>

                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const updatedSkills = [...skills];
                      updatedSkills[index] = e.target.value;
                      setSkills(updatedSkills);
                    }}
                    placeholder="Enter skill"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                  />

                  {skills.length > 1 && (
                    <button
                      onClick={() =>
                        setSkills(
                          skills.filter((_, i) => i !== index)
                        )
                      }
                      className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setSkills([...skills, ""])
                }
                className="mt-2 rounded-lg bg-blue-600 px-4 py-2"
              >
                + Add Skill
              </button>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Certifications
            </h2>

            {certifications.map((certification, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm mb-2">
                  Certification {index + 1}
                </label>

                <input
                  type="text"
                  value={certification}
                  onChange={(e) => {
                    const updatedCertifications = [...certifications];
                    updatedCertifications[index] = e.target.value;
                    setCertifications(updatedCertifications);
                  }}
                  placeholder="Enter certification name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                />

                {certifications.length > 1 && (
                  <button
                    onClick={() =>
                      setCertifications(
                        certifications.filter((_, i) => i !== index)
                      )
                    }
                    className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                  >
                    Delete
                  </button>
                )}
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
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2"
            >
              + Add Certification
            </button>

          <h2 className="mt-8 mb-4 text-xl font-bold">
            Achievements
          </h2>

          {achievements.map((achievement, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                value={achievement}
                onChange={(e) => {
                  const updated = [...achievements];
                  updated[index] = e.target.value;
                  setAchievements(updated);
                }}
                placeholder="Enter achievement"
                className="w-full rounded-lg border p-3"
              />

              {achievements.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setAchievements(
                      achievements.filter((_, i) => i !== index)
                    )
                  }
                  className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                  Delete Achievement
                </button>
              )}
            </div>
          ))}

            <button
              onClick={() =>
                setAchievements([...achievements, ""])
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              + Add Achievement
            </button>
            
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold">
            Choose Template
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => setSelectedTemplate("professional")}
              className="rounded-lg bg-blue-600 px-4 py-2"
            >
              Professional
            </button>

            <button
              onClick={() => setSelectedTemplate("modern")}
              className="rounded-lg bg-blue-600 px-4 py-2"
            >
              Modern
            </button>

            <button
              onClick={() => setSelectedTemplate("minimal")}
              className="rounded-lg bg-blue-600 px-4 py-2"
            >
              Minimal
            </button>
          </div>
          {selectedTemplate === "professional" && (
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
          )}
          {selectedTemplate === "modern" && (
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
          )}
          {selectedTemplate === "minimal" && (
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
          )}
        </div>
      </div>
      </div>
    );
}
      