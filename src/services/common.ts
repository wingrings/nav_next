
export function resDataHandle(code: number, data: any) {
  let resData = {}
  let message = ''
  if(typeof data === 'string') {
    message = data
  }else {
    resData = data
  }
  if(code === 200) {
    return {
      code,
      success: true,
      message,
      ...resData
    }
  } else {
    return {
      code,
      success: false,
      message,
      ...resData
    }
  }
}