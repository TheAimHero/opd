import { useSetAtom } from "jotai";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { searchAtom } from "@/features/patients/state/search";

const PatientSearch = () => {
  const setSearchTerm = useSetAtom(searchAtom);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounceValue(inputValue, 500);

  // Update search term only after debounce delay
  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <div className="flex w-full items-center justify-between rounded-md border px-2">
      <SearchIcon />
      <Input
        className="border-0 shadow-none focus-visible:ring-0"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search patient by name, id, phone."
        value={inputValue}
      />
    </div>
  );
};

export default PatientSearch;
