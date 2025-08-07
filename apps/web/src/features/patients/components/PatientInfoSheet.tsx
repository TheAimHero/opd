import { CloudAlertIcon, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useGetPatient } from '@/features/patients/hooks/getPatient';
import EditPatientInfo from './EditPatientInfo';

interface Props {
  patientId: number;
  className?: string;
}

const PatientInfoSheet = ({ patientId }: Props) => {
  const { isLoading: isPatientLoading, isSuccess: isPatientSuccess } =
    useGetPatient({ id: patientId });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Patient Details</Button>
      </SheetTrigger>

      <SheetContent className="min-w-3xl overflow-y-auto p-2">
        <SheetHeader className="flex w-full flex-row items-center justify-between gap-2">
          <div>
            <SheetTitle>Patient Details</SheetTitle>
            <SheetDescription>
              Here you can view and edit patient related details
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <Button className="min-w-[150px]" size="sm" variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="mx-auto flex w-full flex-col items-baseline justify-between">
          {isPatientLoading ? (
            <div className="mx-auto flex flex-col items-center justify-between gap-2">
              <span className="text-xl">Loading Data...</span>
              <Loader2Icon className="size-10 animate-spin antialiased" />
            </div>
          ) : isPatientSuccess ? (
            <EditPatientInfo patientId={patientId} />
          ) : (
            <div className="mx-auto flex flex-col items-center justify-between gap-2">
              <span className="text-xl">Failed to load data</span>
              <CloudAlertIcon className="size-10" />
            </div>
          )}
        </div>
        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
};

export default PatientInfoSheet;
