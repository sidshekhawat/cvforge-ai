"use client";
import OrbitModule from "@/src/components/OrbitModule";
import { useEffect, useState } from "react";


export default function HomeHub() {
  const orbitBase =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border";

  const [innerRotation, setInnerRotation] = useState(0);
  const [middleRotation, setMiddleRotation] = useState(0);
  const [outerRotation, setOuterRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInnerRotation((prev) => prev + 0.25);
      setMiddleRotation((prev) => prev + 0.15);
      setOuterRotation((prev) => prev + 0.08);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const universeSize =
  typeof window !== "undefined"
    ? Math.min(window.innerWidth, window.innerHeight) * 0.85
    : 900;

    const INNER_RADIUS = universeSize * 0.175;
    const MIDDLE_RADIUS = universeSize * 0.325;
    const OUTER_RADIUS = universeSize * 0.475;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">

      {/* Grid Background */}

      <div className="absolute inset-0">

        {Array.from({ length: 25 }).map(
          (_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-cyan-500/10"
              style={{
                left: `${i * 4}%`
              }}
            />
          )
        )}

        {Array.from({ length: 25 }).map(
          (_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-cyan-500/10"
              style={{
                top: `${i * 4}%`
              }}
            />
          )
        )}

        {/* Grid Intersections */}

        {Array.from({ length: 25 }).map((_, row) =>
        Array.from({ length: 25 }).map((_, col) => (
            <div
            key={`${row}-${col}`}
            className="absolute h-1 w-1 rounded-full bg-cyan-400/35 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
            style={{
                left: `${col * 4}%`,
                top: `${row * 4}%`,
                transform: "translate(-50%, -50%)",
            }}
            />
        ))
        )}
      </div>

{/* Center Logo */}


<div className="relative z-10 flex min-h-screen items-center justify-center">

<div className="relative h-[85vmin] w-[85vmin]">


{/* Orbit Rings*/}        

<div className={`${orbitBase} h-[35%] w-[35%] border-cyan-400/25`} />

<div className={`${orbitBase} h-[65%] w-[65%] border-cyan-400/20`} />

<div className={`${orbitBase} h-[95%] w-[95%] border-cyan-400/20`} />

<div className="absolute inset-0 flex items-center justify-center">
{/* Orbit System*/}

<OrbitModule
  title="Resume Builder"
  description="Create ATS-ready resumes"
  radius={OUTER_RADIUS}
  angle={225 + outerRotation}
/>

<OrbitModule
  title="ATS Analyzer"
  description="Analyze ATS compatibility"
   radius={OUTER_RADIUS}
  angle={315 + outerRotation}
/>

<OrbitModule
  title="Templates"
  description="Professional resume designs"
   radius={OUTER_RADIUS}
  angle={45 + outerRotation}
/>

<OrbitModule
  title="Profile"
  description="Manage account settings"
   radius={OUTER_RADIUS}
  angle={135 + outerRotation}
/>

<OrbitModule
  title="Cover Letter"
  description="Generate tailored letters"
  radius={MIDDLE_RADIUS}
  angle={30 + middleRotation}
/>

<OrbitModule
  title="Job Match"
  description="Match resumes with jobs"
  radius={MIDDLE_RADIUS}
  angle={210 + middleRotation}
/>

<OrbitModule
  title="Analytics"
  description="Track ATS performance"
  radius={INNER_RADIUS}
  angle={90 + innerRotation}
/>

<OrbitModule
  title="History"
  description="View past analyses"
  radius={INNER_RADIUS}
  angle={270 + innerRotation}
/>

</div>

<div className="absolute inset-0 flex flex-col items-center justify-center">

{/*Core Glow */}           

<div
className="
    absolute
    h-[220px]
    w-[220px]
    rounded-full
    bg-cyan-500/10
    blur-3xl
    "
    />

{/* Logo */}

<div className="relative">

<h1 className="text-[110px] font-black text-white drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]">
    CVForge
</h1>


{/* AI Badge */}

<div className="
    absolute
    -top-0
    -right-2
    px-2
    py-0.5
    rounded-xl
    border
    border-cyan-400
    bg-cyan-500/5
    backdrop-blur-sm
    text-cyan-300
    font-bold
    text-lg
    shadow-[0_0_20px_rgba(34,211,238,0.5)]
    ">
        AI
    </div>

    </div>

    {/* Tagline */}

    <div className="mt-4 flex items-center gap-4">

    <div className="h-px w-24 bg-cyan-400/60" />

    <p className="text-cyan-300 text-lg">
        Forge Your Career
    </p>

    <div className="h-px w-24 bg-cyan-400/60" />

    </div>

    </div>
    </div>

    </div>
  </div>
  );
}