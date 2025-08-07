import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import Conditional from "@/components/Conditional";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  description?: string;
  label: string;
  placeholder?: string;
  className?: string;
}

const DateInput = <T extends FieldValues>({
  form,
  className,
  name,
  label,
  description,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  variant={"outline"}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                captionLayout="dropdown"
                mode="single"
                onSelect={field.onChange}
                selected={field.value as unknown as Date}
              />
            </PopoverContent>
          </Popover>
          <Conditional condition={!!description}>
            <FormDescription>{description!}</FormDescription>
          </Conditional>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInput;
