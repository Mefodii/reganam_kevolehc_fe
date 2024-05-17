export const addConfigJsonType: (config?: AxiosConfig) => AxiosConfig = (
  config = {}
) => ({
  ...config,
  headers: {
    ...config.headers,
    'Content-Type': 'application/json',
  },
});

export const addConfigFormDataType: (config?: AxiosConfig) => AxiosConfig = (
  config = {}
) => ({
  ...config,
  headers: {
    ...config.headers,
    'Content-Type': 'multipart/form-data',
  },
});

export const addConfigParams: (
  params: AxiosConfigParams,
  config?: AxiosConfig
) => AxiosConfig = (params, config = {}) => ({
  ...config,
  params: {
    ...config.params,
    ...params,
  },
});

export const jsonConfig = (): AxiosConfig => addConfigJsonType();
export const jsonWithParamsConfig = (params: AxiosConfigParams): AxiosConfig =>
  addConfigParams(params, jsonConfig());
export const formDataConfig = (): AxiosConfig => addConfigFormDataType();
