import { ReactElement, ReactNode, useEffect } from 'react';
import ReactDom from 'react-dom';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/.theme/index';
import ErrorBoundary from '@/.theme/error-boundary';
import router from './router';
import AuthRouter from './auth';
import { ConfigProps } from './type';
import axios, { AxiosRequestConfig } from 'axios';
import breadcrumbStore from '@/store/breadcrumb';
import { PageHeaderProps } from '@arco-design/web-react';

import '@/global.less';

const store = {
  request: axios.create({}),
  initData: {
    auth: [''],
    userInfo: {},
  },
};

export const request = store.request;

export const initData = store.initData;

const App = ({ routerInterceptors }) => {
  const element = createHashRouter([
    {
      path: '/',
      element: <Layout routerInterceptors={routerInterceptors} />,
      errorElement: <ErrorBoundary />,
      children: router
        .map((item) => ({
          ...AuthRouter(item),
          errorElement: <ErrorBoundary />,
        }))
        .concat([
          {
            path: '*',
            element: <h3>您访问的页面不存在!</h3>,
          },
        ] as any),
    },
  ]);
  return <RouterProvider router={element} />;
};

interface AppProps {
  element?: string;
  loading?: () => ReactElement;
  getInitData?: () => Promise<{
    auth: string[];
    userInfo: any;
  }>;
  axiosConfig?: AxiosRequestConfig & {
    requestInterceptors?: any;
    responseInterceptors?: any;
  };
  routerInterceptors?: () => void | ReactNode;
}

export const runApp = async ({
  element = '#root',
  getInitData = async () => ({
    auth: [''],
    userInfo: {},
  }),
  loading = () => <span>加载中...</span>,
  axiosConfig = {},
  routerInterceptors
}: AppProps) => {
  /** 创建 axios 实例 */
  const axiosinstance = axios.create(axiosConfig);
  if (typeof axiosConfig.requestInterceptors === 'function') {
    axiosinstance.interceptors.request.use(axiosConfig.requestInterceptors);
  }
  if (typeof axiosConfig.responseInterceptors === 'function') {
    axiosinstance.interceptors.response.use(axiosConfig.responseInterceptors);
  }
  Object.assign(store.request, axiosinstance); // 覆盖下
  ReactDom.render(loading(), document.querySelector(element));
  Object.assign(store.initData, await getInitData()); // 覆盖下
  ReactDom.render(<App routerInterceptors={routerInterceptors} />, document.querySelector(element));
};

export const defineConfig = (props: ConfigProps) => {
  return props;
};

interface BreadCrumbHeaderProps extends Omit<PageHeaderProps, "breadcrumb">{
  breadcrumb?: {
    icon?: ReactNode;
    path?: string;
    breadcrumbName?: string;
  }[]
}

export const useBreadCrumb = () => {
  useEffect(() => {
    return () => {
      Object.assign(breadcrumbStore, {
        title: '',
        breadcrumb: undefined,
        extra: [],
      });
    };
  }, []);
  return {
    update: (options: BreadCrumbHeaderProps) => {
      setTimeout(() => {
        Object.assign(breadcrumbStore, options);
      }, 10);
    },
  };
};

export const version = "0.0.1";

export const noticeInfo = "undefined";

export const logo = "undefined";
