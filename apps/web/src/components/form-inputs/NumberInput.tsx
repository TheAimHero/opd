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
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  description?: string;
  label: string;
  placeholder?: string;
  className?: string;
}

const NumberInput = <T extends FieldValues>({
  form,
  description,
  label,
  name,
  placeholder,
  className,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('', className)}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type="number"
              {...field}
              value={field.value || ''}
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

export default NumberInput;
