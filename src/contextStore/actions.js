export const CONTEXT_ACTIONS = {
  SET_TEMPLATE_JSON: "SET_TEMPLATE_JSON",
  SET_BASE64_IMAGE: "SET_BASE64_IMAGE",
  SET_IMAGE_OPTIONS: "SET_IMAGE_OPTIONS",
  SET_ALL_LAYOUTS: "SET_ALL_LAYOUTS",
};

export class ContextActionHandlers {
  static setTemplateJSON(payload) {
    return {
      type: CONTEXT_ACTIONS.SET_TEMPLATE_JSON,
      payload,
    };
  }
  static setAllLayouts(payload) {
    return {
      type: CONTEXT_ACTIONS.SET_ALL_LAYOUTS,
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
