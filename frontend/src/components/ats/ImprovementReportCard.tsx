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

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="leading-7 text-gray-700">
          {report}
        </p>
      </div>
    </div>
  );
}