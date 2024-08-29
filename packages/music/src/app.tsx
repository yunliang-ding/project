import { runApp } from 'lyr';
import NProgress from 'nprogress';
import Loading from '@/.theme/loading';
import { Notification } from '@yl-d/design';
import { getUserAccount, getUserLikelist, userInfo } from '@/services';
import Icon from '@yl-d/icon';
import 'nprogress/nprogress.css';

export const APPID = 11;

const recursion = (menus: any, auths: any) => {
  menus?.forEach((menu: any) => {
    menu.label = menu.name;
    menu.icon = Icon[menu.icon]?.();
    if (menu.children?.length > 0) {
      recursion(menu.children, auths);
    } else {
      delete menu.children;
      auths.push(menu.path);
    }
  });
};

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  easing: 'ease-in-out',
  parent: '#root',
});

runApp({
  /** 节点 */
  element: '#root',
  /** loading */
  loading: () => <Loading />,
  /** 加载勾子 */
  getInitData: async () => {
    // 查询 userInfo 获取中台用户信息
    const { code, data }: any = await userInfo();
    // 查询 网易云 用户详情
    const detail: any = await getUserAccount();
    if(detail.profile){
      const res: any = await getUserLikelist(detail.profile.userId);
      if (res.code === 200) {
        detail.profile.likeIds = res.ids;
      }
    }
    const auth = [];
    if (code === 200) {
      recursion(data.menus, auth);
    }
    return {
      auth,
      userInfo: {
        ...data,
        ...detail,
      },
    };
  },
  /** 请求配置 */
  axiosConfig: {
    timeout: 1000 * 180,
    withCredentials: true,
    maxContentLength: 5000,
    validateStatus: () => true,
    // 拦截请求
    requestInterceptors: (requestConfig) => {
      requestConfig.headers = {
        cookie163: localStorage.getItem('user.cookie'),
      };
      NProgress.start();
      return requestConfig;
    },
    // 拦截响应
    responseInterceptors: (response) => {
      NProgress.done();
      const {
        data: { code, msg },
      } = response;
      if (code === 40005) {
        // 登录信息失效，之后重新登录
        return;
      }
      if ([200, -2, 800, 801, 802, 803].includes(code)) {
        return response.data;
      }
      if (code !== 200) {
        Notification.error({
          title: '提示',
          content: msg || '接口异常',
        });
      }
      return response.data;
    },
  },
});
