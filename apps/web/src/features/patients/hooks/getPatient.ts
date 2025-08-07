import { getPatient } from '@opd/schema/patient';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import type z from 'zod';
import { env } from '@/env';

const { getPatientReqParams, getPatientRes } = getPatient;

const fetchPatient = async (params: z.infer<typeof getPatientReqParams>) => {
  try {
    const url = new URL(`/patient/${params.id}`, env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.get(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params,
    });
    return getPatientRes.parse(res.data);
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
  onSuccess?: (data: z.infer<typeof getPatientRes>) => void;
};

export const useGetPatient = (
  params: z.infer<typeof getPatientReqParams>,
  { onSuccess, onError }: Actions = {}
) => {
  const patient = useQuery({
    queryFn: () => fetchPatient(params),
    queryKey: ['patient', params],
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    if (patient.isSuccess) {
      onSuccess?.(patient.data);
    }
  }, [patient.isSuccess, onSuccess, patient.data]);

  useEffect(() => {
    if (patient.isError) {
      onError?.(patient.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient.isError, onError, patient.error]);

  return patient;
};
