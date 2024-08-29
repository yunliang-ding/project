/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable radix */
/* eslint-disable prefer-template */
import { useEffect } from 'react';
import Layout from './layout';
import Loading from './loading';
import Login from './login';
import uiStore from '@/store/ui';
import userStore from '@/store/user';
import React from 'react';

export default () => {
  const { fetchUserInfo, playMusic } = userStore.useSnapshot();
  const { status } = uiStore.useSnapshot();
  useEffect(() => {
    document.body.style.setProperty(
      '--primary-color',
      uiStore.primaryColor
    );
  }, [uiStore.primaryColor]);
  useEffect(() => {
    fetchUserInfo(uiStore);
  }, []);
  let Vnode: any = null;
  if (status === 'loading') {
    Vnode = <Loading />;
  } else if (status === 'error') {
    Vnode = Vnode = (
      <h1
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        系统异常，请稍后重试!
      </h1>
    );
  } else if (status === 'login') {
    Vnode = <Login />;
  } else {
    Vnode = <Layout />;
  }
  return (
    <>
      <img src={playMusic?.al?.picUrl} className="app-background-img" />
      <div className="app-toolbar">
        <span className="app-toolbar-red" />
        <span className="app-toolbar-yellow" />
        <span className="app-toolbar-green" />
      </div>
      {Vnode}
    </>
  );
};
