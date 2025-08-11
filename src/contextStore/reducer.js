import { CONTEXT_ACTIONS } from "./actions";

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONTEXT_ACTIONS.SET_LOADER:
      return {
        ...state,
        loader: payload,
      };
    case CONTEXT_ACTIONS.SET_ALERT_DETAILS:
      return {
        ...state,
        alert: {
          type: payload.type,
          message: payload.message,
        },
      };
    case CONTEXT_ACTIONS.SET_ALL_LAYOUTS:
      return {
        ...state,
        allLayouts: payload,
      };
    case CONTEXT_ACTIONS.SET_BASE64_IMAGE:
      return {
        ...state,
        base64Image: payload,
      };
    case CONTEXT_ACTIONS.SET_IMAGE_OPTIONS:
      return {
        ...state,
        imageOptions: payload,
      };
    default:
      return state;
  }
};
