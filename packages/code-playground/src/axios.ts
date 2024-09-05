import { getUser } from './util';
import axios from 'axios';
import { Notification } from '@yl-d/design';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  easing: 'ease-in-out',
});

const APPID = 2;

export const interceptorsRequest = (requestConfig) => {
  NProgress.start();
  requestConfig.headers = {
    token: localStorage.getItem("token"),
  };
  requestConfig.data = {
    ...requestConfig.data,
    createUser: getUser()?.id,
  };
  return requestConfig;
};

export const interceptorsResponse = (responseConfig) => {
  NProgress.done();
  const {
    data: { code, msg },
  } = responseConfig;
  if (code === 40005) {
    // 登录信息失效，之后重新登录
    location.href = `https://ulp.yunliang.cloud?redirect=${location.href}&appId=${APPID}`;
    return responseConfig;
  }
  if (code !== 200) {
    Notification.error({
      title: '提示',
      content: msg || '接口异常',
    });
  }
  return responseConfig;
};

const instance = axios.create({
  baseURL: 'https://api-online.yunliang.cloud',
  headers: {
    token: localStorage.getItem("token"),
  },
});
instance.interceptors.request.use(interceptorsRequest);
instance.interceptors.response.use(interceptorsResponse);

const request = axios.create({
  baseURL: '/',
  headers: {
    token: localStorage.getItem("token"),
  },
});
request.interceptors.request.use(interceptorsRequest);
request.interceptors.response.use(interceptorsResponse);

export { instance, request };
