import { request } from 'lyr';

export const userInfo = async () => {
  return {
    code: 200,
    data: {
      menus: [
        {
          id: 40,
          icon: 'IconSearch',
          name: '查找歌曲',
          order: 1,
          path: '/search',
          children: [
            {
              id: 44,
              name: '关键字查询',
              order: 1,
              path: '/search/list',
              children: [],
            },
            {
              id: 44,
              name: 'Oss 在线',
              order: 1,
              path: '/search/oss',
              children: [],
            },
          ],
        },
        {
          id: 41,
          icon: 'IconCustomerService',
          name: '每日推荐',
          order: 1,
          path: '/recommend',
          children: [
            {
              id: 44,
              name: '每日推荐列表',
              order: 1,
              path: '/recommend/list',
              children: [],
            },
          ],
        },
        {
          id: 42,
          icon: 'IconHeart',
          name: '我的歌单',
          order: 5,
          path: '/playlist',
          children: [
            {
              id: 45,
              name: '我的歌单列表',
              order: 1,
              path: '/playlist/list',
              children: [],
            },
          ],
        },
        {
          id: 43,
          icon: 'IconUser',
          name: '系统管理',
          order: 10,
          path: '/system',
          children: [
            {
              id: 46,
              name: '个人中心',
              order: 1,
              path: '/system/my',
              children: [],
            },
          ],
        },
      ],
    },
  };
};

export const getQrCodeBase64 = async () => {
  const {
    data: { unikey },
  } = await request.get('/music.163/login/qr/key');
  const res = await request.get(
    `/music.163/login/qr/create?key=${unikey}&qrimg=1`,
  );
  return {
    ...res,
    unikey,
  };
};

export const checkQrCodeLogin = async (unikey: string) => {
  return request.get(`/music.163/login/qr/check?key=${unikey}`);
};

export const getUserAccount = async () => {
  return request.get('/music.163/user/account');
};

export const getUserLikelist = async (uid: number) => {
  return request.get(`/music.163/likelist?uid=${uid}`);
};

export const emailLogin = async (email: string, password: string) => {
  return request.get(`/music.163/login?email=${email}&password=${password}`);
};

export const getMp4Url = (id: number) => {
  return request.get(`/music.163/mv/url?id=${id}&r=1080`);
};
