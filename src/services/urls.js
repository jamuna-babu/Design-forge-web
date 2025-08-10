const BASE_URL = "http://127.0.0.1:5000";
// const BASE_URL = "http://107.97.59.169:5000";

export const API_URLS = {
  generateImage: `${BASE_URL}/sd-image-gen`, //generate image
  allLayouts: `${BASE_URL}/get-all-templates`, //all
  saveTemplate: `${BASE_URL}/save-template`, //after creteTemplate on Save
  pdfLayout: `${BASE_URL}/layout-from-pdf`, //createTemplate
};
