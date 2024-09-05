import { CodeEditor } from '@yl-d/code-editor';
import uiStore from '@/store/ui';
import Tabs from './tabs';
import React from 'react';

const Container = ({ item }) => {
  const codeRef: any = React.useRef({});
  const { dark } = uiStore.useSnapshot();
  React.useEffect(() => {
    codeRef.current.getMonacoInstance?.().then(() => {
      window.monaco?.editor.setTheme(dark ? 'vs-dark' : 'vs');
    });
  }, [dark]);
  return (
    <div
      className="cloud-component-right-body"
      style={{
        display: item.selected ? 'flex' : 'none',
      }}
    >
      <div className="cloud-component-right-body-react">
        <CodeEditor
          codeRef={codeRef}
          value={item.react}
          minimapEnabled={false}
          onChange={(code: string) => {
            item.react = code;
          }}
        />
      </div>
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