"use client";

import { setUser } from "@/app/_actions";
import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker-old";
import SelectOld from "@/components/ui/old-select";
import PhoneField from "@/components/ui/phone-field";
import Switch from "@/components/ui/switch";
import TextField from "@/components/ui/TextField";
import { GetUserMeSchemeType } from "@/data/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import {} from "@internationalized/date";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const formScheme = z.object({
  name: z
    .string()
    .or(z.literal(""))
    .transform((s) =>
      s
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(" ")
    ),
  birthday: z.string().nullable(),
  email: z.string().email().or(z.literal("")),
  phone: z.string().or(z.literal("")),
  email_pushes: z.boolean(),
  get_whatsapp: z.boolean().optional(),
  get_tg: z.boolean().optional(),
  male: z.string().nullable(),
});

export default function Profile() {
  const { data, mutate } = useSWR<GetUserMeSchemeType>("/api/user/me", fetcher);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      email_pushes: false,
      get_tg: false,
      get_whatsapp: false,
      birthday: null,
      male: null,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        ...data,
      });
    }
  }, [data, reset]);

  const router = useRouter();

  const onSubmit = handleSubmit(async (vals) => {
    await setUser(vals);
    router.refresh();
    await mutate();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="md:py-4 px-[2vmax] md:pt-16 flex flex-col lg:flex-row gap-4 lg:gap-16 max-w-4xl"
    >
      <div className="flex-1 flex flex-col gap-4 md:gap-8">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              size="lg"
              label="фио"
              value={field.value}
              onChange={field.onChange}
              capitalize
              onBlur={field.onBlur}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="birthday"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <DatePicker
              label="день рождения"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={invalid}
              aria-label="день рождения"
            />
          )}
        />
        <Controller
          name="male"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <SelectOld
              big
              label="пол"
              options={[
                { label: "мужской", code: "male" },
                { label: "женский", code: "female" },
              ]}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <div className="hidden lg:block">
          <Button type="submit" isLoading={isSubmitting} isDisabled={!isValid}>
            сохранить
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 md:gap-8">
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <PhoneField
              size="lg"
              label="телефон"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              size="lg"
              label="email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />

        <div>
          <p className="opacity-50 lowercase mb-8">получать инфо</p>
          <div className="flex flex-col items-stretch gap-y-4 md:max-w-48">
            <Controller
              name="get_tg"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Switch
                  isSelected={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <span className="text-xl">TG</span>
                </Switch>
              )}
            />
            <Controller
              name="get_whatsapp"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Switch
                  isSelected={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <span className="text-xl">WhatsApp</span>
                </Switch>
              )}
            />
            <Controller
              name="email_pushes"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Switch
                  isSelected={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <span className="text-xl">email</span>
                </Switch>
              )}
            />
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <Button type="submit" isLoading={isSubmitting} isDisabled={!isValid}>
          Сохранить
        </Button>
      </div>
    </form>
  );
}
