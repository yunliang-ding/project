import { IconClose } from '@yl-d/icon';
import store from '@/store';
import uiStore from '@/store/ui';

export default () => {
  const { currentFile } = uiStore.useSnapshot();
  const { reactChange } = store.useSnapshot();
  return (
    <div className="cloud-component-right-header">
      <div className="cloud-component-tabs">
        {[
          {
            icon: <i className="file-icon javascriptreact-lang-file-icon" />,
            content: currentFile.react,
            change: reactChange,
            name: 'index.tsx',
          },
          {
            icon: <i className="file-icon less-lang-file-icon" />,
            content: currentFile.less,
            name: 'index.less',
          },
          {
            icon: <i className="file-icon json-lang-file-icon" />,
            content: currentFile.meta,
            name: 'props.json',
          },
        ].map((file, index) => {
          return (
            <div
              onClick={() => {
                uiStore.selectedTab = index;
              }}
              className={
                uiStore.selectedTab === index
                  ? 'cloud-component-tabs-item-selected'
                  : 'cloud-component-tabs-item'
              }
              key={file.name}
            >
              {file.icon}
              {file.name}
              {file.change && (
                <svg viewBox="0 0 1024 1024" width="20" height="20">
                  <path
                    d="M512 298.666667c117.333333 0 213.333333 96 213.333333 213.333333s-96 213.333333-213.333333 213.333333-213.333333-96-213.333333-213.333333S394.666667 298.666667 512 298.666667z"
                    fill="#e6e6e6"
                  ></path>
                </svg>
              )}
              <span
                className="close-icon"
                onClick={(e) => {
                  if (reactChange) {
                    const res = confirm('当前文件未保存，是否确认关闭?');
                    if (!res) {
                      return;
                    }
                  }
                  e.stopPropagation();
                  uiStore.currentFile  = {}
                }}
              >
                <IconClose hover />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
