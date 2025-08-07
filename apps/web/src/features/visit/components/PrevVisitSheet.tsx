import { getVisit } from '@opd/schema/visit';
import type { ReactNode } from 'react';
import type z from 'zod';
import Conditional from '@/components/Conditional';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  DescriptionDetail,
  DescriptionGroup,
  DescriptionList,
  DescriptionTerm,
} from '@/components/ui/description-list';
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
import PrescribedMedicineTable from '@/features/medicine/components/PrescribedMedicineTable';
import PrescribedTestTable from '@/features/test/components/PrescribedTestTable';
import { useGetAllVisit } from '@/features/visit/hooks/getAllVisit';
import { formatLongIndianDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import PrintVisit from './PrintVisit';

const { getAllVisitRes } = getVisit;

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
    <DescriptionGroup className={cn('w-full', className)}>
      <DescriptionTerm>{label}</DescriptionTerm>
      <DescriptionDetail>{value}</DescriptionDetail>
    </DescriptionGroup>
  );
};

interface Props {
  patientId: number;
}

type Visit = z.infer<typeof getAllVisitRes>[number];

const VisitDetailCard = ({ v }: { v: Visit }) => {
  return (
    <Accordion className="w-full max-w-full" collapsible type="single">
      <div className="border border-b-0 p-2 px-4 first:rounded-t-md last:rounded-b-md last:border-b ">
        <DescriptionList className="grid grid-cols-5">
          {v.createdAt && (
            <VisitDetail
              className="col-span-2"
              label="Visit Date"
              value={formatLongIndianDate(v.createdAt)}
            />
          )}
          {v.followUp && (
            <VisitDetail
              className="col-span-2"
              label="Follow Up Date"
              value={formatLongIndianDate(v.followUp)}
            />
          )}
          <PrintVisit
            visitData={{ ...v, createdAt: v.createdAt || new Date() }}
          />
        </DescriptionList>
      </div>

      <AccordionItem
        className="border border-b-0 px-4 first:rounded-t-md last:rounded-b-md last:border-b"
        key={'measures'}
        value={'item-measures'}
      >
        <AccordionTrigger className="font-semibold ">Measures</AccordionTrigger>
        <AccordionContent>
          <DescriptionList className="grid grid-cols-6">
            {v.weight && (
              <VisitDetail label="Weight" value={<span>{v.weight} kg</span>} />
            )}
            {v.bloodPressure && (
              <VisitDetail
                label="Blood Pressure"
                value={<span>{v.bloodPressure} mmHg</span>}
              />
            )}
            {v.ent && <VisitDetail label="ENT" value={<span>{v.ent}</span>} />}
            {v.temperature && (
              <VisitDetail
                label="Temperature"
                value={<span>{v.temperature} °F</span>}
              />
            )}
            {v.pulse && (
              <VisitDetail label="Pulse" value={<span>{v.pulse} bpm</span>} />
            )}
            {v.respiration && (
              <VisitDetail
                label="Respiration"
                value={<span>{v.respiration} per min</span>}
              />
            )}
            {v.cvs && <VisitDetail label="CVS" value={<span>{v.cvs}</span>} />}
            {v.abdomen && (
              <VisitDetail label="Abdomen" value={<span>{v.abdomen}</span>} />
            )}
            {v.ent && <VisitDetail label="ENT" value={<span>{v.ent}</span>} />}
          </DescriptionList>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="border border-b-0 px-4 first:rounded-t-md last:rounded-b-md last:border-b"
        key={'details'}
        value={'item-details'}
      >
        <AccordionTrigger className="font-semibold ">Details</AccordionTrigger>
        <AccordionContent>
          <DescriptionList className="col-span-full flex flex-col gap-2">
            {v.personalRemark && (
              <VisitDetail
                label="Personal Remark"
                value={<p className="text-pretty">{v.personalRemark}</p>}
              />
            )}
            {v.complaints && (
              <VisitDetail
                label="Complaints"
                value={<span>{v.complaints}</span>}
              />
            )}
            {v.diagnosis && (
              <VisitDetail
                label="Diagnosis"
                value={<span>{v.diagnosis}</span>}
              />
            )}
            {v.doctorsAdvice && (
              <VisitDetail
                label="Doctor's Advice"
                value={<span>{v.doctorsAdvice}</span>}
              />
            )}
            {v.treatmentPlan && (
              <VisitDetail
                label="Treatment Plan"
                value={<span>{v.treatmentPlan}</span>}
              />
            )}
          </DescriptionList>
        </AccordionContent>
      </AccordionItem>

      <Conditional condition={!!v.test?.length}>
        <AccordionItem
          className="border border-b-0 px-4 first:rounded-t-md last:rounded-b-md last:border-b"
          key={'medicine'}
          value={'item-medicine'}
        >
          <AccordionTrigger className="font-semibold ">
            Prescribed Medicine
          </AccordionTrigger>
          <AccordionContent>
            <PrescribedMedicineTable data={v.medicine ?? []} />
          </AccordionContent>
        </AccordionItem>
      </Conditional>

      <Conditional condition={!!v.test?.length}>
        <AccordionItem
          className="border border-b-0 px-4 first:rounded-t-md last:rounded-b-md last:border-b"
          key={'test'}
          value={'item-test'}
        >
          <AccordionTrigger className="font-semibold">
            Prescribed Test
          </AccordionTrigger>
          <AccordionContent>
            <PrescribedTestTable data={v.test ?? []} />
          </AccordionContent>
        </AccordionItem>
      </Conditional>
    </Accordion>
  );
};

const PreVisitSheet = ({ patientId }: Props) => {
  const { data: visits, isLoading: isVisitsLoading } = useGetAllVisit({
    patientId,
    limit: 10,
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button disabled={isVisitsLoading} variant="outline">
          Previous Visits
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-3xl overflow-y-auto p-2">
        <SheetHeader className="flex w-full flex-row items-center justify-between gap-2">
          <div>
            <SheetTitle>Previous Visits</SheetTitle>
            <SheetDescription>
              Here you can see your previous visits of a patient
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <Button className="min-w-xs" size="sm" variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetHeader>
        {visits?.map((v) => (
          <VisitDetailCard key={v.id} v={v} />
        ))}
        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
};

export default PreVisitSheet;
