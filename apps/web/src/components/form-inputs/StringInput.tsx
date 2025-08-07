import type { ReactNode } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import Conditional from "@/components/Conditional";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  preAdornment?: ReactNode;
  postAdornment?: ReactNode;
}

const StringInput = <T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  description,
  className,
  preAdornment,
  postAdornment,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <div className="relative flex items-center rounded-md border px-2 focus-within:ring-1 focus-within:ring-ring">
              <Conditional condition={!!preAdornment}>
                {preAdornment}
              </Conditional>
              <Input
                placeholder={placeholder}
                type="text"
                {...field}
                className="border-0 shadow-none focus-visible:ring-0"
              />
              <Conditional condition={!!postAdornment}>
                {postAdornment}
              </Conditional>
            </div>
          </FormControl>
          <Conditional condition={!!description}>
            <FormDescription>{description}</FormDescription>
          </Conditional>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StringInput;
