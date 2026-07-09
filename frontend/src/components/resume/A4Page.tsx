interface A4PageProps {
  children: React.ReactNode;
}

export default function A4Page({
  children,
}: A4PageProps) {
  return (
    <div
      className="
        mx-auto
        w-[210mm]
        min-h-[297mm]
        bg-white
        shadow-xl
      "
    >
      {children}
    </div>
  );
}