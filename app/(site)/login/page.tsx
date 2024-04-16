"use client";

import Footer from "@/components/footer";
import PhoneField, { formatPhone } from "@/components/ui/phone-field";
import Link from "next/link";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OTPInput, { OTPInputProps } from "react-otp-input";
import { useCountdown } from "usehooks-ts";

import { sendOTP, verifyOTP } from "./_actions";
import { useRouter } from "next/navigation";

function Step1(props: { onSuccess?: (phone: string) => void }) {
  const scheme = useMemo(
    () =>
      z.object({
        phone: z.string().length(11, { message: "Некорректный номер" }),
      }),
    []
  );

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<z.infer<typeof scheme>>({
    resolver: zodResolver(scheme),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = useCallback(
    async (vals: z.infer<typeof scheme>) => {
      const res = await sendOTP({ phone: vals.phone });
      if (res.type === "error") {
        if (res.action === "many times") {
          setError("root.service", {
            message: "Слишком много попыток, попробуйте позже",
          });
          return;
        }
        if (res.action === "try later") {
          setError("root.service", {
            message: "Попробуйте позже",
          });
          return;
        }
        if (res.action === "wrong phone") {
          setError("root.service", {
            message: "Невалидный телефон",
          });
          return;
        }
      }

      if (res.type === "action" && res.action === "check code") {
        if (props.onSuccess) {
          props.onSuccess(vals.phone);
        }
      }
    },
    [props, setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8 mt-12 md:mt-24">
        <Controller
          name="phone"
          disabled={isSubmitting}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PhoneField
              value={field.value}
              onChange={field.onChange}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
              placeholder="номер телефона"
              aria-label="Введите номер телефона, на который отправим код"
            />
          )}
        />
      </div>

      {errors.root?.service.message && (
        <strong className="block text-red font-normal mb-8 text-center">
          {errors.root?.service.message}
        </strong>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 w-full leading-none transition-colors lowercase rounded-full border bg-black text-white disabled:bg-black/30"
      >
        Выслать код
      </button>
    </form>
  );
}

function Step2({ phone }: { phone: string }) {
  const [otp, setOtp] = useState("");
  const formatedPhone = useMemo(
    () => (phone ? formatPhone(phone) : undefined),
    [phone]
  );

  const router = useRouter();

  const [error, setError] = useState("");

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    countStop: 0,
    intervalMs: 1000,
    isIncrement: false,
  });

  const restartCountdown = useCallback(() => {
    resetCountdown();
    startCountdown();
  }, [resetCountdown, startCountdown]);

  useEffect(() => {
    restartCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resendOTP = useCallback(async () => {
    setOtp("");
    await sendOTP({ phone });
    restartCountdown();
  }, [restartCountdown, phone]);

  const inputRenderer = useCallback(
    (props: Parameters<OTPInputProps["renderInput"]>[0]) => (
      <input
        {...props}
        disabled={otp.length === 4}
        className={`rounded-xl ${
          error ? "!border-red-400" : ""
        } disabled:opacity-60 transition-all bg-transparent py-3 px-3 text-xl leading-none border box-content border-black/30 focus:border-black text-black outline-none`}
      />
    ),
    [error, otp.length]
  );

  useEffect(() => {
    if (otp.length === 4) {
      verifyOTP({
        phone: phone,
        code: otp,
      }).then((r) => {
        if (r.type === "success") {
          router.refresh();
          router.replace("/profile");
        } else if (r.type === "action") {
          if (r.action === "wrong code") {
            setError("Неверный код");
            setOtp("");
          } else {
            setError("Неизвестная ошибка");
            setOtp("");
          }
        }
      });
    }
  }, [otp, phone, router]);

  return (
    <div>
      <div className="mb-12 md:mb-24">
        <p>Код отправили сообщением на номер:</p>
        <p>{formatedPhone}</p>
      </div>

      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        shouldAutoFocus
        inputType="tel"
        renderInput={inputRenderer}
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.75rem",
        }}
      />

      {error && (
        <strong className="block text-red font-normal mt-8 text-center">
          {error}
        </strong>
      )}

      <button
        type="button"
        disabled={count > 0}
        onClick={resendOTP}
        className={[
          "px-4 py-2 mt-12 w-full leading-none lowercase rounded-full border text-white bg-black disabled:bg-black/30 transition-colors",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {count > 0 && <span>повторный код через {count} сек.</span>}
        {count <= 0 && <span>выслать код</span>}
      </button>
    </div>
  );
}

export default function Login() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");

  const onStep1Success = useCallback((phone: string) => {
    setPhone(phone);
    setStep((p) => p + 1);
  }, []);

  return (
    <>
      <div className="min-h-full flex flex-col">
        <div className="grow grid grid-cols-2 py-10 px-[2vmax] content-center">
          <div className="col-start-1 md:col-start-2 col-span-full flex justify-center">
            <div className="max-w-sm w-full py-10">
              <h1 className="font-bold text-2xl mb-4">Вход на сайт</h1>

              {step === 0 && <Step1 onSuccess={onStep1Success} />}
              {step === 1 && <Step2 phone={phone} />}

              <div className="mt-12">
                <span className="opacity-50">Продолжая, вы соглашаетесь </span>
                <Link className="underline" href="https://youtube.com">
                  со сбором и обработкой персональных данных
                </Link>
                <span className="opacity-50"> и </span>
                <Link className="underline" href="https://yandex.ru">
                  пользовательским соглашением
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="p-[2vmax]">
          <Footer withTree withPhone />
        </div>
      </div>
    </>
  );
}
