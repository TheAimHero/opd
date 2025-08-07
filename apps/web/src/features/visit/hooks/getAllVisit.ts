import { getVisit } from "@madhuprema/schema/visit";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import type z from "zod";
import { env } from "@/env";

const { getAllVisitRes, getAllVisitReqQuery } = getVisit;

const fetchAllVisits = async (params: z.infer<typeof getAllVisitReqQuery>) => {
  try {
    const url = new URL("/visit", env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.get(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: params,
    });
    const visit = getAllVisitRes.parse(res.data);
    return visit;
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
  onSuccess?: (data: z.infer<typeof getAllVisitRes>) => void;
};

export const useGetAllVisit = (
  params: z.infer<typeof getAllVisitReqQuery> = {},
  { onSuccess, onError }: Actions = {},
) => {
  const visits = useQuery({
    queryFn: () => fetchAllVisits(params),
    placeholderData: (prev) => prev,
    queryKey: ["visit", params],
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    if (visits.isSuccess) onSuccess?.(visits.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visits.isSuccess, onSuccess, visits.data]);

  useEffect(() => {
    if (visits.isError) onError?.(visits.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visits.isError, onError, visits.error]);

  return visits;
};
