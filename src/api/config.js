export const addConfigJsonType = (config = {}) => ({
  ...config,
  headers: {
    ...config.headers,
    "Content-Type": "application/json",
  },
});

export const addConfigFormDataType = (config = {}) => ({
  ...config,
  headers: {
    ...config.headers,
    "Content-Type": "multipart/form-data",
  },
});

export const addConfigParams = (params, config = {}) => ({
  ...config,
  params: {
    ...config.params,
    ...params,
  },
});

export const jsonConfig = () => addConfigJsonType();
export const jsonWithParamsConfig = (params) =>
  addConfigParams(params, jsonConfig());
export const formDataConfig = () => addConfigFormDataType();
