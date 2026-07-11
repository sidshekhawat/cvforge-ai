type Props = {
  score: number;
};

export default function ATSProgressRing({
  score,
}: Props) {
  const radius = 80;
  const strokeWidth = 13;

  const normalizedRadius =
    radius - strokeWidth / 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (score / 100) * circumference;

  const ringColor =
    score >= 90
      ? "#22c55e"
      : score >= 75
      ? "#3b82f6"
      : score >= 60
      ? "#eab308"
      : score >= 40
      ? "#f97316"
      : "#ef4444";

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke={ringColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
            filter: `drop-shadow(0 0 8px ${ringColor})`,
            }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-900">
                {score}%
            </span>

            <span className="text-xs font-medium text-gray-500">
                ATS Score
            </span>
            </div>
        </div>
    </div>
  );
}