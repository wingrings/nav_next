import Axios from 'axios'
// import { AxiosRequestConfig, AxiosResponse, Method, CancelToken } from 'axios'
import { uniqueId } from 'lodash'

type reqInt = {
  cancel: () => void
}
const requests: Map<string, reqInt> = new Map()


export function cancelToken(fn?: ({ cancel }: {keyId: string, cancel: () => void }) => void) {
  return new Axios.CancelToken((cancel: () => void) => {
    const id = uniqueId()
    // cancel就是取消请求的方法
    requests.set(id, { cancel })
    fn?.({ keyId: id, cancel })
    return { cancel }
  })
}


export function removeRequestCancel(id: string) {
  requests.delete(id);
}
export function requestCancel(id: string) {
  // 找到对应的请求并取消
  const fn = requests.get(id);
  fn?.cancel()
  removeRequestCancel(id)
}
export function requestCancelAll() {
  requests.forEach((_, id: string) => {
    // 取消没有响应的请求
    requestCancel(id)
  })
}
