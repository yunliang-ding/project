import { useEffect } from 'react';
import { useBreadCrumb } from 'lyr';
import { toSign } from './services';
import { Button, Message, Space } from '@yl-d/design';

const Page = () => {
  const breadCrumb = useBreadCrumb();
  const sign = async () => {
    const { code } = await toSign();
    if (code === 200) {
      Message.success('签到成功');
    } else if (code === -2) {
      Message.warning('重复签到');
    }
  };
  const logout = async () => {
    localStorage.removeItem("user.cookie");
    location.reload();
  };
  useEffect(() => {
    breadCrumb?.update({
      extra: (
        <Space>
          <Button type="primary" spin onClick={sign}>
            签到
          </Button>
          <Button type="primary" spin onClick={logout}>
            退出登录
          </Button>
        </Space>
      ),
    });
  }, []);
  return null;
};

Page.pageConfig = {
  // 可选，配置准入权限，若不配置则代表所有角色都可以访问
  auth: ['个人中心'],
};
export default Page;
