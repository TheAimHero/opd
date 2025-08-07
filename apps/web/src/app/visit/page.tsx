'use client';

import VisitList from '@/features/visit/components/VisitList';
import VisitSearch from '@/features/visit/components/VisitSearch';

export default function Home() {
  return (
    <div className="relative flex h-full flex-col gap-2">
      <div className="flex flex-row items-center justify-between gap-2">
        <VisitSearch />
      </div>
      <VisitList />
    </div>
  );
}
