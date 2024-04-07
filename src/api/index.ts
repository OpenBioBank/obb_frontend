import { post, get } from "@/utils/request";

const baseURL = `/v1`;
export default {
  // 新增信息
  sampleCollection: (params: any) =>
    post(`${baseURL}/storage/sampleCollection`, params, { type: "FORM_DATA" }),
  // nft铸造记录保存
  saveNFTInfo: (params: any) => post(`${baseURL}/nft/saveNFTInfo`, params),
  getGenomes: () => get(`${baseURL}/storage/getGenomes`),
  // nft数据列表查询
  getNFTInfo: (params: any) => get(`${baseURL}/nft/getNFTInfo`, params),
  // nft用户数据列表查询
  getNFTByCreator: (params: any) =>
    get(`${baseURL}/nft/getNFTByCreator`, params),
};
