import { AxiosRequestConfig } from 'axios';

export const addConfigJsonType: (
  config?: AxiosRequestConfig
) => AxiosRequestConfig = (config = {}) => ({
  ...config,
  headers: {
    ...config.headers,
    'Content-Type': 'application/json',
  },
});

export const addConfigFormDataType: (
  config?: AxiosRequestConfig
) => AxiosRequestConfig = (config = {}) => ({
  ...config,
  headers: {
    ...config.headers,
    'Content-Type': 'multipart/form-data',
  },
});

export const addConfigParams: (
  params: any,
  config?: AxiosRequestConfig
) => AxiosRequestConfig = (params, config = {}) => ({
  ...config,
  params: {
    ...config.params,
    ...params,
  },
});

export const jsonConfig = (signal: AbortSignal): AxiosRequestConfig =>
  addConfigJsonType({ signal });
export const jsonWithParamsConfig = (
  params: any,
  signal: AbortSignal
): AxiosRequestConfig => addConfigParams(params, jsonConfig(signal));
export const formDataConfig = (signal: AbortSignal): AxiosRequestConfig =>
  addConfigFormDataType({ signal });
