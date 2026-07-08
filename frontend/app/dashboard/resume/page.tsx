"use client";
import { useState } from "react";
export default function ResumePage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [college, setCollege] = useState("");
const [degree, setDegree] = useState("");

const [project, setProject] = useState("");
const [projectDesc, setProjectDesc] = useState("");

const [skills, setSkills] = useState("");

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

            <div className="mb-4">
              <label className="block text-sm mb-2">
                College
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter your college"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">
                Degree
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Enter your degree"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
              />
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Projects
            </h2>

            <div className="mb-4">
              <label className="block text-sm mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Enter project name"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">
                Project Description
              </label>
              <textarea
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                placeholder="Describe your project"
                rows={4}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
              />
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Skills
            </h2>

            <div className="mb-4">
              <label className="block text-sm mb-2">
                Skills
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Python, FastAPI, PostgreSQL, React"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
              />
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

          <p>
            {degree || "Degree"}
          </p>

          <p className="text-zinc-400">
            {college || "College"}
          </p>

          <hr className="my-4 border-zinc-700" />

          <h3 className="font-semibold text-lg mb-2">
            Projects
          </h3>

          <p className="font-medium">
            {project || "Project Name"}
          </p>

          <p className="text-zinc-400">
            {projectDesc || "Project Description"}
          </p>

          <hr className="my-4 border-zinc-700" />

          <h3 className="font-semibold text-lg mb-2">
            Skills
          </h3>

          <p>
            {skills || "Your Skills"}
          </p>
        </div>
      </div>
    </div>
  );
}