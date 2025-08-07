import { useAtom, useSetAtom } from "jotai";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateRangeAtom, searchAtom } from "@/features/visit/state/search";
import { useSearchParams } from "next/navigation";

const VisitSearch = () => {
  const search = useSearchParams().get("search");

  const setSearchTerm = useSetAtom(searchAtom);
  const [inputValue, setInputValue] = useState("");
  const [range, setRange] = useAtom(dateRangeAtom);

  const [debouncedValue] = useDebounceValue(inputValue, 500);

  // Update search term only after debounce delay
  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex w-full items-center justify-between rounded-md border px-2">
        <SearchIcon />
        <Input
          className="border-0 shadow-none focus-visible:ring-0"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search visit by patient name, id, phone."
          value={inputValue}
        />
      </div>
      <div className="flex gap-3">
        <Label htmlFor="dates" className="text-nowrap px-1">
          Visit Date Range
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="dates"
              className="w-56 justify-between font-normal"
            >
              {range?.from && range?.to
                ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              captionLayout="dropdown"
              onSelect={(range) => {
                setRange(range);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default VisitSearch;
