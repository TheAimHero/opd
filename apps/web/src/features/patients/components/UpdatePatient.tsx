'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { config } from '@opd/db_schema/patient';
import { updatePatient } from '@opd/schema/patient';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import SelectInput from '@/components/form-inputs/OptionInput';
import StringInput from '@/components/form-inputs/StringInput';
import TextAreaInput from '@/components/form-inputs/TextareaInput';
import NlpDatePickerInput from '@/components/NlpDatePicker';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useGetPatient } from '@/features/patients/hooks/getPatient';
import { useUpdatePatient } from '@/features/patients/hooks/updatePatient';
import { formatLongIndianDate } from '@/lib/date';

const formSchema = updatePatient.updatePatientReqBody;

interface Props {
  patientId: number;
}

const UpdatePatient = ({ patientId }: Props) => {
  const queryClient = useQueryClient();

  const {
    data: patient,
    refetch,
    isLoading: isPatientLoading,
  } = useGetPatient({ id: patientId });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...patient, id: patientId },
    disabled: isPatientLoading,
  });

  useEffect(
    () => form.reset({ ...patient }, { keepDefaultValues: false }),
    [patient, form.reset]
  );

  const { mutate: updatePatient, isPending: isUpdatePatientPending } =
    useUpdatePatient({
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: ['patient'],
        });
        toast.success('Patient updated successfully');
      },
      onError: () => {
        toast.error('Something went wrong');
        refetch();
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePatient(values);
  }

  function onReset() {
    form.reset({
      address: '',
      birthDate: undefined,
      bloodGroup: undefined,
      name: '',
      phoneNumber: '',
      sex: undefined,
    });
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto flex w-full max-w-sm flex-col gap-4"
        onReset={onReset}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <StringInput form={form} label="Name" name="name" placeholder="Name" />

        <StringInput
          form={form}
          label="Phone Number"
          name="phoneNumber"
          placeholder="Phone Number"
        />

        <SelectInput
          className="w-full capitalize"
          form={form}
          getLabel={(v) => v}
          getValue={(v) => v}
          itemClassName="capitalize"
          label="Sex"
          name="sex"
          options={[...config.GENDERS]}
          placeholder="Select Sex"
        />

        <SelectInput
          className="w-full"
          form={form}
          getLabel={(v) => v}
          getValue={(v) => v}
          itemClassName="capitalize"
          label="Blood Group"
          name="bloodGroup"
          options={[...config.BLOOD_GROUPS]}
          placeholder="Select Blood Group"
        />

        <TextAreaInput
          form={form}
          label="Address"
          name="address"
          placeholder="Address"
        />

        <NlpDatePickerInput
          form={form}
          hintString={(d) =>
            d && (
              <div className="text-sm">
                Birthday on {formatLongIndianDate(d)}
              </div>
            )
          }
          label="Birth Date"
          name="birthDate"
          placeholder="Birth Date"
        />

        <div className="flex w-full justify-start gap-2">
          <Button
            disabled={isUpdatePatientPending}
            onClick={form.handleSubmit(onSubmit)}
            size="sm"
            type="button"
          >
            Update
          </Button>
          <Button
            disabled={isUpdatePatientPending}
            onClick={onReset}
            size="sm"
            type="button"
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePatient;
