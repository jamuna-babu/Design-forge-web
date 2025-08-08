import { CONTEXT_ACTIONS } from "./actions";

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONTEXT_ACTIONS.SET_TEMPLATE_JSON:
      return {
        ...state,
        templateJSON: payload,
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
