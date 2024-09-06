import { Component, useEffect, useState } from 'react';
import { isEmpty, babelParse } from '@yl-d/shared';
import { instance } from '@/axios';
import uiStore from '@/store/ui';
import CloudComponent from '@/cloud-component';
import { useSearchParams } from 'react-router-dom';
import './index.less';

const RenderError = (error) => {
  CloudComponent.render(
    <div className="playground-error-info">
      <div>解析失败:</div>
      <pre>{String(error)}</pre>
    </div>,
    document.querySelector('.playground-iframe-app'),
  );
};

/** 渲染逻辑 */
const RenderApp = async ({ data }) => {
  try {
    let VDom: any = null;
    if (data.componentName?.endsWith('.md')) {
      VDom = await CloudComponent.parseMarkdown({
        content: data.react,
      });
    } else {
      VDom = await CloudComponent.parseReact({
        componentName: data.componentName,
        react: data.react,
        less: data.less,
        require: uiStore.require,
      });
    }
    if (document.querySelector('.playground-iframe-app')) {
      class ErrorBoundariesWapper extends Component {
        componentDidCatch(error) {
          RenderError(error);
        }
        render() {
          return <VDom {...JSON.parse(data.props)} />;
        }
      }
      CloudComponent.render(
        <ErrorBoundariesWapper />,
        document.querySelector('.playground-iframe-app'),
      );
    }
  } catch (error) {
    RenderError(error);
  }
};

export default () => {
  document.body.removeAttribute('yld-theme'); // 不用黑色主题
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({});
  // 查询模型
  const search = async () => {
    const res = await instance.get('/component/detail', {
      params: {
        id: searchParams.get('id'),
      },
    });
    const depRes = await instance.post('/component/list', {
      pageSize: 999,
    });
    const dependencies = {};
    if (depRes.data.code === 200) {
      const list = depRes.data.data.data?.filter((i: any) => i.type === 3);
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.react) {
          try {
            if (item.componentName.endsWith('.js')) {
              new Function(item.react)();
            } else if (item.componentName.endsWith('.tsx')) {
              dependencies[item.componentName] = babelParse({
                code: item.react,
                require: uiStore.require,
              });
            } else if (
              item.componentName.endsWith('.less') &&
              (window as any).less
            ) {
              const { css } = await window.less.render?.(item.react); // 要添加的 CSS 字符串
              const style = document.createElement('style'); // 创建一个 CSSStyleSheet 对象
              style.innerHTML = css;
              document.head.appendChild(style);
            }
            console.log(`${item.componentName} 资源解析成功..`);
          } catch (error) {
            console.log(error);
            console.log(`${item.componentName} 资源解析失败..`);
          }
        }
      }
      uiStore.require = {
        ...dependencies,
        ...uiStore.require,
      };
      setData(res.data.data);
    }
  };
  useEffect(() => {
    if (searchParams.get('id')) {
      search();
    }
  }, []);
  if (!isEmpty(data)) {
    RenderApp({
      data,
    });
  }
  return (
    <div className="playground-iframe">
      <div className="playground-iframe-app" />
    </div>
  );
};
