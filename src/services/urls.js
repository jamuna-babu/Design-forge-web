// const BASE_URL = "http://107.97.58.248:5000";
const BASE_URL = "http://192.168.251.189:5000";

export const API_URLS = {
  generateImage: `${BASE_URL}/sd-image-gen`, //generate image
  allLayouts: `${BASE_URL}/get-all-templates`, //all
  saveTemplate: `${BASE_URL}/save-template`, //after creteTemplate on Save
  pdfLayout: `${BASE_URL}/layout-from-pdf`, //createTemplate
};
