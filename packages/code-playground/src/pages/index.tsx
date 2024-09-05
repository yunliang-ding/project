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
    duration: 10000000
  });
};

const CodeComponents = ({ stepRef, setLoadOver }) => {
  const { components, dependencies, iframeRef } = uiStore.useSnapshot();
  const componentRef: any = useRef({});
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
  useEffect(() => {
    componentRef.current.setComponent(components);
    console.log(components);
  }, [components]);
  return (
    <>
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
        initialDependencies={dependencies}
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
        onUpdateDep={async (dep: any) => {
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
    uiStore.components =
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
        : [];
  };
  const queryDepList = () => {
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
          uiStore.dependencies = data;
          setSpin(false);
        },
      );
  };
  useEffect(() => {
    queryCompList();
    queryDepList();
  }, []);
  return spin ? (
    <Loading />
  ) : (
    <>
      {!loadOver && <Step stepRef={stepRef} />}
      <div
        className="code-playground"
        style={{ display: loadOver ? 'flex' : 'none' }}
      >
        <Sider />
        <CodeComponents setLoadOver={setLoadOver} stepRef={stepRef} />
        <Preview />
      </div>
    </>
  );
};
