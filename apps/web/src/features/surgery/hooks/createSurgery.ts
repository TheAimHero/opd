import { createSurgery } from '@opd/schema/surgery';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type z from 'zod';
import { env } from '@/env';

type Surgery = z.infer<typeof createSurgery.createSurgeryReqBody>;

const createSurgeryFn = async (body: Surgery) => {
  try {
    const url = new URL('/surgery', env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.post(url.toString(), body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return createSurgery.createSurgeryRes.parse(res.data);
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
  onSuccess?: (data: Surgery) => Promise<void> | void;
  onSettled?: (data?: Surgery, error?: unknown) => Promise<void> | void;
};

export const useCreateSurgery = ({
  onSettled,
  onSuccess,
  onError,
}: Actions = {}) => {
  const surgery = useMutation({
    mutationFn: createSurgeryFn,
    mutationKey: ['surgery'],
    onError,
    onSettled,
    onSuccess,
  });
  return surgery;
};
