import { create } from '@yl-d/hooks';
import { initData } from '@/.lyr';

export default create({
  name: '',
  avatarUrl: '',
  roles: [],
  remoteUrl: '',
  menus: [],
  // 定义处理该模型副作用的函数
  async fetchUserInfo(uiStore) {
    try {
      const { userInfo }: any = initData;
      Object.assign(this, userInfo.data);
      uiStore.status = 'success';
    } catch (error) {
      console.log(error);
      uiStore.status = 'error';
    }
  },
});
