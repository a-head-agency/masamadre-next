"use server";
import { createPublicApiAxios } from "@/axios";
import { getSession } from "@/session";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

// #region SendOTP
interface SendOTPActionResponse {
  type: "action";
  action: "check code";
}

interface SendOTPErrorResopnse {
  type: "error";
  action: "try later" | "many times" | "wrong phone" | "unknown";
}

export async function sendOTP(vals: {
  phone: string;
}): Promise<SendOTPActionResponse | SendOTPErrorResopnse> {
  const api = createPublicApiAxios();

  try {
    const response = await api.post(
      "/auth/login",
      {
        phone: vals.phone,
      },
      {}
    );

    if (response.data.action === "check code") {
      return {
        type: "action",
        action: "check code",
      } satisfies SendOTPActionResponse;
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("ERROR [login._actions.sendOTP]:", e);
      return {
        type: "error",
        action: e.response?.data.action,
      } satisfies SendOTPErrorResopnse;
    }
  }

  return {
    type: "error",
    action: "unknown",
  } satisfies SendOTPErrorResopnse;
}
// #endregion SendOTP

// #region VerifyOTP
interface VerifyOTPSuccessResponse {
  type: "success";
  accessToken: string;
  refreshToken: string;
}

interface VerifyOTPErrorResponse {
  type: "action";
  action: "wrong code" | "unknown";
}

export async function verifyOTP(vals: { phone: string; code: string }) {
  const api = createPublicApiAxios();

  const session = await getSession(cookies());

  try {
    const response = await api.post("/auth/verify", {
      login: vals.phone,
      code: vals.code,
    });

    if (response.data.token) {
      session.isAuthenticated = true;
      session.accessToken = response.data.token;
      session.refreshToken = response.data.refreshToken;
      await session.save();
      return {
        type: "success",
        accessToken: response.data.token,
        refreshToken: response.data.refreshToken,
      } satisfies VerifyOTPSuccessResponse;
    }
  } catch (e) {
    session.destroy();
    if (e instanceof AxiosError) {
      return {
        type: "action",
        action: e.response?.data.action,
      } satisfies VerifyOTPErrorResponse;
    }
  }

  return {
    type: "action",
    action: "unknown",
  } satisfies VerifyOTPErrorResponse;
}
// #endregion VerifyOTP
