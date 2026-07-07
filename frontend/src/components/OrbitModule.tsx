import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface OrbitModuleProps {
  title: string;
  description: string;
  radius: number;
  angle: number;
  icon: LucideIcon;
  href: string;
}

export default function OrbitModule({
  title,
  description,
  radius,
  angle,
  icon,
  href,
}: OrbitModuleProps) {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  const Icon = icon;

  return (
    <div
      className="absolute top-1/2 left-1/2  z-50"
      style={{
        transform: `
          translate(-50%, -50%)
          translate(${x}px, ${y}px)
        `
      }}
    >
    <Link href={href}>
      <div
        className="
          group
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
          cursor-pointer
          shadow-[0_0_20px_rgba(34,211,238,0.2)]

          transform-gpu
          transition-all
          duration-300
          ease-out

          hover:scale-105
          hover:-translate-y-1
          hover:border-cyan-300/60
          hover:bg-cyan-500/10
          hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
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
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:text-cyan-200
          "
        >
          <Icon size={18} />
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
    </Link>
    </div>
  );
} 