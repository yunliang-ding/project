import { create } from '@yl-d/hooks';
import { initData } from 'lyr';

export default create({
  // 定义 model 的初始 state
  name: '',
  nickname: '',
  avatarUrl: '',
  roles: [],
  remoteUrl: '',
  menus: [], // 菜单
  playMusic: {} as any, // 当前用户播放的歌曲
  playing: false,
  userId: '',
  likeIds: [],
  // 定义处理该模型副作用的函数
  async fetchUserInfo(uiStore) {
    if (localStorage.getItem('user.cookie') === null) {
      // 去登录
      uiStore.status = 'login';
      return;
    } else {
      // 查询用户详情
      const { userInfo }: any = initData;
      if (userInfo.profile === null) {
        // 去登录
        uiStore.status = 'login';
        return;
      }
      Object.assign(this, {
        ...userInfo,
        ...userInfo.profile,
      });
      uiStore.status = 'success';
    }
  },
});
