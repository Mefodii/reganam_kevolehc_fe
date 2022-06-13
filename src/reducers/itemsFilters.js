import { UPDATE_WATCHIO_FILTER } from "../actions/types.js";

const watchioFilter = localStorage.getItem("watchioFilter");
const initialWatchioFilter = {
  title: "",
  showPosters: true,
  statuses: [],
  fromDate: "",
  toDate: "",
};

const initialState = {
  watchioFilter: watchioFilter
    ? JSON.parse(watchioFilter)
    : initialWatchioFilter,
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case UPDATE_WATCHIO_FILTER:
      localStorage.setItem("watchioFilter", JSON.stringify(payload));
      return {
        ...state,
        watchioFilter: payload,
      };
    default:
      return state;
  }
};

export default reducer;
