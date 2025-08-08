import axios from "axios";
import { API_URLS } from "./urls";

export class APIService {
  static generateImage(payload) {
    return axios.post(API_URLS.generateImage, payload).then(({ data }) => data);
  }
}
