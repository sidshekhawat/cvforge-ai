import OrbitModule from "@/src/components/OrbitModule";

export default function HomeHub() {
  const orbitBase =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border";

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

<div className="relative flex flex-col items-center -translate-y-20">

{/* Orbit Rings*/}        

<div className={`${orbitBase} h-[300px] w-[300px] border-cyan-400/25`} />

<div className={`${orbitBase} h-[500px] w-[500px] border-cyan-400/20`} />

<div className={`${orbitBase} h-[700px] w-[700px] border-cyan-400/20`} />

<div className={`${orbitBase} h-[960px] w-[960px] border-cyan-400/20`} />
{/* Orbit System*/}
<OrbitModule
  title="Resume Builder"
  description="Create ATS-ready resumes"
  radius={550}
  angle={225}
/>

<OrbitModule
  title="ATS Analyzer"
  description="Analyze ATS compatibility"
  radius={550}
  angle={315}
/>

<OrbitModule
  title="Templates"
  description="Professional resume designs"
  radius={550}
  angle={45}
/>

<OrbitModule
  title="Profile"
  description="Manage account settings"
  radius={550}
  angle={135}
/>

<OrbitModule
  title="Cover Letter"
  description="Generate tailored letters"
  radius={450}
  angle={30}
/>

<OrbitModule
  title="Job Match"
  description="Match resumes with jobs"
  radius={400}
  angle={210}
/>

<OrbitModule
  title="Analytics"
  description="Track ATS performance"
  radius={300}
  angle={90}
/>

<OrbitModule
  title="History"
  description="View past analyses"
  radius={250}
  angle={270}
/>


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
    -top-1
    -right-2
    px-3
    py-1
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
  );
}