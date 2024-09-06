import { Empty, Input } from '@yl-d/design';
import { IconLaunch, IconRefresh } from '@yl-d/icon';
import uiStore from '@/store/ui';
import { useEffect, useRef } from 'react';
import { sleep } from '..';

export default () => {
  const { currentFile } = uiStore.useSnapshot();
  uiStore.iframeRef = useRef({});
  useEffect(() => {
    uiStore.iframeRef.current?.contentWindow?.location?.reload?.();
  }, [currentFile]);
  let url = '';
  if (currentFile) {
    (document as any).title = `${currentFile.componentName}-PlayGround`;
    url = `${location.origin}${location.pathname}#/preview?id=${currentFile.id}`;
    if (currentFile) {
      history.pushState({}, '', `${location.pathname}#/?id=${currentFile.id}`);
    }
  }
  return (
    <div className="code-playground-preview">
      {currentFile.id && currentFile.type !== 3 ? (
        <>
          <div className="preview-address">
            <IconRefresh
              hover
              onClick={() => {
                uiStore.iframeRef.current.contentWindow.location.reload();
              }}
            />
            <Input value={url} disabled />
            <IconLaunch
              hover
              onClick={() => {
                window.open(url);
              }}
            />
          </div>
          <iframe
            ref={uiStore.iframeRef}
            style={{ width: '100%', height: '100%', border: 'none' }}
            src={url}
            onLoad={async () => {
              await sleep();
            }}
          />
        </>
      ) : (
        <Empty label="暂不支持预览" />
      )}
    </div>
  );
};
