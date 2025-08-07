import { deleteVisit } from '@opd/schema/visit';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type z from 'zod';
import { env } from '@/env';

const { deleteVisitRes, deleteVisitReqParams } = deleteVisit;

const fetchVisits = async (params: z.infer<typeof deleteVisitReqParams>) => {
  try {
    const url = new URL(`/visit/${params.id}`, env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.delete(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const visit = deleteVisitRes.parse(res.data);
    return visit;
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
  onSuccess?: (data: z.infer<typeof deleteVisitRes>) => void;
  onSettled?: (data?: z.infer<typeof deleteVisitRes>, error?: unknown) => void;
};

export const useDeleteVisit = (
  params: z.infer<typeof deleteVisitReqParams>,
  { onSuccess, onError, onSettled }: Actions = {}
) => {
  const visits = useMutation({
    mutationFn: () => fetchVisits(params),
    mutationKey: ['visit', params],
    onSuccess,
    onError,
    onSettled,
  });

  return visits;
};
