import { Component, useEffect, useState } from 'react';
import { isEmpty, babelParse } from '@yl-d/shared';
import { instance } from '@/axios';
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
const RenderApp = async ({ data, dependencies }) => {
  try {
    let VDom: any = null;
    if (data.componentName?.endsWith('.md')) {
      VDom = await CloudComponent.parseMarkdown({
        content: data.react,
      });
      console.log(VDom);
    } else {
      VDom = await CloudComponent.parseReact({
        componentName: data.componentName,
        react: data.react,
        less: data.less,
        require: {
          '@yl-d/design': window.yldDesign,
          '@yl-d/icon': window.yldIcon,
          ...dependencies,
        },
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
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({});
  const [dependencies, setDependencies] = useState({});
  // 查询模型
  const search = async () => {
    const res = await instance.get('/component/detail', {
      params: {
        id: searchParams.get('id'),
      },
    });
    const depRes = await instance.post('/dependencies/list', {
      pageSize: 100,
    });
    if (depRes.data.code === 200) {
      const list = depRes.data.data.data;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.content) {
          try {
            if (item.type === 'javascript') {
              new Function(item.content)();
              dependencies[item.name] = window[item.name];
            } else if (item.type === 'react') {
              dependencies[item.name] = babelParse({
                code: item.content,
                require: {
                  '@yl-d/design': window.yldDesign,
                }
              });
            } else if (item.type === 'less' && (window as any).less) {
              const { css } = await (window as any).less.render?.(item.content); // 要添加的 CSS 字符串
              const sheet = new CSSStyleSheet(); // 创建一个 CSSStyleSheet 对象
              sheet.insertRule(css, 0); // 将 CSS 规则插入到 CSS 样式表中，位置为第一个
              document.adoptedStyleSheets = [sheet];
            }
            console.log(`${item.name} 资源解析成功..`);
          } catch (error) {
            console.log(error);
            console.log(`${item.name} 资源解析失败..`);
          }
        }
      }
      setDependencies({ ...dependencies });
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
      dependencies,
    });
  }
  return (
    <div className="playground-iframe">
      <div className="playground-iframe-app" />
    </div>
  );
};
