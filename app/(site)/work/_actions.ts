"use server";

import { createPublicApiAxios } from "@/axios";
import { z } from "zod";

const WorkInputScheme = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  message: z.string(),
});

export async function sendWork(input: z.input<typeof WorkInputScheme>) {
  input = WorkInputScheme.parse(input);
  const api = createPublicApiAxios();
  await api.post("api/employer", input);
  return {
    success: true,
  };
}
