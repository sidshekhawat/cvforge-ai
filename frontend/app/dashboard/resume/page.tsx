"use client";
import { useState } from "react";
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
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
          <h2 className="mb-6 text-2xl font-semibold">
            Resume Preview
          </h2>

          <div className="rounded-xl bg-white p-8 text-black">
            <div className="text-center">
              <h1 className="text-3xl font-bold uppercase tracking-wide">
                {name || "Your Name"}
              </h1>
              <div className="mt-4 flex justify-between text-[15px] text-gray-600">
              
              <div>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {email}
                </p>

                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {phone}
                </p>

                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {location}
                </p>
                </div>

                <div className="text-right">
                  <p>
                    <span className="font-medium">LinkedIn:</span>{" "}
                    {linkedin}
                  </p>

                  <p>
                    <span className="font-medium">GitHub:</span>{" "}
                    {github}
                  </p>

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
        </div>
        </div>
      </div>
    </div>
  );
}