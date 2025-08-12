import axios from "axios";
import { API_URLS } from "./urls";

export class APIService {
  static generateImage(payload) {
    return axios.post(API_URLS.generateImage, payload).then(({ data }) => data);
  }
  static getAllLayouts(payload) {
    return axios.get(API_URLS.allLayouts).then(({ data }) => data);
  }
  static postSaveTemplate(payload) {
    return axios
      .post(API_URLS.saveTemplate, payload, {})
      .then(({ data }) => data);
  }
  static postPdfLayout(payload) {
    return axios.post(API_URLS.pdfLayout, payload, {}).then(({ data }) => data);
  }
  static postEditImage(payload) {
    return axios
      .post(API_URLS.reeditImage, payload, {})
      .then(({ data }) => data);
  }
}
