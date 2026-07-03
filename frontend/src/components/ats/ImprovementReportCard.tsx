type Props = {
  report: string;
};

export default function ImprovementReportCard({
  report,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg md:col-span-2">
      <h2 className="text-lg font-semibold text-gray-900">
        Improvement Report
      </h2>

      <p className="leading-relaxed text-gray-700">
        {report}
      </p>
    </div>
  );
}