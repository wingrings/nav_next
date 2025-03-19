import { responseType } from '@/types';
import { addToast } from "@heroui/react";



type responseHandelType = {
  success?: string | (() => void);
  warning?: string | (() => void);
}
export function response(
  val?: responseType | (() => responseType),
  {success, warning}: responseHandelType = { success: undefined, warning: undefined }
): responseType{
  console.log(val, 'val>>>')
  let data = val
  if(typeof val === 'function') {
    data = val()
  }
  if ((data as responseType).success) {
    if(typeof success === 'function') {
      success()
      return data as responseType
    }
    let description = (data as responseType).message
    if(typeof success === 'string') {
      description = success
    }
    addToast({
      description,
      color: "success",
    });
  } else {
    if(typeof warning === 'function') {
      warning()
      return data as responseType
    }
    let description = (data as responseType).message
    if(typeof warning === 'string') {
      description = warning
    }
    addToast({
      description,
      color: "warning",
    });
  }
  return data as responseType
}