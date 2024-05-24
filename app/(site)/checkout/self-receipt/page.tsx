"use client";

import Footer from "@/components/footer";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/button";
import PhoneField from "@/components/ui/phone-field";
import TimePicker from "@/components/ui/timepicker";
import { GetUserMeSchemeType } from "@/data/user";
import { useBasket } from "@/hooks/basket";
import { CreditCard, WalletIcon } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import clsx from "clsx";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Label, Radio, RadioGroup, RadioProps } from "react-aria-components";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { placeOrder } from "../_actions";
import DeliveryTimeSelector from "../_widgets/delivery-time-picker";
import { RouteApiUserCartsDataType } from "@/app/api/user/carts/route";

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
  const { data: cards } = useSWR<RouteApiUserCartsDataType>(
    "/api/user/carts",
    fetcher
  );

  const formScheme = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(1)
          .transform((s) =>
            s
              .split(/\s+/)
              .filter(Boolean)
              .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
              .join(" ")
          ),
        phone: z.string().length(11),
        comment: z.string(),
        cart_id: z.number(),
        time_deliver: z.string().nullable(),
      }),
    []
  );

  const { control, reset, handleSubmit } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      phone: "",
      comment: "",
      cart_id: 0,
      time_deliver: null,
    },
  });

  const basket = useBasket();

  useEffect(() => {
    if (data && cards) {
      const forReset: any = { ...data };
      forReset.cart_id = cards.list.find((c) => c.main)?.id ?? 0;

      reset({
        ...forReset,
      });
    }
  }, [data, cards, reset]);

  const onSubmit = handleSubmit(async (vals) => {
    const forSend = {
      ...vals,
      dishes: !data
        ? basket.data?.list.map((d) => ({
            id: d.dish_id,
            count: d.count,
          }))
        : undefined,
    };
    console.log(forSend);

    await placeOrder(forSend);
  });

  return (
    <div className="grow flex flex-col">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full mb-16">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                label="фио"
                help="Заполните, если хотите зарегистрироваться"
                value={field.value}
                onChange={field.onChange}
                capitalize
                isRequired
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
                help="Заполните, если хотите зарегистрироваться"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                isInvalid={invalid}
                isRequired
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
          <Controller
            name="cart_id"
            control={control}
            render={({ field }) => (
              <RadioGroup
                className="flex flex-col"
                value={field.value.toString()}
                onChange={(v) => field.onChange(Number(v))}
              >
                <Label className="text-black opacity-50 mb-4">
                  Способ оплаты
                </Label>

                <PaymentOption value="0">
                  <div className="flex items-center gap-x-2">
                    <div className="w-12">
                      <CreditCard className="h-8" />
                    </div>
                    Картой на сайте
                  </div>
                </PaymentOption>

                {cards?.list.map((c) => (
                  <PaymentOption value={c.id.toString()} key={c.id}>
                    <div className="flex items-center gap-x-2">
                      <img
                        className="h-6 w-12 object-contain object-left"
                        src={
                          c.type === "MAESTRO"
                            ? "/icon-maestro.svg"
                            : c.type === "MASTERCARD"
                            ? "/icon-mastercard.svg"
                            : c.type === "MIR"
                            ? "/icon-mir.svg"
                            : c.type === "VISA"
                            ? "/icon-visa.svg"
                            : "/credit-card.svg"
                        }
                        alt=""
                      />
                      {c.cart}
                    </div>
                  </PaymentOption>
                ))}
              </RadioGroup>
            )}
          />

          <Button type="submit">Перейти к оплате</Button>
        </div>
      </form>

      <div className="grow"></div>

      <div className="pb-[2vmax] ">
        <Footer withTree />
      </div>
    </div>
  );
}
