"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema as prescribedMedicine } from "@madhuprema/db_schema/prescribedMedicine";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import ComboboxInput from "@/components/form-inputs/ComboboxInput";
import TextAreaInput from "@/components/form-inputs/TextareaInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetAllMedicines } from "@/features/medicine/hooks/getAllMedicine";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void | Promise<void>;
}

const formSchema = prescribedMedicine.prescribedMedicineInsertSchema.omit({
  visitId: true,
});

const SelectPrescribedMedicine = ({ className, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {},
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { data: medicine, isLoading: isMedicineLoading } = useGetAllMedicines();

  return (
    <Form {...form}>
      <div className={cn("w-full", className)}>
        <ComboboxInput
          form={form}
          label="Medicine"
          name="medicineId"
          placeholder="Select Medicine"
          options={medicine ?? []}
          onValueChange={(v) => form.setValue("medicineId", v.id)}
          getLabel={(m) => m.name}
          getValue={(m) => m.id}
          isLoading={isMedicineLoading}
          emptyMessage="No medicines found."
          className="w-full"
          preAdornment={<SearchIcon />}
        />
        <div className="flex flex-row gap-2">
          <Label className="col-span-full">Dosage</Label>
          <div className="col-span-full flex flex-row rounded-md border">
            <Input
              className="border-0 shadow-none focus-visible:ring-0"
              placeholder="Morning"
              {...form.register("morning")}
            />
            <Input
              className="rounded-none border-0 border-x shadow-none focus-visible:ring-0 "
              placeholder="Afternoon"
              {...form.register("afternoon")}
            />
            <Input
              className="border-0 shadow-none focus-visible:ring-0"
              placeholder="Evening"
              {...form.register("evening")}
            />
          </div>
        </div>
        <TextAreaInput
          form={form}
          name="note"
          label="Note"
          placeholder="Additional notes"
          className="w-full"
        />
        <Button
          type="button"
          onClick={() => {
            const { data, success } = formSchema.safeParse(form.getValues());
            if (!success) {
              toast.error("Select necessary medicine values and dosage");
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

export default SelectPrescribedMedicine;
