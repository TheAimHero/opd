'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createTest } from '@opd/schema/test';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import StringInput from '@/components/form-inputs/StringInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCreateTest } from '@/features/test/hooks/createTest';
import { cn } from '@/lib/utils';

const formSchema = createTest.createTestReqBody;

interface Props {
  className?: string;
}

const CreateTest = ({ className }: Props) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { name: '' },
    resolver: zodResolver(formSchema),
  });

  const { mutate: createTest, isPending: isCreateTestPending } = useCreateTest({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['test'] });
      toast.success('Test created successfully');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTest(values);
  }

  function onReset() {
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          className={cn('mx-auto flex max-w-md flex-col gap-4', className)}
          onReset={onReset}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <StringInput
            className="w-full"
            form={form}
            label="Test Name"
            name="name"
            placeholder="Enter test name"
          />
          <div className="flex w-full items-center justify-start gap-2">
            <Button disabled={isCreateTestPending} size="sm" type="submit">
              Submit
            </Button>
            <Button disabled={isCreateTestPending} size="sm" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTest;
