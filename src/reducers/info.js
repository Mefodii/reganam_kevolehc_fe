import { GET_WATCHIO_INFO } from "../actions/types.js";

const initialState = {
  watchioTypes: {},
  statusTypes: [],
  airStatusTypes: [],
};

const getInfo = (state, payload) => ({
  ...state,
  ...payload,
});

const reducer = (state = initialState, action) => {
  if (action.type === GET_WATCHIO_INFO) return getInfo(state, action.payload);
  return state;
};

export default reducer;
