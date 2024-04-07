import { post, get } from "@/utils/request";

const baseURL = `/v1/storage`;
export default {
  sampleCollection: (params: any) =>
    post(`${baseURL}/sampleCollection`, params, { type: "FORM_DATA" }),
  getGenomes: () => get(`${baseURL}/getGenomes`),
};
