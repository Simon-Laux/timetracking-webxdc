import { DateTime } from "luxon";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AlertDialog } from "../../components/AlertDialog";
import { useStore } from "../../store";

export function ExportReportPage() {
  const navigate = useNavigate();

  type exportRange = { label: string; range: string | "All" };
  const [exportRanges, setExportRanges] = useState<exportRange[]>([]);

  const monthsWithEntries = useStore((s) => s.monthsWithEntries);
  useEffect(() => {
    // get all availible months
    const ranges = monthsWithEntries
      .map((e) => {
        const month = DateTime.fromObject(e);
        const start = DateTime.fromObject(e).startOf("month");
        const end = DateTime.fromObject(e).endOf("month");

        return {
          label: `${month.monthLong} ${month.year} (${start.toLocaleString(
            DateTime.DATE_SHORT,
          )} - ${end.toLocaleString(DateTime.DATE_SHORT)})`,
          range: `${start.toMillis()}:${end.toMillis()}`,
        };
      })
      .reverse();

    setExportRanges([{ label: "Everything", range: "All" }, ...ranges]);
  }, [monthsWithEntries]);
  const rangeSelection = useRef<HTMLSelectElement | null>(null);

  const [whyIsMyMonthMissingShown, setWhyIsMyMonthMissingShown] =
    useState<boolean>(false);

  return (
    <div className="flex h-full flex-col">
      <button className="w-full p-2 text-start" onClick={() => navigate(-1)}>
        &lt; Back
      </button>
      <hr />
      <div className="overflow-y-scroll">
        <h1 className="px-2 py-1 text-2xl">Generate Report</h1>
        <div className="px-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">
                What should the export include?
              </span>
            </label>
            <select className="select-bordered select" ref={rangeSelection}>
              {exportRanges.map(({ label, range }) => (
                <option key={range} value={range}>
                  {label}
                </option>
              ))}
            </select>

            <label className="label">
              <span className="label-text-alt"></span>
              <span
                className="label-text-alt underline"
                onClick={() => setWhyIsMyMonthMissingShown(true)}
              >
                why is my month not shown?
              </span>
            </label>
          </div>
          <h1 className="text-lg">CSV File</h1>
          <button className="btn">Report of Entries</button>
          <button className="btn">Report of Days</button>
          <h1 className="text-lg">ODS (LibreOffice) Table</h1>
          <button className="btn">Report Workbook File</button>
        </div>
        {whyIsMyMonthMissingShown && (
          <AlertDialog
            onClose={() => setWhyIsMyMonthMissingShown(false)}
            title={"Why is my month not shown?"}
            message={`Restart the app if your month is not shown,
If that does not help check in the entries tab if there are any entries in the month you want to export.`}
          />
        )}
      </div>
    </div>
  );
}
