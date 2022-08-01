import { OPEN_MODAL, CLOSE_MODAL } from "../actions/types.js";

const initialState = {
  modalType: "",
  data: {},
  isOpen: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case OPEN_MODAL:
      return { ...payload, isOpen: true };

    case CLOSE_MODAL:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
