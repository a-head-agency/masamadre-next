"use client";

import Footer from "@/components/footer";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/button";
import PhoneField from "@/components/ui/phone-field";
import TimePicker from "@/components/ui/timepicker";
import { GetUserMeSchemeType } from "@/data/user";
import { CreditCard, WalletIcon } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import clsx from "clsx";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Label, Radio, RadioGroup, RadioProps } from "react-aria-components";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import DeliveryTimeSelector from "./_widgets/delivery-time-picker";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

type PaymentOptionProps = RadioProps & PropsWithChildren;
const PaymentOption: FC<PaymentOptionProps> = ({ children, ...props }) => {
  return (
    <Radio
      className={({ isDisabled, isSelected }) =>
        clsx(
          "relative block pl-7",
          "before:absolute focus:bo before:top-1/2 before:transition-all before:p-[0.15rem] before:bg-clip-content before:-translate-y-1/2 before:left-0 before:size-4 before:rounded-full before:border before:border-gray-400",
          isDisabled && "opacity-50",
          !isDisabled && "cursor-pointer",
          isSelected && "before:bg-black"
        )
      }
      {...props}
    >
      <div className="inline-block">{children}</div>
    </Radio>
  );
};

export default function Page() {
  const { data } = useSWR<GetUserMeSchemeType>("/api/user/me", fetcher);

  const formScheme = useMemo(
    () =>
      z.object({
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
        phone: z.string().or(z.literal("")),
        address_street_house: z.string(),
        address_podezd: z.string(),
        comment: z.string(),
        time_deliver: z.string().nullable(),
      }),
    []
  );

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      phone: "",
      address_street_house: "",
      address_podezd: "",
      comment: "",
      time_deliver: null,
    },
  });

  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
      });
    }
  }, [data, reset]);

  return (
    <form>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full mb-16">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
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
          name="phone"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <PhoneField
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
          name="address_street_house"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              label="улица, номер дома"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          name="address_podezd"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              label="номер подъезда, квартиры, домофона"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />

        <div className="col-span-full">
          <Controller
            name="comment"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                label="комментарий к заказу"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        </div>

        <Controller
          name="time_deliver"
          control={control}
          render={({ field }) => (
            <DeliveryTimeSelector
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="flex justify-between flex-col md:flex-row md:items-end mb-32 gap-x-8 gap-y-8">
        <RadioGroup className="flex flex-col" value={value} onChange={setValue}>
          <Label className="text-black opacity-50 mb-4">Способ оплаты</Label>

          <PaymentOption value="3">
            <div className="flex items-center gap-x-2">
              <CreditCard className="size-8" />
              Картой на сайте
            </div>
          </PaymentOption>
        </RadioGroup>

        <Button type="submit">Перейти к оплате</Button>
      </div>

      <Footer withTree />
    </form>
  );
}
