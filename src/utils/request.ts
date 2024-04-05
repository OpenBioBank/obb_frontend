import axios from 'axios'


interface optTypes {
  type?: string
}

/*eslint no-unused-vars: 0*/
enum TypeEnum {
  // json
  JSON = 'application/json',
  // form-data qs
  FORM_URL = 'application/x-www-form-urlencoded',
  // form-data  upload
  FORM_DATA = 'multipart/form-data'
}

// 渠道ID
export const CHANNEL_ID = 100011324

const instance = axios.create({
  timeout: 30000,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

// 配置请求拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 配置请求回来的信息
instance.interceptors.response.use((response:any) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export const get = (url: string, params?: object) => {
  return instance.get(url, {
    params
  }).then(response => {
    if (response.status === 200) {
      return Promise.resolve(response.data || {})
    }
  }).catch(error => {
    return Promise.reject(error)
  })
}

export const post = (url: string, params: object, opts: optTypes = { type: 'JSON' }) => {
  return instance(url, {
    method: 'post',
    headers: {
      'Content-Type': getContentType(opts)
    },
    data: params
  }).then(response => {
    if (response.data.status === 200 || response.data.state === 1) {
     
      return Promise.resolve(response.data || {})
    } else {
      return Promise.resolve(response.data || {})
    }
  }).catch(error => {
    return Promise.reject(error.response
      )
  })
}



// post提交表单类型
export function getContentType(opts: optTypes) {
  return {
    'JSON': TypeEnum.JSON,
    'FORM_DATA': TypeEnum.FORM_DATA
  }[opts.type || 'JSON'] || ''
}
