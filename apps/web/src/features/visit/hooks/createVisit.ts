import { createVisit } from '@opd/schema/visit';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type z from 'zod';
import { env } from '@/env';

type Visit = z.infer<typeof createVisit.createVisitReqBody>;

const createVisitFn = async (body: Visit) => {
  try {
    const url = new URL('/visit', env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.post(url.toString(), body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const visit = createVisit.createVisitRes.parse(res.data);
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
  onError?: (error: unknown) => Promise<void> | void;
  onSuccess?: (data: Visit) => Promise<void> | void;
  onSettled?: (data?: Visit, error?: unknown) => Promise<void> | void;
};

export const useCreateVisit = ({
  onSettled,
  onSuccess,
  onError,
}: Actions = {}) => {
  const visit = useMutation({
    mutationFn: createVisitFn,
    mutationKey: ['visit'],
    onError,
    onSettled,
    onSuccess,
  });
  return visit;
};
