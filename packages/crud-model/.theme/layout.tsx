import React from 'react';
import { Outlet } from 'react-router-dom';
import uiStore from '@/store/ui';

export default () => {
  const { dark } = uiStore.useSnapshot();
  React.useEffect(() => {
    if (dark) {
      document.body.setAttribute('yld-theme', 'dark');
    } else {
      document.body.removeAttribute('yld-theme');
    }
  }, [dark]);
  (window as any).monacoTheme = 'vs-dark';
  return <Outlet />;
};
