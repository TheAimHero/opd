'use client';

import { useParams } from 'next/navigation';
import VisitDetails from '@/features/visit/components/VisitDetails';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const visitId = Number.parseInt(id || '', 10);
  if (!visitId) {
    return null;
  }
  return <VisitDetails visitId={visitId} />;
};

export default Page;
