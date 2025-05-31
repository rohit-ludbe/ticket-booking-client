/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { Platform } from "react-native";

const url = "https://eventpass.rohitludbe.com/api/v1";

const Request = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface IError {
  message: string;
  code: string;
  stack: string;
  data: string;
  name: string;
}

const serializeError = <T>(error: AxiosError<T>): IError => {
  const se = {} as IError;

  const { response } = error;
  if (!response) throw error;

  return se;
};

const responseInterceptor = async (
  response: AxiosResponse<unknown, unknown>
) => {
  const { headers } = response;

  if (headers["authorization"]) {
    // set authorization
    await AsyncStorage.setItem("auth", headers["authorization"] || "");
  }

  console.log("responseInterceptor", headers);
  return response;
};

const requestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  if (!config.url?.includes("auth")) {
    const auth = await AsyncStorage.getItem("auth");
    config.headers.Authorization = `Bearer ${auth}`;
  }
  return config;
};

const errorInterceptor = <T>(error: AxiosError<T>): IError => {
  throw serializeError(error);
};

Request.interceptors.request.use(requestInterceptor);
Request.interceptors.response.use(responseInterceptor, errorInterceptor);

const extractor = <T>(response: AxiosResponse<T>) => {
  const { data } = response;
  return data;
};

export interface IGetParams {
  [field: string]: string | number | boolean;
}

export const Get = <T>(
  path: string,
  params?: Partial<IGetParams>
): Promise<T> => Request.get<T>(path, { params }).then(extractor);

export const Post = <T>(
  path: string,
  payload: unknown,
  headers?: AxiosRequestConfig["headers"]
): Promise<T> => Request.post<T>(path, payload, { headers }).then(extractor);

export const Put = <T>(path: string, payload: unknown): Promise<T> =>
  Request.put<T>(path, payload).then(extractor);

export const Delete = <T>(
  path: string,
  params?: Partial<IGetParams>
): Promise<T> => Request.delete<T>(path, { params }).then(extractor);
