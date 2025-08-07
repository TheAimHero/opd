import { deleteTest } from '@opd/schema/test';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type z from 'zod';
import { env } from '@/env';

const { deleteTestReqParams, deleteTestRes } = deleteTest;

const deleteTestFn = async (params: z.infer<typeof deleteTestReqParams>) => {
  try {
    const url = new URL(`/test/${params.id}`, env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.delete(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return deleteTestRes.parse(res.data);
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
  onSuccess?: (data: z.infer<typeof deleteTestRes>) => void;
  onSettled?: (data?: z.infer<typeof deleteTestRes>, error?: unknown) => void;
};

export const useDeleteTest = (
  params: z.infer<typeof deleteTestReqParams>,
  { onSuccess, onError, onSettled }: Actions = {}
) => {
  const tests = useMutation({
    mutationFn: () => deleteTestFn(params),
    onSuccess,
    onError,
    onSettled,
    mutationKey: ['test', params],
  });
  return tests;
};
