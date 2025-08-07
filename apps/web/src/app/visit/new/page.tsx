"use client";

import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import PatientCard from "@/features/patients/components/PatientCard";
import CreateVisit from "@/features/visit/components/CreateVisit";

const Page = () => {
  const patientId = Number.parseInt(useSearchParams().get("id") || "");
  // TODO: Add ui to select patientId instead
  if (!patientId) return null;
  return (
    <div className="flex flex-col gap-4">
      <PatientCard patientId={patientId} />
      <Separator />
      <CreateVisit patientId={patientId} />
    </div>
  );
};

export default Page;
