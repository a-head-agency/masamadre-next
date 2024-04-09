import axios, { AxiosError } from "axios";
import { Session } from "./session";
import { redirect } from "next/navigation";

export const createPublicApiAxios = () => {
  const publicApiAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  return publicApiAxios;
};

export const createPrivateApiAxios = (session: Session) => {
  const privateApiAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  privateApiAxios.interceptors.request.use(
    (config) => {
      if (session.isAuthenticated && session.accessToken) {
        config.headers["Authorization"] = "Bearer " + session.accessToken;
      } else {
        session.destroy();
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  privateApiAxios.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
      console.log(err.response?.data);
      const originalConfig = err.config;
      if (err.response && err.response.status in [401, 403]) {
        session.destroy();
        throw redirect("/login");
      }
      return Promise.reject(err);
    }
  );

  return privateApiAxios;
};
