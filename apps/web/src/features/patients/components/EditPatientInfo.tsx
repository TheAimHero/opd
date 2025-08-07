import { zodResolver } from '@hookform/resolvers/zod';
import { updatePatient } from '@opd/schema/patient';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import TextAreaInput from '@/components/form-inputs/TextareaInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useGetPatient } from '@/features/patients/hooks/getPatient';
import { useUpdatePatient } from '../hooks/updatePatient';

const { updatePatientReqBody } = updatePatient;

interface Props {
  patientId: number;
}

const formSchema = updatePatientReqBody.pick({
  allergy: true,
  familyHistory: true,
  medicalHistory: true,
  ongoingMedication: true,
  pastSurgery: true,
  systemicDiseases: true,
});

const EditPatientInfo = ({ patientId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      allergy: '',
      familyHistory: '',
      medicalHistory: '',
      ongoingMedication: '',
      pastSurgery: '',
      systemicDiseases: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { refetch } = useGetPatient(
    { id: patientId },
    { onSuccess: (data) => form.reset({ ...data }) }
  );

  const { mutate: updatePatient, isPending: isUpdatePatientPending } =
    useUpdatePatient({
      onSuccess: (data) => {
        toast.success('Patient updated successfully');
        form.reset({ ...data });
      },
      onError: () => {
        toast.error('Something went wrong');
        refetch();
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePatient({ ...values, id: patientId });
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <TextAreaInput
          form={form}
          label="Allergy"
          name="allergy"
          placeholder="Patient Allergies"
        />

        <TextAreaInput
          form={form}
          label="Medical History"
          name="medicalHistory"
          placeholder="Patient Medical History"
        />

        <TextAreaInput
          form={form}
          label="Ongoing Medication"
          name="ongoingMedication"
          placeholder="Patient Ongoing Medication"
        />

        <TextAreaInput
          form={form}
          label="Past Surgery"
          name="pastSurgery"
          placeholder="Patient Past Surgery"
        />

        <TextAreaInput
          form={form}
          label="Family History"
          name="familyHistory"
          placeholder="Patient Family History"
        />

        <TextAreaInput
          form={form}
          label="Systemic Diseases"
          name="systemicDiseases"
          placeholder="Patient Systemic Diseases"
        />

        <div className="flex w-full justify-start gap-2">
          <Button
            disabled={isUpdatePatientPending}
            onClick={form.handleSubmit(onSubmit)}
            size="sm"
            type="button"
          >
            Update Info
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPatientInfo;
