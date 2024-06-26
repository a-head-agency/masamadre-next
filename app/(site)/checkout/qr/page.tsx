"use client";

import Footer from "@/components/footer";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/button";
import PhoneField from "@/components/ui/phone-field";
import { GetUserMeSchemeType } from "@/data/user";
import { useBasket } from "@/hooks/basket";
import { ChevronDown, CreditCard } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import clsx from "clsx";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Label, Radio, RadioGroup, RadioProps } from "react-aria-components";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { placeOrder } from "../_actions";
import { optOutQROrder } from "./_actions";
import { RouteApiUserCartsDataType } from "@/app/api/user/carts/route";
import { useBoolean } from "usehooks-ts";

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
  const cards = useSWR<RouteApiUserCartsDataType>("/api/user/carts", fetcher);
  const me = useSWR<GetUserMeSchemeType>("/api/user/me", fetcher);

  const { toggle: toggleShowSignUpFields, value: showSignUpFields } =
    useBoolean(false);

  const stopQr = async () => {
    await optOutQROrder();
  };

  const formScheme = useMemo(
    () =>
      z.object({
        name: z.string().transform((s) =>
          s
            .split(/\s+/)
            .filter(Boolean)
            .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
            .join(" ")
        ),
        phone: z.string().length(11).optional().or(z.literal("")),
        comment: z.string(),
        cart_id: z.number(),
      }),
    []
  );

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      phone: "",
      comment: "",
      cart_id: 0,
    },
  });

  const basket = useBasket();

  useEffect(() => {
    if (me.data && cards.data) {
      const forReset: any = { ...me.data };
      forReset.cart_id = cards.data?.list.find((c) => c.main)?.id ?? 0;

      reset({
        ...forReset,
      });
    }
  }, [me.data, cards.data, reset]);

  const onSubmit = handleSubmit(async (vals) => {
    const forSend = {
      ...vals,
      dishes: !me.data
        ? basket.data?.list.map((d) => ({
            id: d.dish_id,
            count: d.count,
            mods: d.mods,
          }))
        : undefined,
    };

    await placeOrder(forSend);
  });

  return (
    <div className="grow flex flex-col">
      <form onSubmit={onSubmit}>
        <div
          className={clsx(
            "grid transition-all *:overflow-hidden origin-top",
            !me.data && !me.isLoading
              ? "grid-rows-[1fr] opacity-100 scale-y-100"
              : "grid-rows-[0fr] opacity-0 scale-y-0"
          )}
        >
          {!me.data && !me.isLoading && (
            <div className="max-w-5xl mb-4">
              <button
                type="button"
                className="flex items-center gap-4 leading-none outline-none"
                onClick={toggleShowSignUpFields}
              >
                зарегистрироваться
                <ChevronDown
                  className={clsx(
                    "h-[0.8em] transition-transform",
                    showSignUpFields ? "-scale-y-100" : "scale-y-100"
                  )}
                />
              </button>
            </div>
          )}
        </div>
        <div
          className={clsx(
            "grid transition-all *:overflow-hidden origin-top",
            showSignUpFields || me.data
              ? "grid-rows-[1fr] opacity-100 scale-y-100"
              : "grid-rows-[0fr] opacity-0 scale-y-0"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full mb-8">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="фио"
                  help={
                    !me.data
                      ? "Заполните, если хотите зарегистрироваться"
                      : undefined
                  }
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
                  help={
                    !me.data
                      ? "Заполните, если хотите зарегистрироваться"
                      : undefined
                  }
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="max-w-5xl mb-16">
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

        <div className="flex flex-col md:flex-row md:items-end mb-32 gap-x-4 gap-y-4">
          <Controller
            name="cart_id"
            control={control}
            key={cards.data?.list.map((t) => t.id).join(",")}
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
                    <CreditCard className="size-8" />
                    Картой на сайте
                  </div>
                </PaymentOption>

                {cards.data?.list.map((c) => (
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

          <div className="grow"></div>

          <Button type="button" isInverted onPress={stopQr}>
            Отменить заказ на стол
          </Button>
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
