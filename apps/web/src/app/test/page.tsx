import CreateTest from '@/features/test/components/CreateTest';
import TestList from '@/features/test/components/TestList';

const Page = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <CreateTest className="col-span-1 max-w-xl" />
      <TestList className="col-span-2 h-[calc(100vh-80px)]" />
    </div>
  );
};

export default Page;
