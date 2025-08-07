"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreatePatient from "@/features/patients/components/CreatePatient";
import PatientList from "@/features/patients/components/PatientList";
import PatientSearch from "@/features/patients/components/PatientSearch";

export default function Home() {
  return (
    <div className="relative flex h-full flex-col gap-2">
      <div className="flex flex-row items-center justify-between gap-2">
        <PatientSearch />
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">Create New Patient</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Patient Form</DialogTitle>
            </DialogHeader>
            <CreatePatient />
          </DialogContent>
        </Dialog>
      </div>
      <PatientList />
    </div>
  );
}
