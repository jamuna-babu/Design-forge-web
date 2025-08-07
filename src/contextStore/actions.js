export const CONTEXT_ACTIONS = {
  SET_TEMPLATE_JSON: "SET_TEMPLATE_JSON",
};

export class ContextActionHandlers {
  static setTemplateJSON(payload) {
    return {
      type: CONTEXT_ACTIONS.SET_TEMPLATE_JSON,
      payload,
    };
  }
}
