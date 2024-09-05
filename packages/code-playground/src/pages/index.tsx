/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { useEffect, useRef, useState } from 'react';
import { Avatar, Button } from '@yl-d/design';
import { Notification, Space } from '@yl-d/design';
import { instance } from '@/axios';
import Step from '@/component/step';
import CloudComponent from '@/cloud-component';
import Loading from '@/component/loading';
import uiStore from '@/store/ui';
import userStore from '@/store/user';
import {
  IconLaunch,
  IconMoon,
  IconRefresh,
  IconSun,
} from '@yl-d/icon';
import { useSearchParams } from 'react-router-dom';
import store from '@/store';
import './index.less';

export const sleep = (timer = 500) => new Promise((r) => setTimeout(r, timer));

export const simpleNotice = (text: string, type = 'success') => {
  Notification[type]({
    content: text,
    position: 'bottomRight',
  });
};

const Component = ({ initialDependencies = [], id }) => {
  const { dark } = uiStore.useSnapshot();
  const { avatarUrl } = userStore.useSnapshot();
  const componentRef: any = useRef({});
  const iframeRef: any = useRef({});
  const stepRef: any = useRef({});
  const [loadOver, setLoadOver]: any = useState(false);
  const addOrUpdate = async (value) => {
    const {
      data: { code, data },
    } = await instance.post(value.id ? '/component/update' : '/component/add', {
      ...value,
      props: JSON.stringify(value.props),
      createTime: undefined,
      updateTime: undefined,
      open: undefined,
      selected: undefined,
    });
    if (code === 200) {
      value.originReact = value.react; // 同步原始脚本
      store.reactChange = false;
      simpleNotice(
        value.id
          ? `组件(${value.componentName})已更新`
          : `组件(${value.componentName})已添加`,
      );
    } else {
      simpleNotice(`组件(${value.componentName})保存失败`, 'error');
    }
    iframeRef.current?.contentWindow?.location?.reload?.();
    return data;
  };
  const list = async () => {
    stepRef.current.updateLogs('加载组件列表..');
    const {
      data: {
        code,
        data: { data },
      },
    } = await instance.post('/component/list');
    // 延迟下不然打不开编辑器??
    setTimeout(() => {
      componentRef.current.setComponent(
        code === 200
          ? data.reverse().map((item) => {
              return {
                ...item,
                open: String(item.id) === id,
                selected: String(item.id) === id,
                props: JSON.parse(item.props),
                originReact: item.react,
              };
            })
          : [],
      );
    }, 1000);
    await sleep();
    stepRef.current.updateLogs('组件列表加载完毕..');
  };
  useEffect(() => {
    list();
  }, []);
  return (
    <>
      {!loadOver && <Step stepRef={stepRef} />}
      <div style={{ display: loadOver ? 'block' : 'none' }}>
        <CloudComponent
          componentRef={componentRef}
          require={{
            '@yl-d/design': window.yldDesign,
            '@yl-d/icon': window.yldIcon,
          }}
          onSave={addOrUpdate}
          onLog={async (info) => {
            await stepRef.current.updateLogs(info, 1000);
            if (info === '加载完毕') {
              await sleep(1000);
              setLoadOver(true);
            }
          }}
          initialDependencies={initialDependencies}
          onAdd={async (value) => {
            await new Promise((res) => setTimeout(res, 500));
            return await addOrUpdate(value);
          }}
          onAddDep={async (dep) => {
            const {
              data: { code, data },
            } = await instance.post('/dependencies/add', {
              ...dep,
              createTime: undefined,
              updateTime: undefined,
            });
            if (code === 200) {
              simpleNotice(`新增脚本${dep.name}成功`);
              return {
                id: data,
              };
            }
            simpleNotice(`新增脚本${dep.name}失败`, 'error');
            return {};
          }}
          onUpdateDep={async (dep) => {
            const {
              data: { code },
            } = await instance.post('/dependencies/update', {
              ...dep,
              createTime: undefined,
              updateTime: undefined,
            });
            if (code === 200) {
              simpleNotice(`更新脚本${dep.name}成功`);
              return true;
            }
            simpleNotice(`更新脚本${dep.name}失败`, 'error');
            return false;
          }}
          previewRender={(item) => {
            (document as any).title = `${item.componentName}-PlayGround`;
            const url = `${location.origin}${location.pathname}#/preview?id=${item.id}`;
            if (item) {
              history.pushState({}, '', `${location.pathname}#/?id=${item.id}`);
            }
            return (
              <div className="app-preview">
                <div className="preview-address">
                  <div>{url}</div>
                  <Space>
                    <IconRefresh
                      onClick={() => {
                        iframeRef.current.contentWindow.location.reload();
                      }}
                    />
                    <IconLaunch
                      onClick={() => {
                        window.open(url);
                      }}
                    />
                  </Space>
                </div>
                <iframe
                  ref={iframeRef}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  src={url}
                  onLoad={async () => {
                    await sleep();
                  }}
                />
              </div>
            );
          }}
          extra={[
            <Button
              circle
              icon={dark ? <IconSun /> : <IconMoon />}
              onClick={async () => {
                uiStore.dark = !dark;
              }}
            />,
            <Avatar size={30}>
              <img
                alt="avatar"
                src={avatarUrl}
              />
            </Avatar>,
          ]}
        />
      </div>
    </>
  );
};

export default () => {
  const [spin, setSpin] = useState(true);
  const [searchParams] = useSearchParams();
  const [dependencies, setDependencies] = useState([]);
  useEffect(() => {
    instance
      .post('/dependencies/list', {
        pageSize: 99,
      })
      .then(
        ({
          data: {
            data: { data },
          },
        }) => {
          setDependencies(data);
          setSpin(false);
        },
      );
  }, []);
  return spin ? (
    <Loading />
  ) : (
    <Component initialDependencies={dependencies} id={searchParams.get('id')} />
  );
};
