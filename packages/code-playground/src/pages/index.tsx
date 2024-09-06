import { useEffect, useRef, useState } from 'react';
import { Message } from '@yl-d/design';
import { instance } from '@/axios';
import Step from '@/component/step';
import CloudComponent from '@/cloud-component';
import Loading from '@/component/loading';
import { useSearchParams } from 'react-router-dom';
import store from '@/store';
import uiStore from '@/store/ui';
import Sider from './component/sider';
import Preview from './component/preview';
import './index.less';

export const sleep = (timer = 500) => new Promise((r) => setTimeout(r, timer));

export const simpleNotice = (text: string, type = 'success') => {
  Message[type]({
    content: text,
    position: 'bottom',
  });
};

const CodeComponents = ({ stepRef, setLoadOver }) => {
  const addOrUpdate = async (value: any) => {
    const {
      data: { code, data },
    } = await instance.post(value.id ? '/component/update' : '/component/add', {
      ...value,
      props: JSON.stringify(value.props),
      createTime: undefined,
      updateTime: undefined,
      createUser: undefined,
      updateUser: undefined
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
    uiStore.iframeRef.current?.contentWindow?.location?.reload?.();
    return data;
  };
  return (
    <>
      <CloudComponent
        onSave={addOrUpdate}
        onAdd={async (item: any) => {
          await new Promise((res) => setTimeout(res, 500));
          return await addOrUpdate(item);
        }}
        onLog={async (info) => {
          await stepRef.current.updateLogs(info, 1000);
          if (info === '加载完毕') {
            await sleep(1000);
            setLoadOver(true);
          }
        }}
        previewRender={(item: any) => {
          uiStore.currentFile = item;
          return null;
        }}
      />
    </>
  );
};

export default () => {
  const [spin, setSpin] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const stepRef: any = useRef({});
  const [loadOver, setLoadOver]: any = useState(false);
  const queryCompList = async () => {
    const {
      data: {
        code,
        data: { data },
      },
    } = await instance.post('/component/list');
    setSpin(false);
    if (code === 200 && data.length > 0) {
      uiStore.components = data.reverse().map((i: any) => {
        const item = {
          ...i,
          props: JSON.parse(i.props),
          originReact: i.react,
        };
        if (String(item.id) === id) {
          uiStore.currentFile = item;
          uiStore.activeTab = item.type;
        }
        return item;
      });
    }
    if (!id && uiStore.components.length > 0) {
      uiStore.currentFile = uiStore.components[0];
      uiStore.activeTab = uiStore.currentFile.type;
    }
  };
  useEffect(() => {
    queryCompList();
  }, []);
  const rootRef = useRef<any>();
  return spin ? (
    <Loading />
  ) : (
    <>
      {!loadOver && <Step stepRef={stepRef} />}
      <div
        ref={rootRef}
        className="code-playground"
        style={{ display: loadOver ? 'flex' : 'none' }}
      >
        <Sider rootRef={rootRef} />
        <CodeComponents setLoadOver={setLoadOver} stepRef={stepRef} />
        <Preview />
      </div>
    </>
  );
};
