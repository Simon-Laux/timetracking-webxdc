import { test, expect } from "vitest";
import {
  getEntriesInTimeframeCutToIt,
  getEntriesTouchingTimeframe,
  isEntryTouchingTimeframe,
} from "./entryMaths";
import type { TaskEntry } from "./store";

const entry: TaskEntry = {
  id: "no id",
  label: "test",
  start: 5_000,
  end: 10_000,
};
// {} is timeframe, [] is entry
test("isEntryTouchingTimeframe [ { ] }", () => {
  expect(isEntryTouchingTimeframe(entry, 6_000, 11_000)).toBe(true);
});

test("isEntryTouchingTimeframe { [] }", () => {
  expect(isEntryTouchingTimeframe(entry, 4_000, 12_000)).toBe(true);
});

test("isEntryTouchingTimeframe { [ } ]", () => {
  expect(isEntryTouchingTimeframe(entry, 4_000, 7_000)).toBe(true);
});

test("isEntryTouchingTimeframe [] {}", () => {
  expect(isEntryTouchingTimeframe(entry, 12_000, 14_000)).toBe(false);
});

test("isEntryTouchingTimeframe {} []", () => {
  expect(isEntryTouchingTimeframe(entry, 2_000, 4_000)).toBe(false);
});

const entries: TaskEntry[] = [
  {
    id: "1",
    label: "test",
    start: 5_000,
    end: 10_000,
    duration: 5_000,
  },
  {
    id: "2",
    label: "build",
    start: 11_000,
    end: 12_000,
    duration: 1_000,
  },
  {
    id: "3",
    label: "compile",
    start: 17_000,
    end: 22_000,
    duration: 5_000,
  },
];

test("getEntriesTouchingTimeframe", () => {
  expect(getEntriesTouchingTimeframe(entries, 11_000, 14_000)).toStrictEqual([
    entries[1],
  ]);
  expect(getEntriesTouchingTimeframe(entries, 11_000, 18_000)).toStrictEqual([
    entries[1],
    entries[2],
  ]);
  expect(getEntriesTouchingTimeframe(entries, 11_000, 30_000)).toStrictEqual([
    entries[1],
    entries[2],
  ]);
  expect(getEntriesTouchingTimeframe(entries, 9_000, 30_000)).toStrictEqual([
    entries[0],
    entries[1],
    entries[2],
  ]);
});

test("getEntriesInTimeframeCutToIt", () => {
  expect(getEntriesInTimeframeCutToIt(entries, 6_000, 18_000)).toStrictEqual([
    { ...entries[0], start: 6_000, duration: 4_000 },
    entries[1],
    { ...entries[2], end: 18_000, duration: 1_000 },
  ]);
  expect(getEntriesInTimeframeCutToIt(entries, 6_000, 30_000)).toStrictEqual([
    { ...entries[0], start: 6_000, duration: 4_000 },
    entries[1],
    entries[2],
  ]);
  expect(getEntriesInTimeframeCutToIt(entries, 6_500, 11_500)).toStrictEqual([
    { ...entries[0], start: 6_500, duration: 3_500 },
    { ...entries[1], end: 11_500, duration: 500 },
  ]);
});

// start and end outside
const entries2 = [
  {
    id: "3",
    label: "compile",
    start: 11_000,
    end: 2_211_000,
    duration: 2_200_000,
  },
];

test("getEntriesTouchingTimeframe start and end outside", () => {
  expect(getEntriesTouchingTimeframe(entries2, 40_000, 45_000)).toStrictEqual([
    entries2[0],
  ]);
});
test("getEntriesInTimeframeCutToIt start and end outside", () => {
  expect(getEntriesInTimeframeCutToIt(entries2, 40_000, 45_000)).toStrictEqual([
    { ...entries2[0], start: 40_000, end: 45_000, duration: 5_000 },
  ]);
});

test("getEntriesTouchingTimeframe start outside, no end", () => {
  const entries2: TaskEntry[] = [
    {
      id: "3",
      label: "compile",
      start: 11_000,
    },
  ];

  expect(getEntriesTouchingTimeframe(entries2, 40_000, 45_000)).toStrictEqual([
    entries2[0],
  ]);
});
