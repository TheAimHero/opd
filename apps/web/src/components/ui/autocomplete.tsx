import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import Conditional from "../Conditional";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Skeleton } from "./skeleton";

export interface Props<T> {
  options: T[];
  emptyMessage: string;
  value?: T;
  onValueChange: (value: T) => void;
  onInputChange?: (inputValue: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  getLabel: (item: T) => string;
  getValue: (item: T) => string | number;
  className?: string;
  popoverClassName?: string;

  preAdornment?: ReactNode;
  postAdornment?: ReactNode;
}

const AutoComplete = <T,>({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  onInputChange,
  disabled,
  isLoading = false,
  getLabel,
  getValue,
  className,
  popoverClassName,
  preAdornment,
  postAdornment,
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<T | undefined>(value);
  const [inputValue, setInputValue] = useState<string>(
    value ? getLabel(value) : "",
  );

  const handleInputChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      onInputChange?.(newValue);
    },
    [onInputChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => getLabel(option) === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange, getLabel],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected ? getLabel(selected) : "");
  }, [selected, getLabel]);

  const handleSelectOption = useCallback(
    (selectedOption: T) => {
      setInputValue(getLabel(selectedOption));

      setSelected(selectedOption);
      onValueChange(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange, getLabel],
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div
        className={cn(
          className,
          "relative flex w-full w-full rounded-md rounded-md border border px-2 focus-within:ring-1 focus-within:ring-ring",
        )}
      >
        <Conditional condition={!!preAdornment}>{preAdornment}</Conditional>
        <CommandInput
          className="w-full border-0 shadow-none focus-visible:ring-0"
          disabled={disabled}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          onValueChange={isLoading ? undefined : handleInputChange}
          placeholder={placeholder}
          ref={inputRef}
          value={inputValue}
        />
        <Conditional condition={!!postAdornment}>{postAdornment}</Conditional>
      </div>
      <div className={cn(className, popoverClassName, "relative mt-1")}>
        <div
          className={cn(
            "fade-in-0 zoom-in-95 absolute top-0 z-10 w-full animate-in rounded-xl bg-primary-foreground outline-none",
            isOpen ? "block" : "hidden",
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected
                    ? getValue(selected) === getValue(option)
                    : false;
                  return (
                    <CommandItem
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null,
                      )}
                      key={getValue(option)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      value={getLabel(option)}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {getLabel(option)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};

export default AutoComplete;
