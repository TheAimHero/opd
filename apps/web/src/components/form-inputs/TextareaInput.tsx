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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

const TextAreaInput = <T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  description,
  className,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <Conditional condition={!!label}>
            <FormLabel className="capitalize">{label}</FormLabel>
          </Conditional>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="resize-none"
            />
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

export default TextAreaInput;
