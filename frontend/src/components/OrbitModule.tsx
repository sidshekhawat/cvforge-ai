interface OrbitModuleProps {
  title: string;
  description: string;
  radius: number;
  angle: number;
}

export default function OrbitModule({
  title,
  description,
  radius,
  angle,
}: OrbitModuleProps) {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }}
    >
      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-cyan-400/30
          bg-cyan-500/5
          backdrop-blur-sm
          px-4
          py-2
          shadow-[0_0_20px_rgba(34,211,238,0.2)]
        "
      >
        <div
          className="
            h-8
            w-8
            rounded-xl
            border
            border-cyan-400/40
            flex
            items-center
            justify-center
            text-cyan-300
          "
        >
          📄
        </div>

        <div>
          <p className="font-semibold text-white">
            {title}
          </p>

          <p className="text-xs text-cyan-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}