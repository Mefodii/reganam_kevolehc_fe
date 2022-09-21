import { GET_INFO } from "../actions/types.js";

const initialState = {
  watchioTypes: {},
  statusTypes: [],
  airStatusTypes: [],
  contentItemPartStatusTypes: [],
  downloadStatusTypes: [],
  contentItemTypes: [],
  fileExtensionTypes: [],
  contentWatcherSourceTypes: [],
  contentWatcherStatusTypes: [],
};

const getInfo = (state, payload) => ({
  ...state,
  ...payload,
});

const reducer = (state = initialState, action) => {
  if (action.type === GET_INFO) return getInfo(state, action.payload);
  return state;
};

export default reducer;
