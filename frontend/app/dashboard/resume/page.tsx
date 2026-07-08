"use client";
import { useState } from "react";
export default function ResumePage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
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
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
          <h2 className="mb-6 text-2xl font-semibold">
            Resume Preview
          </h2>

          <div className="rounded-xl bg-white p-8 text-black">
            <h1 className="text-3xl font-bold">
              {name || "Your Name"}
            </h1>

            <p>
              {email || "your.email@example.com"}
            </p>

            <p>
              {phone || "+91 XXXXX XXXXX"}
            </p>
          </div>

          <hr className="my-4 border-zinc-700" />

          <h3 className="font-semibold text-lg mb-2">
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

          <h3 className="font-semibold text-lg mb-2">
            Projects
          </h3>

          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">
                {project.title || "Project Name"}
              </p>

              <p className="text-zinc-400">
                {project.description || "Project Description"}
              </p>
            </div>
          ))}

          <hr className="my-4 border-zinc-700" />

          <h3 className="font-semibold text-lg mb-2">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-md bg-zinc-800 px-3 py-1 text-sm"
              >
                {skill || "Skill"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}