import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { cancelToken, removeRequestCancel } from './cancelRequest'
interface ExtendedPromise<T> extends Promise<T> {
  keyId: string;
  cancel: () => void;
}


const TIMEOUT = {
  DEFAULT: 3 * 60000,
  UPLOADING: 5 * 60000,
};

const axios: any = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: TIMEOUT.DEFAULT, 
  withCredentials: true,
  // paramsSerializer: (params: any) => {
  //   return Qs.stringify(params, { arrayFormat: 'brackets' })
  // },
})

// 前置请求拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return {
      ...config,
      timeout: TIMEOUT.UPLOADING,
      headers: {
        ...config.headers,
        authorization: '1',
      },
    };
  },
  (error: unknown) => Promise.reject(error),
)

// 后置响应拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response: {config: {cancelKeyId: string}} & AxiosResponse) => {
    const { status } = response;
    removeRequestCancel(response.config.cancelKeyId)
    if (status === 200) {
      return response;
    }
    return Promise.reject(response);
  },
  (error: string) => {
    console.log('error', error);
    
    return Promise.reject(error);
  },
)

/**
 * @description 发起一个http请求
 *
 * @param { string } url 请求的Url地址
 * @param { any } [data] 请求参数
 * @param { Method } [type = 'GET'] 请求方法的类型
 * @param { Object } [config] 请求的设置
 * */
function request<T = any>(
  url: string,
  data: any = {},
  type: Method = 'GET',
  config: { [p: string]: any; params?: any; data?: any } = {},
  // customMap: 为true时候，不进行过滤， notCancel：为true时候，不进行取消埋点
  extra: { customMap?: boolean; notCancel?: boolean } = {}
): ExtendedPromise<T> {
  const method = type.toUpperCase()
  const obj: any = {
    url,
    method,
    loading: false,
    [method === 'GET' ? 'params' : 'data']: data,
    // cancelToken: cancelToken(),
  }
  let cancelData: any = null
  const assignData = Object.assign(obj, config)
  if (!extra.notCancel) {
    assignData.cancelToken = cancelToken((data) => {
      cancelData = data
      assignData.cancelKeyId = data.keyId
    })
  }
  const p = axios(assignData)
  p.keyId = cancelData.keyId
  p.cancel = cancelData.cancel
  cancelData = null
  return p
}
export default request


