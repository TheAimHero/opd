'use client';

import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import Conditional from '@/components/Conditional';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Props<T extends FieldValues, TOption> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
  itemClassName?: string;
  options: TOption[];
  getValue: (option: TOption) => string;
  getLabel: (option: TOption) => string;
  disabled?: boolean;
}

const SelectInput = <T extends FieldValues, TOption>({
  form,
  name,
  label,
  description,
  placeholder = 'Select an option',
  className,
  itemClassName,
  options,
  getValue,
  getLabel,
  disabled = false,
}: Props<T, TOption>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('', className)}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <Select
              defaultValue={field.value}
              disabled={disabled}
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className={className}>
                {options.map((option) => {
                  const value = getValue(option);
                  const label = getLabel(option);
                  return (
                    <SelectItem
                      className={itemClassName}
                      key={value}
                      value={value}
                    >
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
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

export default SelectInput;
