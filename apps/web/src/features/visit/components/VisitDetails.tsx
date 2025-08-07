import { Loader2Icon } from "lucide-react";
import type { ReactNode } from "react";
import {
  DescriptionDetail,
  DescriptionGroup,
  DescriptionTerm,
} from "@/components/ui/description-list";
import { Separator } from "@/components/ui/separator";
import PrescribedMedicineTable from "@/features/medicine/components/PrescribedMedicineTable";
import PatientCard from "@/features/patients/components/PatientCard";
import PrescribedTestTable from "@/features/test/components/PrescribedTestTable";
import { useGetVisit } from "@/features/visit/hooks/getVisit";
import { formatLongIndianDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import PrintVisit from "./PrintVisit";

interface Props {
  visitId: number;
  className?: string;
}

const VisitDetail = ({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) => {
  return (
    <DescriptionGroup className={cn("", className)}>
      <DescriptionTerm>{label}</DescriptionTerm>
      <DescriptionDetail>{value || ""}</DescriptionDetail>
    </DescriptionGroup>
  );
};

const VisitDetails = ({ visitId, className }: Props) => {
  const { data: visit } = useGetVisit({
    id: visitId,
  });
  // FIX: handle error state better

  if (!visit) {
    return (
      <div className="mt-[10%] flex flex-col items-center gap-2">
        <Loader2Icon className="size-10 animate-spin antialiased" />
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <PatientCard patientId={visit.patientId} />
      <div
        className={cn(
          "grid w-full grid-cols-3 justify-between gap-4",
          className,
        )}
      >
        <div className="col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-2 justify-between gap-4">
            <VisitDetail label="ENT" value={`${visit.ent || ""}`} />
            <VisitDetail label="Weight" value={`${visit.weight || ""}`} />
            <VisitDetail
              label="Blood Pressure"
              value={`${visit.bloodPressure || ""}mmHg`}
            />
            <VisitDetail
              label="Pulse"
              value={`${visit.bloodPressure || ""}bpm`}
            />
            <VisitDetail
              label="Temperature"
              value={`${visit.temperature || ""}°F`}
            />
            <VisitDetail
              label="Respiration"
              value={`${visit.respiration || ""}per min`}
            />
            <VisitDetail label="CVS" value={`${visit.cvs || ""}`} />
            <VisitDetail label="Abdomen" value={`${visit.abdomen || ""}`} />
          </div>

          <Separator className="col-span-4" />

          <div className="grid grid-cols-1 gap-4">
            <VisitDetail
              label="Personal Remark"
              value={visit.personalRemark || "NA"}
            />
            <VisitDetail
              label="Doctor's Advice"
              value={visit.doctorsAdvice || "NA"}
            />
            <VisitDetail label="Complaints" value={visit.complaints || "NA"} />
            <VisitDetail label="Diagnosis" value={visit.diagnosis || "NA"} />
            <VisitDetail
              label="Treatment Plan"
              value={visit.treatmentPlan || "NA"}
            />
          </div>
          <Separator className="col-span-4" />

          <div className="">
            <VisitDetail
              label="Follow Up"
              value={`Next visit scheduled on ${formatLongIndianDate(visit.followUp || "")}`}
            />
          </div>

          <Separator className="col-span-4" />

          <div className="col-span-full flex w-full items-center justify-start gap-2">
            <PrintVisit
              visitData={{ ...visit, createdAt: visit.createdAt || new Date() }}
            />
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-2">
          <PrescribedMedicineTable
            data={visit.medicine ?? []}
            className="col-span-2 h-[200px]"
          />

          <Separator className="col-span-full" />

          <PrescribedTestTable
            data={visit.test ?? []}
            className="col-span-2 h-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default VisitDetails;
