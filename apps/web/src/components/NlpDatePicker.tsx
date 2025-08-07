"use client";

import { parseDate } from "chrono-node/uk";
import { CalendarIcon } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatShortIndianDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import Conditional from "./Conditional";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  hintString?: (date: Date | undefined) => ReactNode;
}

const NlpDatePickerInput = <T extends FieldValues>({
  form,
  label,
  name,
  description,
  placeholder,
  hintString,
  className,
}: Props<T>) => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState<string>(
    formatShortIndianDate(form.getValues(name)),
  );
  const [month, setMonth] = useState<Date | undefined>(form.getValues(name));

  useEffect(() => {
    setValue(formatShortIndianDate(form.getValues(name)));
    setValue(formatShortIndianDate(form.getValues(name)));
  }, [form.getValues(name)]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <div>
              <div className="relative flex gap-2">
                <Input
                  className="bg-background pr-10"
                  id="date"
                  onChange={(e) => {
                    setValue(e.target.value);
                    const date = parseDate(e.target.value);
                    if (date) {
                      field.onChange(date);
                      setMonth(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                  placeholder={placeholder}
                  defaultValue={value}
                />
                <Popover onOpenChange={setOpen} open={open}>
                  <PopoverTrigger asChild>
                    <Button
                      className="-translate-y-1/2 absolute top-1/2 right-2 size-6"
                      id="date-picker"
                      variant="ghost"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">Select date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="w-auto overflow-hidden p-0"
                  >
                    <Calendar
                      captionLayout="dropdown"
                      mode="single"
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        field.onChange(date);
                        setValue(formatDate(date));
                        setOpen(false);
                      }}
                      selected={field.value}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {hintString?.(field.value)}
            </div>
          </FormControl>
          <Conditional condition={!!description}>
            <FormDescription>{description!}</FormDescription>
          </Conditional>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NlpDatePickerInput;
