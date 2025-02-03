import { useVirtualizer } from "@tanstack/react-virtual";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

const elementSize = 30;

export function TimeSpentPage() {
  // TODO: option for user to define custom range
  // TODO: specify sorting

  const [timeRange, setTimeRange] = useState<[start: number, end?: number]>([
    0,
  ]);
  const timeSpentByLabel = useStore
    .getState()
    .getTimeSpendByLabel(...timeRange);

  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: timeSpentByLabel.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => elementSize,
    overscan: 5,
    getItemKey: (index) => timeSpentByLabel[index].label,
  });

  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <button className="w-full p-2 text-start" onClick={() => navigate(-1)}>
        &lt; Back
      </button>
      <hr />
      <div ref={parentRef} className="flex-grow overflow-y-scroll">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
            overscrollBehaviorX: "none",
            overflowX: "hidden",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className={
                virtualRow.index % 2
                  ? " bg-slate-100 dark:bg-slate-800"
                  : " bg-slate-200 dark:bg-slate-900"
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="flex">
                <div className="grow p-2">
                  {timeSpentByLabel[virtualRow.index].label}
                </div>
                <div className="p-2">
                  {timeSpentByLabel[virtualRow.index].timeSpend
                    .shiftTo("hours", "minutes", "milliseconds")
                    .set({ milliseconds: 0 })
                    .shiftTo("hours", "minutes")
                    .toHuman({ unitDisplay: "short" })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
