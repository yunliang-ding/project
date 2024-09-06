/**
 * 自定义扩展业务组件
 */
import ReactDOM from 'react-dom';
import { useEffect, CSSProperties } from 'react';
import { babelParse, MarkdownViewer } from '@yl-d/shared';
import Main, { injectStyle } from './main';
import uiStore from '@/store/ui';
import Components from './components';
import './index.less';

export interface CloudComponentProps {
  /** 配置依赖 */
  require?: any;
  /** ctrl + s 钩子 */
  onSave?: any;
  /** onChange */
  onChange?: any;
  /** 新增钩子 */
  onAdd?: Function;
  onLog?: Function; // 加载日志
  /** 新增依赖 */
  onAddDep?: Function;
  /** 更新依赖 */
  onUpdateDep?: Function;
  /** 自定义预览 */
  previewRender?: any;
  style?: CSSProperties;
}

const CloudComponent = ({
  onSave = async (code: string) => {},
  onAdd = async (code: string) => {},
  onChange = () => {},
  onLog = () => {},
  previewRender,
  style = {},
}: CloudComponentProps) => {
  const { activeTab, components, require, currentFile } = uiStore.useSnapshot();
  const updateDepReq = async (dep: any) => {
    const _dep = {};
    for (let i = 0; i < dep.length; i++) {
      const item = dep[i];
      if (item.react && !item.componentName.endsWith('.less')) {
        try {
          onLog(`加载脚本: ${item.componentName}`);
          await new Promise((res) => setTimeout(res, 100));
          if (item.componentName.endsWith('.js')) {
            new Function(item.react)();
          } else if (item.componentName.endsWith('.tsx')) {
            // react 组件
            _dep[item.componentName.replace('.tsx', '')] = babelParse({
              code: item.react,
              require,
            });
          } else if (item.componentName.endsWith('.less') && window.less) {
            // 全局样式 less
            const { css } = await window.less.render?.(item.react); // 要添加的 CSS 字符串
            const style = document.createElement('style'); // 创建一个 CSSStyleSheet 对象
            style.innerHTML = css;
            document.head.appendChild(style);
          }
          onLog(`${item.componentName} 脚本资源解析成功..`);
        } catch (error) {
          console.log(error);
          onLog(`${item.componentName} 脚本资源解析失败..`);
        }
      }
    }
    onLog('加载完毕');
    // 更新依赖
    uiStore.require = {
      ...require,
      ..._dep,
    };
  };
  // 加载依赖
  useEffect(() => {
    const deps = components.filter((i: any) => i.type === 3);
    if (deps.length > 0) {
      updateDepReq(deps);
    }
  }, [components]);
  // 保存
  const save = async () => {
    await new Promise((res) => setTimeout(res, 500));
    await onSave(currentFile);
  };
  // Ctrl + S
  const keyboardEvent = async (e) => {
    if (
      (e.key === 's' || e.key === 'S') &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      save();
    }
  };
  useEffect(() => {
    onChange();
    window.addEventListener('keydown', keyboardEvent);
    return () => {
      window.removeEventListener('keydown', keyboardEvent);
    };
  }, [components, require, currentFile]);
  return (
    <div className="cloud-component" style={style}>
      <div className="cloud-component-left">
        <Components
          {...{
            onAdd,
            activeTab,
          }}
        />
      </div>
      <div className="cloud-component-right">
        {currentFile.id === undefined ? (
          <img
            style={{ width: 200 }}
            className="cloud-component-right-empty"
            src="https://img.alicdn.com/imgextra/i1/O1CN01ypboF828fH2ScXohX_!!6000000007959-55-tps-40-40.svg"
          />
        ) : (
          <>
            <Main
              item={currentFile}
              key={currentFile.id}
              previewRender={previewRender}
            />
          </>
        )}
      </div>
    </div>
  );
};
/** 解析 React */
CloudComponent.parseReact = ({
  componentName,
  react = 'export default () => null',
  less = '{}',
  require = {},
}) => {
  return babelParse({
    require: {
      ...require,
      injectStyle,
    },
    code: `${react} \n;
     // 这里开始注入css样式
     require('injectStyle')('${componentName}', \`${less}\`);`,
  });
};
/** 解析 markdown */
CloudComponent.parseMarkdown = async (props: any) => {
  return () => {
    return <MarkdownViewer {...props} />;
  };
};
/** 组件渲染 */
CloudComponent.render = (Comp, root) => {
  ReactDOM.render(Comp, root);
};
export default CloudComponent;
