type Props = {
  report: string;
};

export default function ImprovementReportCard({
  report,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg md:col-span-2">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        Improvement Report
      </h2>

      <p className="text-gray-700 leading-relaxed">
        {report}
      </p>
    </div>
  );
}