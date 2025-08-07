"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema as prescribedTest } from "@madhuprema/db_schema/prescribedTest";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import ComboboxInput from "@/components/form-inputs/ComboboxInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGetAllTest } from "@/features/test/hooks/getAllTest";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void | Promise<void>;
}

const formSchema = prescribedTest.prescribedTestInsertSchema.omit({
  visitId: true,
});

const SelectPrescribedTest = ({ className, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {},
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { data: test, isLoading: isTestLoading } = useGetAllTest();

  return (
    <Form {...form}>
      <div className={cn("w-full", className)}>
        <ComboboxInput
          form={form}
          label="Test"
          name="testId"
          placeholder="Select Test"
          options={test ?? []}
          onValueChange={(v) => form.setValue("testId", v.id)}
          getLabel={(m) => m.name}
          getValue={(m) => m.id}
          isLoading={isTestLoading}
          emptyMessage="No Test found."
          className="w-full"
        />
        <Button
          type="button"
          onClick={() => {
            const { data, success } = formSchema.safeParse(form.getValues());
            if (!success) {
              toast.error("Select necessary test values and dosage");
              return;
            }
            onSubmit(data);
          }}
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default SelectPrescribedTest;
