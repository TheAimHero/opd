import { getTest } from "@madhuprema/schema/test";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import type z from "zod";
import { env } from "@/env";

const { getAllTestReqQuery, getAllTestRes } = getTest;

const fetchAllTests = async (params: z.infer<typeof getAllTestReqQuery>) => {
  try {
    const url = new URL("/test", env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.get(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: params,
    });
    return getAllTestRes.parse(res.data);
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
  onSuccess?: (data: z.infer<typeof getAllTestRes>) => void;
};

export const useGetAllTest = (
  params: z.infer<typeof getAllTestReqQuery> = {},
  { onSuccess, onError }: Actions = {},
) => {
  const tests = useQuery({
    queryFn: () => fetchAllTests(params),
    placeholderData: (prev) => prev,
    queryKey: ["test", params],
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    if (tests.isSuccess) onSuccess?.(tests.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tests.isSuccess, onSuccess, tests.data]);

  useEffect(() => {
    if (tests.isError) onError?.(tests.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tests.isError, onError, tests.error]);

  return tests;
};
