export const CONTEXT_ACTIONS = {
  SET_TEMPLATE_JSON: "SET_TEMPLATE_JSON",
  SET_BASE64_IMAGE: "SET_BASE64_IMAGE",
  SET_IMAGE_OPTIONS: "SET_IMAGE_OPTIONS",
};

export class ContextActionHandlers {
  static setTemplateJSON(payload) {
    return {
      type: CONTEXT_ACTIONS.SET_TEMPLATE_JSON,
      payload,
    };
  }
  static setBase64Image(payload) {
    return {
      type: CONTEXT_ACTIONS.SET_BASE64_IMAGE,
      payload,
    };
  }
  static setImageOptions(payload) {
    return {
      type: CONTEXT_ACTIONS.SET_IMAGE_OPTIONS,
      payload,
    };
  }
}
