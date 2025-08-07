import { schema as prescribedMedicineSchema } from '@opd/db_schema/prescribedMedicine';
import { schema as prescribedTest } from '@opd/db_schema/prescribedTest';
import { schema as visitSchema } from '@opd/db_schema/visit';
import { PrinterIcon } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import PatientCard from '@/features/patients/components/PatientCard';
import { formatLongIndianDate, formatShortIndianDate } from '@/lib/date';

const schema = visitSchema.visitInsertSchema.omit({ id: true }).extend({
  medicine: z
    .array(
      prescribedMedicineSchema.prescribedMedicineInsertSchema.omit({
        visitId: true,
      })
    )
    .optional(),
  test: z
    .array(prescribedTest.prescribedTestInsertSchema.omit({ visitId: true }))
    .optional(),
  createdAt: z.date(),
});

type Visit = z.infer<typeof schema>;

const formatMedicineSchedule = (
  morning: number,
  afternoon: number,
  evening: number
) => {
  const schedule = [];
  if (morning > 0) {
    schedule.push(`${morning} in morning`);
  }
  if (afternoon > 0) {
    schedule.push(`${afternoon} in afternoon`);
  }
  if (evening > 0) {
    schedule.push(`${evening} in evening`);
  }
  return schedule.join(', ') || 'As needed';
};

interface DocumentProps {
  visitData: Visit;
  ref?: React.Ref<HTMLDivElement>;
}

const clinicName = 'opd clinic';
const clinicAddress = '123 Main Street, City, State, Country';
const clinicPhone = '123-456-7890';
const doctorName = 'Dr. John Doe';
const med = new Array(8).fill(0).map((_, i) => ({
  id: i,
  name: `Med${i}`,
  medicineType: 'Tablet',
  morning: 1,
  afternoon: 1,
  evening: 2,
  note: `Note${i}`,
}));
const test = new Array(2)
  .fill(2)
  .map((_, i) => ({ id: 1, name: `Test${i}`, note: `Note${i}` }));

