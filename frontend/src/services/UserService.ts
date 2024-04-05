import axios from "axios";
import { API_URL } from "../common/Constants";
import authHeader from "./auth-header";

// const getAllNotifications = (username) => {
//   return axios.get(API_URL + "getAllNotifications", {
//     headers: authHeader(),
//     params: {
//       username: username,
//     },
//   });
// };

const getAllPixels = (params: any) => {
  return axios.get(API_URL + "getAllPixels", {
    headers: authHeader(),
    params: params,
  });
};

const deletePixel = (pixelId: any) => {
  return axios.post(API_URL + "deletePixel", pixelId, {
    headers: authHeader(),
  });
};

export { deletePixel, getAllPixels };
