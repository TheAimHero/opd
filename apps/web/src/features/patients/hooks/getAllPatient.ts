import { getPatient } from "@madhuprema/schema/patient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import type z from "zod";
import { env } from "@/env";

const { getAllPatientReqQuery, getAllPatientRes } = getPatient;

const fetchAllPatients = async (
  params: z.infer<typeof getAllPatientReqQuery>,
) => {
  try {
    const url = new URL("/patient", env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.get(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: params,
    });
    return getAllPatientRes.parse(res.data);
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

type UseGetAllShopActions = {
  onError?: (error: unknown) => void;
  onSuccess?: (data: z.infer<typeof getAllPatientRes>) => void;
};

export const useGetAllPatients = (
  params: z.infer<typeof getAllPatientReqQuery> = {},
  { onSuccess, onError }: UseGetAllShopActions = {},
) => {
  const patients = useQuery({
    queryFn: () => fetchAllPatients(params),
    queryKey: ["patient", params],
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    if (patients.isSuccess) onSuccess?.(patients.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients.isSuccess, onSuccess, patients.data]);

  useEffect(() => {
    if (patients.isError) onError?.(patients.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients.isError, onError, patients.error]);

  return patients;
};