const VisitDocument = ({ visitData, ref }: DocumentProps) => {
  return (
    <div className="mx-auto w-full space-y-2 bg-white print:p-2" ref={ref}>
      <div className="mb-8 flex justify-between text-center print:mb-4">
        <h1 className="font-bold text-3xl text-gray-800 print:text-2xl">
          {clinicName}
        </h1>
        <p className="flex flex-col items-baseline justify-between gap-2">
          <span className="mt-2 text-gray-600">Address: {clinicAddress}</span>
          <span className="text-gray-600">Phone: {clinicPhone}</span>
        </p>
      </div>

      <Separator className="mb-6" />

      <PatientCard patientId={visitData.patientId} />

      {/* Visit Details */}
      <Card className="gap-2 print:border print:shadow-none">
        <CardHeader className="hidden">
          <CardTitle className="flex items-center gap-2 text-md">
            Visit Details
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Visit Date: {formatLongIndianDate(visitData.createdAt)}
          </p>
        </CardHeader>
        <CardContent className="space-y-2 px-2">
          <div className="grid grid-cols-5 gap-4">
            {visitData.followUp && (
              <div className="rounded bg-gray-50 p-2 text-center">
                <div className="font-medium text-sm">Follow Up</div>
                <div className="text-md">
                  {formatShortIndianDate(visitData.followUp)}
                </div>
              </div>
            )}
            {visitData.weight && (
              <div className="rounded bg-gray-50 p-2 text-center">
                <div className="font-medium text-sm">Weight</div>
                <div className="text-md">{visitData.weight} kg</div>
              </div>
            )}
            {visitData.bloodPressure && (
              <div className="rounded bg-gray-50 p-2 text-center">
                <div className="flex items-center justify-center gap-1 font-medium text-sm">
                  BP
                </div>
                <div className="text-md">{visitData.bloodPressure}</div>
              </div>
            )}
            {visitData.temperature && (
              <div className="rounded bg-gray-50 p-2 text-center">
                <div className="flex items-center justify-center gap-1 font-medium text-sm">
                  Temp
                </div>
                <div className="text-md">{visitData.temperature}</div>
              </div>
            )}
            {visitData.pulse && (
              <div className="rounded bg-gray-50 p-2 text-center">
                <div className="font-medium text-sm">Pulse</div>
                <div className="text-md">{visitData.pulse}</div>
              </div>
            )}
          </div>

          {/* Examination Findings */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            {visitData.complaints && (
              <div>
                <h4 className="mb-1 font-medium">Chief Complaints</h4>
                <p className="rounded bg-gray-50 p-2 text-sm">
                  {visitData.complaints}
                </p>
              </div>
            )}
            {visitData.cvs && (
              <div>
                <h4 className="mb-1 font-medium">CVS Examination</h4>
                <p className="rounded bg-gray-50 p-2 text-sm">
                  {visitData.cvs}
                </p>
              </div>
            )}
            {visitData.abdomen && (
              <div>
                <h4 className="mb-1 font-medium">Abdominal Examination</h4>
                <p className="rounded bg-gray-50 p-2 text-sm">
                  {visitData.abdomen}
                </p>
              </div>
            )}
            {visitData.ent && (
              <div>
                <h4 className="mb-1 font-medium">ENT Examination</h4>
                <p className="rounded bg-gray-50 p-2 text-sm">
                  {visitData.ent}
                </p>
              </div>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            {visitData.diagnosis && (
              <div>
                <h4 className="mb-1 font-medium">Diagnosis</h4>
                <p className="rounded border-blue-400 border-l-4 bg-blue-50 p-2 text-sm">
                  {visitData.diagnosis}
                </p>
              </div>
            )}
            {visitData.treatmentPlan && (
              <div>
                <h4 className="mb-1 font-medium">Treatment Plan</h4>
                <p className="rounded border-green-400 border-l-4 bg-green-50 p-2 text-sm">
                  {visitData.treatmentPlan}
                </p>
              </div>
            )}
            {visitData.doctorsAdvice && (
              <div>
                <h4 className="mb-1 font-medium">Doctor's Advice</h4>
                <p className="rounded border-yellow-400 border-l-4 bg-yellow-50 p-2 text-sm">
                  {visitData.doctorsAdvice}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {(visitData.medicine?.length || visitData.test?.length) && (
        <Card className="gap-2 print:border print:shadow-none">
          <CardHeader className="hidden px-2">
            <CardTitle className="text-md">Prescribed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* map over medicine here */}
            {med.map((m) => (
              <div
                className="flex w-full flex-row items-baseline justify-between gap-2 rounded-lg border bg-gray-50 p-2"
                key={m.id}
              >
                <span className="flex items-baseline gap-2">
                  {m.name}
                  <Button className="text-xs" variant="outline">
                    {m.medicineType}
                  </Button>
                </span>
                <div className="mb-1 text-gray-600 text-sm">
                  <span className="font-mium">Dosage:</span>{' '}
                  {formatMedicineSchedule(m.morning, m.afternoon, m.evening)}
                </div>
                {m.note && (
                  <div className="text-gray-600 text-sm">
                    <span className="font-mium">Note:</span> {m.note}
                  </div>
                )}
              </div>
            ))}
            {/* map over tests here */}
            {test.map((t) => (
              <div
                className="flex flex-row items-baseline justify-between gap-2 rounded-lg border bg-gray-50 p-2"
                key={t.id}
              >
                <div className="flex items-center gap-2">{t.name}</div>
                {t.note && (
                  <div className="text-gray-600 text-sm">
                    <span className="font-medium">Note:</span> {t.note}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="mt-8 border-t pt-4 text-center print:mt-4">
        <div className="mb-4">
          <p className="font-medium">{doctorName}</p>
          <p className="text-gray-600 text-sm">Attending Physician</p>
        </div>
        <div className="text-gray-500 text-xs">
          <p>This report was generated on {formatLongIndianDate(new Date())}</p>
          <p>For any queries, please contact {clinicPhone}</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border {
            border: 1px solid #e5e7eb !important;
          }
          .print\\:p-4 {
            padding: 1rem !important;
          }
          .print\\:mb-4 {
            margin-bottom: 1rem !important;
          }
          .print\\:mt-4 {
            margin-top: 1rem !important;
          }
          .print\\:text-2xl {
            font-size: 1.5rem !important;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

interface Props {
  visitData: Visit;
}

const PrintVisit = ({ visitData: visit }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Visit_Report-${visit.patientId}(${formatShortIndianDate(visit.createdAt)})`,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={(e) => e.stopPropagation()} variant="outline">
          <PrinterIcon />
          Print
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Print Investigation Report</DialogTitle>
          <DialogDescription>
            You can print your investigation report here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <VisitDocument ref={contentRef} visitData={visit} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={(e) => {
              reactToPrintFn();
              e.stopPropagation();
            }}
            variant="outline"
          >
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintVisit;
