import { CONTEXT_ACTIONS } from "./actions";

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONTEXT_ACTIONS.SET_TEMPLATE_JSON:
      return {
        ...state,
        templateJSON: payload,
      };

    default:
      return state;
  }
};
