import { createTest } from "@madhuprema/schema/test";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type z from "zod";
import { env } from "@/env";

type Test = z.infer<typeof createTest.createTestReqBody>;

const createTestFn = async (body: Test) => {
  try {
    const url = new URL("/test", env.NEXT_PUBLIC_SERVER_URL);
    const res = await axios.post(url.toString(), body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return createTest.createTestRes.parse(res.data);
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
  onError?: (error: unknown) => Promise<void> | void;
  onSuccess?: (data: Test) => Promise<void> | void;
  onSettled?: (data?: Test, error?: unknown) => Promise<void> | void;
};

export const useCreateTest = ({
  onSettled,
  onSuccess,
  onError,
}: Actions = {}) => {
  const test = useMutation({
    mutationFn: createTestFn,
    mutationKey: ["test"],
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess,
  });
  return test;
};
