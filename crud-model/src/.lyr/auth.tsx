import { initData } from './index';

export default ({ path, component }: { path: string; component: any }) => {
  const hasAuth =
    initData.auth.includes(component.type.auth) ||
    component.type.auth === undefined;
  return {
    path,
    element: hasAuth ? (
      component
    ) : <h3>您暂无权限访问该页面!</h3>,
  };
};
