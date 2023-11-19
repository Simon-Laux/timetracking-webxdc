import { useNavigate } from "react-router-dom";

export function ExportReportPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <button className="w-full p-2 text-start" onClick={() => navigate(-1)}>
        &lt; Back
      </button>
      <hr />
      <div className="overflow-y-scroll">
        <h1 className="px-2 py-1 text-2xl">About Timetracking</h1>
        <div className="px-2">
          <p>Export report</p>
          {/* TODO export range */}
          <button className="btn" onClick={exportReportCSV.bind(null)}>
            Export CSV Days
          </button>
        </div>
      </div>
    </div>
  );
}

import ExcelJS from "exceljs";
import { DateTime } from "luxon";
import "webxdc-types/global";

async function exportReportCSV() {
  // write to a file with custom value formatting
  const workbook = new ExcelJS.Workbook();

  workbook.title = "Timetracking TODO DATE RANGE";

  const entries_book = workbook.addWorksheet("Task entries");

  entries_book.addTable({
    name: "MyTable",
    ref: "A1",
    headerRow: true,
    totalsRow: true,
    style: {
      theme: "TableStyleDark3",
      showRowStripes: true,
    },
    columns: [
      { name: "Date", totalsRowLabel: "Totals:", filterButton: true },
      { name: "Amount", totalsRowFunction: "sum", filterButton: false },
    ],
    rows: [
      [new Date("2019-07-20"), 70.1],
      [new Date("2019-07-21"), 70.6],
      [new Date("2019-07-22"), 70.1],
    ],
  });

  entries_book.addTable({
    name: "MyTable2",
    ref: "F1",
    headerRow: true,
    totalsRow: true,
    style: {
      theme: "TableStyleDark3",
      showRowStripes: true,
    },
    columns: [
      { name: "Date2", totalsRowLabel: "Totals:", filterButton: true },
      { name: "Amount2", totalsRowFunction: "sum", filterButton: false },
    ],
    rows: [
      [new Date("2019-07-20"), 70.1],
      [new Date("2019-07-21"), 70.6],
      [new Date("2019-07-22"), 70.1],
    ],
  });

  // write to a new buffer
  const buffer = await workbook.csv.writeBuffer({});
  const blob = new Blob([buffer]);

  window.webxdc.sendToChat({
    file: { blob, name: "export_TT.csv" }, // TODO name
  });
}
