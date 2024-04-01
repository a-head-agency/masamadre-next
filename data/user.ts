import { createPrivateApiAxios } from "@/axios";
import { Session } from "@/session";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import { z } from "zod";

const GetUserScheme = z.object({
  name: z.string(),
  status_pushes: z.boolean(),
  get_pushes: z.boolean(),
  email_pushes: z.boolean(),
  sms_pushes: z.boolean(),
  phone: z.string(),
  email: z.string(),
  birthday: z.string().transform((s) => {
    const parts = s.split("/");
    if (parts.length === 3) {
      const d = DateTime.fromObject({
        year: Number(parts[0]),
        month: Number(parts[1]),
        day: Number(parts[2]),
      });
      return d.toISO();
    }
    return "";
  }),
  adres_id: z.number(),
  rest_id: z.number(),
  bonuses: z.number(),
  count_in_basket: z.number(),
  total_basket: z.number(),
});
export type GetUserMeSchemeType = z.output<typeof GetUserScheme>;

export async function getUser(session: Session) {
  if (!session.isAuthenticated) {
    redirect("/login");
  }

  const api = createPrivateApiAxios(session);

  const response = await api.get("/user/me");
  const data = GetUserScheme.parse(response.data);

  return data;
}
