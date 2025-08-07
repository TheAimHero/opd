import { atom } from "jotai";
import type { DateRange } from "react-day-picker";

export const searchAtom = atom<string>("");

export const dateRangeAtom = atom<DateRange | undefined>(undefined);
