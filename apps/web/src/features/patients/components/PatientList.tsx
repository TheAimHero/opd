import { getPatient } from "@madhuprema/schema/patient";
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { differenceInMonths, differenceInYears } from "date-fns";
import { useAtomValue } from "jotai";
import Link from "next/link";
import type z from "zod";
import SimpleTable from "@/components/table/SimpleTable";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAllPatients } from "@/features/patients/hooks/getAllPatient";
import { searchAtom } from "@/features/patients/state/search";
import { calculateAge } from "@/lib/date";
import UpdatePatient from "./UpdatePatient";

const { getAllPatientRes } = getPatient;
type Patient = z.infer<typeof getAllPatientRes>[number];

const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="capitalize">{row.original.name}</span>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => row.original.phoneNumber,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 antialiased">
          <Dialog>
            <DialogTrigger asChild>
              <Badge className="cursor-pointer select-none">Update</Badge>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Patient Form</DialogTitle>
              </DialogHeader>
              <UpdatePatient patientId={row.original.id} />
            </DialogContent>
          </Dialog>
          <Badge>
            <Link href={`/visit/new?id=${row.original.id}`}>New Visit</Link>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => <span className="capitalize">{row.original.sex}</span>,
  },
  {
    accessorKey: "bloodGroup",
    header: "Blood Group",
    cell: ({ row }) => row.original.bloodGroup,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.address}</span>
    ),
  },
  {
    id: "age",
    header: "Age",
    cell: ({ row }) => calculateAge(row.original.birthDate),
  },
];

const PatientList = () => {
  const searchTerm = useAtomValue(searchAtom);

  const { data } = useGetAllPatients({ search: searchTerm, limit: 15 });

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    rowCount: data?.length ?? 0,

    getCoreRowModel: getCoreRowModel(),

    state: {},
  });
  return <SimpleTable table={table} />;
};

export default PatientList;
