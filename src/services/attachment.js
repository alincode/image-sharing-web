import axios from "axios";
import config from "./config";
import getAuthHeader from "./auth-header";

const { API_URL } = config;

export function createAttachment(file, description) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("description", description);
  const headers = Object.assign(getAuthHeader(), {
    "Content-Type": "multipart/form-data",
  });
  return axios
    .post(API_URL + "attachments", formData, { headers })
    .then((response) => {
      return response.data;
    });
}

export function fetchAttachment() {
  return axios.get(API_URL + "attachments").then((response) => {
    return response.data;
  });
}

const attachmentService = {
  createAttachment,
  fetchAttachment,
};

export default attachmentService;
