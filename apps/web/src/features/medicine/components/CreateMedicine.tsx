"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { config } from "@madhuprema/db_schema/medicine";
import { createMedicine } from "@madhuprema/schema/medicine";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import SelectInput from "@/components/form-inputs/OptionInput";
import StringInput from "@/components/form-inputs/StringInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateMedicine } from "@/features/medicine/hooks/createMedicine";
import { cn } from "@/lib/utils";

const formSchema = createMedicine.createMedicineReqBody;

interface Props {
  className?: string;
}

const CreateMedicine = ({ className }: Props) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      medicineType: "na",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { mutate: createMedicine, isPending: isCreateMedicinePending } =
    useCreateMedicine({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ["medicine"] });
        toast.success("Medicine created successfully");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMedicine(values);
  }

  function onReset() {
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          className={cn("mx-auto flex max-w-md flex-col gap-4", className)}
          onReset={onReset}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <StringInput
            form={form}
            label="Medicine Name"
            name="name"
            placeholder="Enter Medicine Name"
          />

          <SelectInput
            className="w-full capitalize"
            form={form}
            getLabel={(o) => o}
            getValue={(o) => o}
            itemClassName="capitalize w-full"
            label="Medicine Type"
            name="medicineType"
            options={[...config.MEDICINE_TYPES]}
            placeholder="Select Medicine Type"
          />
          <div className="flex w-full items-center justify-start gap-2">
            <Button disabled={isCreateMedicinePending} size="sm" type="submit">
              Submit
            </Button>
            <Button disabled={isCreateMedicinePending} size="sm" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateMedicine;
