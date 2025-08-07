"use client";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import Conditional from "@/components/Conditional";
import AutoComplete, {
  type Props as AutoCompleteProps,
} from "@/components/ui/autocomplete";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues, TOption>
  extends AutoCompleteProps<TOption> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
}

const ComboboxInput = <T extends FieldValues, TOption>({
  form,
  label,
  name,
  description,
  className,
  options,
  onInputChange,
  placeholder = "Find something",
  emptyMessage = "No results.",
  isLoading = false,
  disabled = false,
  getLabel,
  getValue,
  onValueChange,
  value,
}: Props<T, TOption>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <AutoComplete<TOption>
              disabled={disabled}
              emptyMessage={emptyMessage}
              getLabel={getLabel}
              getValue={getValue}
              isLoading={isLoading}
              onInputChange={onInputChange}
              onValueChange={(v) => onValueChange(v)}
              options={options}
              placeholder={placeholder}
              value={value ?? field.value}
            />
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

export default ComboboxInput;
