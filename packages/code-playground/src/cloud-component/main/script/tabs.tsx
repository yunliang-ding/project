import { IconClose } from '@yl-d/icon';
import uiStore from '@/store/ui';
import { IconRender } from '..';

export default () => {
  const { currentFile } = uiStore.useSnapshot();
  return (
    <div className="cloud-component-right-header">
      <div className="cloud-component-tabs">
        {[
          {
            name: currentFile.componentName,
          },
        ].map((file) => {
          return (
            <div className="cloud-component-tabs-item-selected" key={file.name}>
              <IconRender componentName={file.name} />
              {file.name}
              <span
                className="close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  uiStore.currentFile = {};
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
