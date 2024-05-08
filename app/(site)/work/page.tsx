"use client";
import Footer from "@/components/footer";
import Button from "@/components/ui/button";
import PhoneField from "@/components/ui/phone-field";
import TextField from "@/components/ui/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { sendWork } from "./_actions";
import MessageModal, { useMessageModal } from "@/components/ui/message-modal";

export default function Work() {
  const formScheme = useMemo(
    () =>
      z.object({
        name: z.string().min(1),
        phone: z.string().length(11, { message: "Некорректный номер" }),
        email: z.string().email(),
        message: z.string().min(1),
      }),
    []
  );

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const { showMessage, props } = useMessageModal({
    isDismissable: true,
    onOpenChange(isOpen) {
      if (!isOpen) {
        reset({
          name: "",
          email: "",
          message: "",
          phone: "",
        });
      }
    },
  });

  const onSubmit = handleSubmit(async (vals) => {
    await sendWork(vals);
    showMessage("Сообщение отправлено!");
  });

  return (
    <div className="min-h-full flex flex-col">
      <MessageModal {...props} />
      <div className="grow flex items-center px-[2vmax] py-8">
        <div className="hidden sm:block grow-[3]"></div>
        <form
          onSubmit={onSubmit}
          className="w-full sm:max-w-sm flex flex-col gap-4 sm:gap-12"
        >
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <TextField
                aria-label="имя"
                placeholder="имя"
                value={field.value}
                onChange={field.onChange}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <PhoneField
                value={field.value}
                onChange={field.onChange}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error?.message}
                aria-label="телефон"
                placeholder="телефон"
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error?.message}
                aria-label="email"
                placeholder="email"
              />
            )}
          />

          <Controller
            control={control}
            name="message"
            render={({ field, fieldState }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error?.message}
                aria-label="text here"
                placeholder="text here"
              />
            )}
          />

          <div className="contents sm:block">
            <Button type="submit">отправить заявку</Button>
          </div>
        </form>
        <div className="hidden sm:block grow-[1]"></div>
      </div>
      <div className="px-[2vmax] pb-[2vmax] pt-32">
        <Footer withTree withPhone />
      </div>
    </div>
  );
}
