import React from 'react';
import { CodeEditor } from '@yl-d/code-editor';
import Tabs from './tabs';
import store from '@/store';
import uiStore from '@/store/ui';

const Container = ({ item, previewRender }) => {
  const { selectedTab, require } = uiStore.useSnapshot();
  const codeRef1: any = React.useRef({});
  const codeRef2: any = React.useRef({});
  const codeRef3: any = React.useRef({});
  const { dark } = uiStore.useSnapshot();
  React.useEffect(() => {
    codeRef1.current.getMonacoInstance?.().then(() => {
      window.monaco?.editor.setTheme(dark ? 'vs-dark' : 'vs');
    });
  }, [dark]);
  return (
    <div className="cloud-component-right-body">
      <div
        style={{ display: selectedTab === 0 ? 'block' : 'none' }}
        className="cloud-component-right-body-react"
      >
        <CodeEditor
          mode="function"
          require={require}
          codeRef={codeRef1}
          value={item.react}
          onChange={(code: string) => {
            item.react = code;
            store.reactChange = item.originReact !== code;
          }}
        />
      </div>

      <div
        style={{
          display: selectedTab === 1 ? 'block' : 'none',
        }}
        className="cloud-component-right-body-less"
      >
        <CodeEditor
          mode="less"
          value={item.less}
          codeRef={codeRef2}
          onChange={(code) => {
            item.less = code;
          }}
        />
      </div>
      <div
        style={{
          display: selectedTab === 2 ? 'block' : 'none',
        }}
        className="cloud-component-right-body-props"
      >
        <CodeEditor
          mode="json"
          value={item.props}
          codeRef={codeRef3}
          onChange={() => {
            item.props = codeRef3.current.getJson2Object();
          }}
        />
      </div>
      {previewRender(item)}
    </div>
  );
};

export default (props) => {
  return (
    <>
      <Tabs {...props} />
      <Container {...props} />
    </>
  );
};
