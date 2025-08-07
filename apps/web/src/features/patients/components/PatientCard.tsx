import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DescriptionDetail,
  DescriptionGroup,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPatient } from "@/features/patients/hooks/getPatient";
import { calculateAge, formatLongIndianDate } from "@/lib/date";
import { cn } from "@/lib/utils";

interface Props {
  patientId: number;
  className?: string;
}

const PatientCard = ({ patientId, className }: Props) => {
  const patient = useGetPatient({ id: patientId });

  if (patient.isLoading || !patient.data || patient.isError) {
    return (
      <Card className={cn(className, "p-2")}>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="mx-auto sm:text-xl">
            Patient Investigation Report
          </CardTitle>
          <DescriptionGroup className="flex items-center gap-2">
            <DescriptionTerm>Date</DescriptionTerm>
            <DescriptionDetail>
              {formatLongIndianDate(new Date())}
            </DescriptionDetail>
          </DescriptionGroup>
        </CardHeader>
        <CardContent className="">
          <DescriptionList className="flex flex-wrap items-center justify-between gap-2">
            {new Array(5).fill(0).map(() => (
              <DescriptionGroup key={Math.random()}>
                <DescriptionTerm>
                  <Skeleton className="h-4 w-32" />
                </DescriptionTerm>
                <DescriptionDetail className="capitalize">
                  <Skeleton className="h-4 w-56" />
                </DescriptionDetail>
              </DescriptionGroup>
            ))}
          </DescriptionList>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(className, "p-2")}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="mx-auto sm:text-xl">
          Patient Investigation Report
        </CardTitle>
        <DescriptionGroup className="flex items-center gap-2">
          <DescriptionTerm>Date</DescriptionTerm>
          <DescriptionDetail>
            {formatLongIndianDate(new Date())}
          </DescriptionDetail>
        </DescriptionGroup>
      </CardHeader>
      <CardContent className="">
        <DescriptionList className="flex flex-wrap items-center justify-between gap-2">
          <DescriptionGroup>
            <DescriptionTerm>Patient ID</DescriptionTerm>
            <DescriptionDetail className="capitalize">
              {patient.data.id}
            </DescriptionDetail>
          </DescriptionGroup>

          <DescriptionGroup>
            <DescriptionTerm>Patient Name</DescriptionTerm>
            <DescriptionDetail className="capitalize">
              {patient.data.name}
            </DescriptionDetail>
          </DescriptionGroup>

          <DescriptionGroup>
            <DescriptionTerm>Age/Sex</DescriptionTerm>
            <DescriptionDetail className="capitalize">
              {calculateAge(patient.data.birthDate)} / {patient.data.sex}
            </DescriptionDetail>
          </DescriptionGroup>

          <DescriptionGroup>
            <DescriptionTerm>Phone</DescriptionTerm>
            <DescriptionDetail>{patient.data.phoneNumber}</DescriptionDetail>
          </DescriptionGroup>

          <DescriptionGroup>
            <DescriptionTerm>Address</DescriptionTerm>
            <DescriptionDetail>{patient.data.address}</DescriptionDetail>
          </DescriptionGroup>

          <DescriptionGroup>
            <DescriptionTerm>Blood Group</DescriptionTerm>
            <DescriptionDetail>{patient.data.bloodGroup}</DescriptionDetail>
          </DescriptionGroup>
        </DescriptionList>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
