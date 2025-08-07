import CreateMedicine from "@/features/medicine/components/CreateMedicine";
import MedicineList from "@/features/medicine/components/MedicineList";

const Page = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <CreateMedicine className="col-span-1 max-w-xl" />
      <MedicineList className="col-span-2 h-[calc(100vh-80px)]" />
    </div>
  );
};

export default Page;
