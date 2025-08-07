import { getMedicine } from "@madhuprema/schema/medicine";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import type z from "zod";
import { env } from "@/env";

const { getAllMedicineReqQuery, getAllMedicineRes } = getMedicine;

const fetchAllMedicines = async (
  params: z.infer<typeof getAllMedicineReqQuery>,
) => {
  try {
    const url = new URL("/medicine", env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.get(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: params,
    });
    return getAllMedicineRes.parse(res.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        e.response?.data?.error as string,
        { cause: e },
      );
    }
    throw e;
  }
};

type Actions = {
  onError?: (error: unknown) => void;
  onSuccess?: (data: z.infer<typeof getAllMedicineRes>) => void;
};

export const useGetAllMedicines = (
  params: z.infer<typeof getAllMedicineReqQuery> = {},
  { onSuccess, onError }: Actions = {},
) => {
  const medicines = useQuery({
    queryFn: () => fetchAllMedicines(params),
    placeholderData: (prev) => prev,
    queryKey: ["medicine", params],
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    if (medicines.isSuccess) onSuccess?.(medicines.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicines.isSuccess, medicines.data, onSuccess]);

  useEffect(() => {
    if (medicines.isError) onError?.(medicines.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicines.isError, medicines.error, onError]);

  return medicines;
};
