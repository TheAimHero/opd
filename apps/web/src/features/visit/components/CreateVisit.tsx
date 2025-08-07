'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createVisit } from '@opd/schema/visit';
import { useQueryClient } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import StringInput from '@/components/form-inputs/StringInput';
import TextAreaInput from '@/components/form-inputs/TextareaInput';
import NlpDatePickerInput from '@/components/NlpDatePicker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import PrescribedMedicineTable from '@/features/medicine/components/PrescribedMedicineTable';
import SelectPrescribedMedicine from '@/features/medicine/components/SelectPresribedMedicine';
import PatientInfoEditSheet from '@/features/patients/components/PatientInfoSheet';
import PrescribedTestTable from '@/features/test/components/PrescribedTestTable';
import SelectPrescribedTest from '@/features/test/components/SelectPresribedTest';
import { useCreateVisit } from '@/features/visit/hooks/createVisit';
import { formatLongIndianDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import PrevVisitSheet from './PrevVisitSheet';
import PrintVisit from './PrintVisit';

const formSchema = createVisit.createVisitReqBody;

interface Props {
  patientId: number;
  className?: string;
}

const CreateVisit = ({ className, patientId }: Props) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { patientId, medicine: [], test: [] },
    resolver: zodResolver(formSchema),
  });

  const { append: addPrescribedMedicine, remove: removePrescribedMedicine } =
    useFieldArray({
      control: form.control,
      name: 'medicine',
    });

  const { append: addPrescribedTest, remove: removePrescribedTest } =
    useFieldArray({
      control: form.control,
      name: 'test',
    });

  const { mutate: createVisit, isPending: isCreateVisitPending } =
    useCreateVisit({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ['visit'] });
        toast.success('Visit created successfully');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createVisit(values);
  }

  function onReset() {
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          className={cn('grid grid-cols-3 gap-4', className)}
          onReset={onReset}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-2 flex flex-col gap-4">
            <div className="col-span-4 grid grid-cols-4 gap-2">
              <StringInput
                form={form}
                label="ENT"
                name="ent"
                postAdornment={<Badge>text</Badge>}
              />
              <StringInput
                form={form}
                label="Weight"
                name="weight"
                postAdornment={<Badge>kg</Badge>}
              />
              <StringInput
                form={form}
                label="Blood Pressure"
                name="bloodPressure"
                postAdornment={<Badge>mmHg</Badge>}
              />
              <StringInput
                form={form}
                label="Pulse"
                name="pulse"
                postAdornment={<Badge>bpm</Badge>}
              />
              <StringInput
                form={form}
                label="Temperature"
                name="temperature"
                postAdornment={<Badge>°F</Badge>}
              />
              <StringInput
                form={form}
                label="Respiration"
                name="respiration"
                postAdornment={<Badge>per min</Badge>}
              />
              <StringInput
                form={form}
                label="CVS"
                name="cvs"
                postAdornment={<Badge>text</Badge>}
              />
              <StringInput
                form={form}
                label="Abdomen"
                name="abdomen"
                postAdornment={<Badge>text</Badge>}
              />
            </div>

            <Separator className="col-span-4" />

            <div className="col-span-4 grid grid-cols-1 gap-2">
              <TextAreaInput
                className="w-full "
                form={form}
                label="Personal Remark"
                name="personalRemark"
                placeholder="Personal Remark"
              />
              <TextAreaInput
                className="w-full"
                form={form}
                label="Doctor's Advice"
                name="doctorsAdvice"
                placeholder="Doctor's Advice"
              />
              <TextAreaInput
                className="w-full"
                form={form}
                label="Complaints"
                name="complaints"
                placeholder="Complaints"
              />
              <TextAreaInput
                className="w-full "
                form={form}
                label="Diagnosis"
                name="diagnosis"
                placeholder="Diagnosis"
              />
              <TextAreaInput
                className="w-full "
                form={form}
                label="Treatment Plan"
                name="treatmentPlan"
                placeholder="Treatment Plan"
              />
            </div>
            <Separator className="col-span-4" />

            <div className="col-span-4 grid grid-cols-4 gap-2">
              <NlpDatePickerInput
                form={form}
                hintString={(d) =>
                  d && (
                    <span className="text-xs">
                      {`Next visit scheduled on ${formatLongIndianDate(d)}`}
                    </span>
                  )
                }
                label="Follow Up"
                name="followUp"
              />
            </div>

            <div className="col-span-full flex w-full items-center justify-start gap-2">
              <Button disabled={isCreateVisitPending} type="submit">
                Submit
              </Button>
              <Button disabled={isCreateVisitPending} type="reset">
                Reset
              </Button>

              <PrevVisitSheet patientId={patientId} />

              <PatientInfoEditSheet patientId={patientId} />

              <PrintVisit
                visitData={{ ...form.watch(), createdAt: new Date() }}
              />
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <SelectPrescribedMedicine
              className="col-span-2 flex flex-col items-baseline gap-2"
              onSubmit={(v) => addPrescribedMedicine(v)}
            />
            <PrescribedMedicineTable
              className="col-span-2 h-[200px]"
              data={form.watch('medicine') ?? []}
              onRemove={removePrescribedMedicine}
            />

            <Separator className="col-span-full" />

            <SelectPrescribedTest
              className="col-span-2 flex flex-col items-baseline gap-2"
              onSubmit={(v) => addPrescribedTest(v)}
            />
            <PrescribedTestTable
              className="col-span-2 h-[200px]"
              data={form.watch('test') ?? []}
              onRemove={removePrescribedTest}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateVisit;
