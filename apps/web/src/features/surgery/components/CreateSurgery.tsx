'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createSurgery } from '@opd/schema/surgery';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import StringInput from '@/components/form-inputs/StringInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCreateSurgery } from '@/features/surgery/hooks/createSurgery';
import { cn } from '@/lib/utils';

const formSchema = createSurgery.createSurgeryReqBody;

interface Props {
  className?: string;
}

const CreateSurgery = ({ className }: Props) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutate: createSurgery, isPending: isCreateSurgeryPending } =
    useCreateSurgery({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ['surgery'] });
        toast.success('Surgery created successfully');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createSurgery(values);
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
            label="Surgery Name"
            name="name"
            placeholder="Enter surgery name"
          />
          <div className="flex w-full items-center justify-start gap-2">
            <Button disabled={isCreateSurgeryPending} size="sm" type="submit">
              Submit
            </Button>
            <Button disabled={isCreateSurgeryPending} size="sm" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSurgery;
