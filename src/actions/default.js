import axios from "axios";

export const defaultGet =
  (url, actionType, config = addConfigJsonType()) =>
  (dispatch) => {
    axios
      .get(url, config)
      .then(defaultOnSuccess(actionType, dispatch))
      .catch(defaultOnError);
  };

export const defaultPost =
  (url, actionType, data, config = addConfigJsonType()) =>
  (dispatch) => {
    axios
      .post(url, data, config)
      .then(defaultOnSuccess(actionType, dispatch))
      .catch(defaultOnError);
  };

export const defaultDelete =
  (url, actionType, payload, config = addConfigJsonType()) =>
  (dispatch) => {
    axios
      .delete(url, config)
      .then((response) => {
        dispatch({
          type: actionType,
          payload,
        });
      })
      .catch(defaultOnError);
  };

export const defaultOnSuccess = (actionType, dispatch) => (response) => {
  dispatch({
    type: actionType,
    payload: response.data,
  });
};

export const defaultOnError = (err) => console.log(err);

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
