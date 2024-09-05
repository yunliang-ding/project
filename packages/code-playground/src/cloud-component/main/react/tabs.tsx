import { IconClose } from '@yl-d/icon';
import store from '@/store';

export default ({
  component,
  setComponent,
  selectedTab,
  setSelectedTab,
  extra,
}) => {
  const { reactChange } = store.useSnapshot();
  return (
    <div className="cloud-component-right-header">
      <div className="cloud-component-tabs">
        {component.map((item: any) => {
          return (
            item.open &&
            [
              {
                icon: <i className="file-icon javascriptreact-lang-file-icon" />,
                name: 'index.tsx',
                content: item.react,
                change: reactChange,
              },
              {
                icon: <i className="file-icon less-lang-file-icon" />,
                name: 'index.less',
                content: item.less,
              },
              {
                icon: <i className="file-icon json-lang-file-icon" />,
                name: 'props.json',
                content: item.meta,
              },
            ].map((file) => {
              return (
                <div
                  onClick={() => {
                    setSelectedTab(file.name);
                  }}
                  className={
                    selectedTab === file.name
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
                      item.open = false;
                      item.selected = false;
                      setComponent([...component]);
                    }}
                  >
                    <IconClose hover/>
                  </span>
                </div>
              );
            })
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>{extra}</div>
    </div>
  );
};
