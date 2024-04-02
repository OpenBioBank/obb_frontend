import { post, get } from '@/utils/request'

const baseURL = `http://www.openbiobank.xyz/v1`
export default {
  sampleCollection: (params:any) => post(`${baseURL}/storage/sampleCollection`, params,{ type: 'FORM_DATA' }),
}
