export const CONTEXT_ACTIONS = {
  SET_LOADER: "SET_LOADER",
  SET_ALERT_DETAILS: "SET_ALERT_DETAILS",
  SET_BASE64_IMAGE: "SET_BASE64_IMAGE",
  SET_IMAGE_OPTIONS: "SET_IMAGE_OPTIONS",
  SET_ALL_LAYOUTS: "SET_ALL_LAYOUTS",
  SET_REEDIT_JSON: "SET_REEDIT_JSON",
};

export class ContextActionHandlers {
  dispatch = null;
  setLoader(payload) {
    this.dispatch({
      type: CONTEXT_ACTIONS.SET_LOADER,
      payload,
    });
  }
  setAlertDetails(payload) {
    console.log("payloaddddd");
    this.dispatch({
      type: CONTEXT_ACTIONS.SET_ALERT_DETAILS,
      payload,
    });
  }
  static setReEditorJSON(payload) {
    return {
      type: CONTEXT_ACTIONS.SET_TEMPLATE_JSON,
      payload,
    };
  }
  static setAllLayouts(payload) {
    this.dispatch({
      type: CONTEXT_ACTIONS.SET_ALL_LAYOUTS,
      payload,
    });
  }
  static setBase64Image(payload) {
    this.dispatch({
      type: CONTEXT_ACTIONS.SET_BASE64_IMAGE,
      payload,
    });
  }
  static setImageOptions(payload) {
    this.dispatch({
      type: CONTEXT_ACTIONS.SET_IMAGE_OPTIONS,
      payload,
    });
  }
}

export const contextActions = new ContextActionHandlers();
