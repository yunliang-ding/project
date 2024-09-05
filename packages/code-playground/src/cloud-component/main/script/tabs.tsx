import { IconClose } from '@yl-d/icon';
import uiStore from '@/store/ui';

export default () => {
  const { currentFile } = uiStore.useSnapshot();
  return (
    <div className="cloud-component-right-header">
      <div className="cloud-component-tabs">
        {[
          {
            icon: <i className="file-icon javascript-lang-file-icon" />,
            name: currentFile.componentName,
          },
        ].map((file) => {
          return (
            <div className="cloud-component-tabs-item-selected" key={file.name}>
              {file.icon}
              {file.name}
              <span
                className="close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  uiStore.currentFile = {};
                }}
              >
                <IconClose />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
