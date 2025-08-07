import { deleteMedicine } from '@opd/schema/medicine';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type z from 'zod';
import { env } from '@/env';

const { deleteMedicineReqParams, deleteMedicineRes } = deleteMedicine;

const deleteMedicineFn = async (
  params: z.infer<typeof deleteMedicineReqParams>
) => {
  try {
    const url = new URL(`/medicine/${params.id}`, env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.delete(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return deleteMedicineRes.parse(res.data);
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
  onSuccess?: (data: z.infer<typeof deleteMedicineRes>) => void;
  onSettled?: (
    data?: z.infer<typeof deleteMedicineRes>,
    error?: unknown
  ) => void;
};

export const useDeleteMedicine = (
  params: z.infer<typeof deleteMedicineReqParams>,
  { onSuccess, onError, onSettled }: Actions = {}
) => {
  const medicines = useMutation({
    mutationFn: () => deleteMedicineFn(params),
    onSuccess,
    onError,
    onSettled,
    mutationKey: ['medicine', params],
  });
  return medicines;
};
