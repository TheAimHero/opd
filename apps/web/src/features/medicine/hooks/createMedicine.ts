import { createMedicine } from '@opd/schema/medicine';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type z from 'zod';
import { env } from '@/env';

type Medicine = z.infer<typeof createMedicine.createMedicineReqBody>;

const createMedicineFn = async (body: Medicine) => {
  try {
    const url = new URL('/medicine', env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.post(url.toString(), body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return createMedicine.createMedicineRes.parse(res.data);
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
  onError?: (error: unknown) => Promise<void> | void;
  onSuccess?: (data: Medicine) => Promise<void> | void;
  onSettled?: (data?: Medicine, error?: unknown) => Promise<void> | void;
};

export const useCreateMedicine = ({
  onSettled,
  onSuccess,
  onError,
}: Actions = {}) => {
  const medicine = useMutation({
    mutationFn: createMedicineFn,
    mutationKey: ['medicine'],
    onError,
    onSettled,
    onSuccess,
  });
  return medicine;
};
