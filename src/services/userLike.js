import axios from "axios";
import config from "./config";
import getAuthHeader from "./auth-header";

const { API_URL } = config;

const headers = { headers: getAuthHeader() };

export function like(attachmentId) {
  return axios
    .post(`${API_URL}attachments/${attachmentId}/like`, {}, headers)
    .then((response) => {
      return response.data;
    });
}

export function unlike(attachmentId) {
  return axios
    .post(`${API_URL}attachments/${attachmentId}/unlike`, {}, headers)
    .then((response) => {
      return response.data;
    });
}

const userLikeService = { like, unlike };

export default userLikeService;
