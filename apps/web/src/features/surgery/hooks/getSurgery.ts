import { getSurgery } from '@opd/schema/surgery';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import type z from 'zod';
import { env } from '@/env';

const { getAllSurgeryReqQuery, getAllSurgeryRes } = getSurgery;

const fetchAllSurgerys = async (
  params: z.infer<typeof getAllSurgeryReqQuery>
) => {
  try {
    const url = new URL('/surgery', env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.get(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params,
    });
    return getAllSurgeryRes.parse(res.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        e.response?.data?.error as string,
        { cause: e }
      );
    }
    throw e;
  }
};

type Actions = {
  onError?: (error: unknown) => void;
  onSuccess?: (data: z.infer<typeof getAllSurgeryRes>) => void;
};

export const useGetAllSurgery = (
  params: z.infer<typeof getAllSurgeryReqQuery> = {},
  { onSuccess, onError }: Actions = {}
) => {
  const surgerys = useQuery({
    queryFn: () => fetchAllSurgerys(params),
    placeholderData: (prev) => prev,
    queryKey: ['surgery', params],
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    if (surgerys.isSuccess) {
      onSuccess?.(surgerys.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surgerys.isSuccess, onSuccess, surgerys.data]);

  useEffect(() => {
    if (surgerys.isError) {
      onError?.(surgerys.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surgerys.isError, onError, surgerys.error]);

  return surgerys;
};
