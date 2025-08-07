import { createPatient } from '@opd/schema/patient';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type z from 'zod';
import { env } from '@/env';

type Patient = z.infer<typeof createPatient.createPatientReqBody>;

const createPatientFn = async (body: Patient) => {
  try {
    const url = new URL('/patient', env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.post(url.toString(), body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return createPatient.createPatientRes.parse(res.data);
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
  onSuccess?: (data: Patient) => Promise<void> | void;
  onSettled?: (data?: Patient, error?: unknown) => Promise<void> | void;
};

export const useCreatePatient = ({
  onSettled,
  onSuccess,
  onError,
}: Actions = {}) => {
  const patient = useMutation({
    mutationFn: createPatientFn,
    mutationKey: ['patient'],
    onError,
    onSettled,
    onSuccess,
  });
  return patient;
};
