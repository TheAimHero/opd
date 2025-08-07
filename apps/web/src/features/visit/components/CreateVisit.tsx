"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createVisit } from "@madhuprema/schema/visit";
import { useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import StringInput from "@/components/form-inputs/StringInput";
import TextAreaInput from "@/components/form-inputs/TextareaInput";
import NlpDatePickerInput from "@/components/NlpDatePicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import PrescribedMedicineTable from "@/features/medicine/components/PrescribedMedicineTable";
import SelectPrescribedMedicine from "@/features/medicine/components/SelectPresribedMedicine";
import PatientInfoEditSheet from "@/features/patients/components/PatientInfoSheet";
import PrescribedTestTable from "@/features/test/components/PrescribedTestTable";
import SelectPrescribedTest from "@/features/test/components/SelectPresribedTest";
import { useCreateVisit } from "@/features/visit/hooks/createVisit";
import { formatLongIndianDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import PrevVisitSheet from "./PrevVisitSheet";
import PrintVisit from "./PrintVisit";

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
      name: "medicine",
    });

  const { append: addPrescribedTest, remove: removePrescribedTest } =
    useFieldArray({
      control: form.control,
      name: "test",
    });

  const { mutate: createVisit, isPending: isCreateVisitPending } =
    useCreateVisit({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ["visit"] });
        toast.success("Visit created successfully");
      },
      onError: () => {
        toast.error("Something went wrong");
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
          className={cn("grid grid-cols-3 gap-4", className)}
          onReset={onReset}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-2 flex flex-col gap-4">
            <div className="col-span-4 grid grid-cols-4 gap-2">
              <StringInput
                form={form}
                name="ent"
                label="ENT"
                postAdornment={<Badge>text</Badge>}
              />
              <StringInput
                form={form}
                name="weight"
                label="Weight"
                postAdornment={<Badge>kg</Badge>}
              />
              <StringInput
                form={form}
                name="bloodPressure"
                label="Blood Pressure"
                postAdornment={<Badge>mmHg</Badge>}
              />
              <StringInput
                form={form}
                name="pulse"
                label="Pulse"
                postAdornment={<Badge>bpm</Badge>}
              />
              <StringInput
                form={form}
                name="temperature"
                label="Temperature"
                postAdornment={<Badge>°F</Badge>}
              />
              <StringInput
                form={form}
                name="respiration"
                label="Respiration"
                postAdornment={<Badge>per min</Badge>}
              />
              <StringInput
                form={form}
                name="cvs"
                label="CVS"
                postAdornment={<Badge>text</Badge>}
              />
              <StringInput
                form={form}
                name="abdomen"
                label="Abdomen"
                postAdornment={<Badge>text</Badge>}
              />
            </div>

            <Separator className="col-span-4" />

            <div className="col-span-4 grid grid-cols-1 gap-2">
              <TextAreaInput
                form={form}
                name="personalRemark"
                label="Personal Remark"
                placeholder="Personal Remark"
                className="w-full "
              />
              <TextAreaInput
                form={form}
                name="doctorsAdvice"
                label="Doctor's Advice"
                placeholder="Doctor's Advice"
                className="w-full"
              />
              <TextAreaInput
                form={form}
                name="complaints"
                label="Complaints"
                placeholder="Complaints"
                className="w-full"
              />
              <TextAreaInput
                form={form}
                name="diagnosis"
                label="Diagnosis"
                placeholder="Diagnosis"
                className="w-full "
              />
              <TextAreaInput
                form={form}
                name="treatmentPlan"
                label="Treatment Plan"
                placeholder="Treatment Plan"
                className="w-full "
              />
            </div>
            <Separator className="col-span-4" />

            <div className="col-span-4 grid grid-cols-4 gap-2">
              <NlpDatePickerInput
                form={form}
                name="followUp"
                label="Follow Up"
                hintString={(d) =>
                  d && (
                    <span className="text-xs">
                      {`Next visit scheduled on ${formatLongIndianDate(d)}`}
                    </span>
                  )
                }
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
              onSubmit={(v) => addPrescribedMedicine(v)}
              className="col-span-2 flex flex-col items-baseline gap-2"
            />
            <PrescribedMedicineTable
              data={form.watch("medicine") ?? []}
              onRemove={removePrescribedMedicine}
              className="col-span-2 h-[200px]"
            />

            <Separator className="col-span-full" />

            <SelectPrescribedTest
              onSubmit={(v) => addPrescribedTest(v)}
              className="col-span-2 flex flex-col items-baseline gap-2"
            />
            <PrescribedTestTable
              data={form.watch("test") ?? []}
              className="col-span-2 h-[200px]"
              onRemove={removePrescribedTest}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateVisit;
