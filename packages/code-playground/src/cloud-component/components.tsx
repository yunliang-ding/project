/* eslint-disable require-atomic-updates */
/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { isEmpty } from '@yl-d/shared';
import { IconRender } from './main';
import { Message, ModalForm } from '@yl-d/design';
import uiStore from '@/store/ui';

const reactStr = `import { Button } from '@yl-d/design';

export default (props) => {
  return <div className="{componentName}">
    <Button type='primary'>{props.name}</Button>
  </div>
}
 `;

const markdownStr = `# 标题

## 小标题

- 描述1
- 描述2
- 描述3

`;

const jsStr = `window.sum = (a, b) => {
  return a + b
}`;

const lessStr = `.{componentName}{
  padding: 10px;
}`;

export default ({ onAdd, activeTab }) => {
  const { components, currentFile } = uiStore.useSnapshot();
  const validatorName = (name: string) => {
    if (/\s+/.test(name)) {
      Message.error('文件名称不能包含空格');
      return false;
    } else if (/[\u4E00-\u9FA5]/.test(name)) {
      Message.error('文件名称不能有中文');
      return false;
    } else if (!/^[^0-9].*/.test(name)) {
      Message.error('文件名称不能以数字开头');
      return false;
    } else if (
      components.some(
        (item: any) => item.componentName === name && !isEmpty(name),
      )
    ) {
      Message.error('文件已存在');
      return false;
    }
    return true;
  };
  /** 新增组件 */
  const addComponent = async (componentName: string, type: number) => {
    const item: any = {};
    if (!isEmpty(componentName)) {
      item.componentName = componentName;
      item.type = type;
      if (type === 1) {
        item.react = reactStr.replaceAll('{componentName}', componentName);
      } else if (type === 2) {
        item.react = markdownStr;
      } else if (type === 3) {
        item.react = jsStr.replaceAll('{componentName}', componentName);
      }
      item.less = lessStr.replaceAll('{componentName}', componentName);
      item.props = {
        name: componentName,
      };
      try {
        item.id = await onAdd(item); // 获取id
        if (item.id === undefined) {
          Message.error('文件保存失败');
        } else {
          uiStore.selectedTab = 0; // 默认选中
          uiStore.components = [item, ...components]; // update
          uiStore.currentFile = item; // 自动选中到新增的这条
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="cloud-component-left-header">
        <span>我的{['组件', '文档', '脚本'][activeTab - 1]}</span>
        <i
          className="codicon codicon-new-file"
          title="新建文件"
          style={{
            marginRight: 10,
          }}
          onClick={() => {
            ModalForm({
              title: '添加组件',
              style: {
                height: 340,
              },
              initialValues: {
                type: activeTab,
              },
              schema: [
                {
                  type: 'RadioGroup',
                  name: 'type',
                  disabled: true,
                  props: {
                    options: [
                      {
                        label: 'react 组件',
                        value: 1,
                      },
                      {
                        label: 'markdown 文件',
                        value: 2,
                      },
                      {
                        label: 'dependencies 依赖文件',
                        value: 3,
                      },
                    ],
                  },
                },
                {
                  type: 'Select',
                  label: '依赖文件类型',
                  name: 'depType',
                  required: true,
                  visible({ getValues }) {
                    return getValues().type === 3;
                  },
                  props: {
                    options: [
                      {
                        label: 'js 函数',
                        value: '.js',
                      },
                      {
                        label: 'react 组件',
                        value: '.tsx',
                      },
                      {
                        label: 'less 样式',
                        value: '.less',
                      },
                    ],
                  },
                },
                {
                  type: 'Input',
                  name: 'name',
                  label: '名称',
                  required: true,
                },
              ],
              async onSubmit(values) {
                let { type, name, depType } = values;
                if (type === 2) {
                  name += '.md';
                }
                if (type === 3) {
                  name += depType;
                }
                if (!validatorName(name)) {
                  return Promise.reject();
                }
                await addComponent(name, type);
              },
            }).open();
          }}
        />
      </div>
      <div className="cloud-component-left-body">
        {components
          .filter((i: any) => i.type === activeTab)
          .map((item: any) => {
            return (
              <div
                key={item.componentName}
                className={
                  item.id === currentFile.id
                    ? 'cloud-component-left-body-item-selected'
                    : 'cloud-component-left-body-item'
                }
              >
                <span style={{ marginRight: 4, display: 'flex' }}>
                  <IconRender componentName={item.componentName} />
                </span>
                <span style={{ position: 'relative' }}>
                  <div
                    style={{ width: 180 }}
                    onClick={async () => {
                      uiStore.currentFile = item;
                      uiStore.selectedTab = 0;
                    }}
                  >
                    {item.componentName}
                  </div>
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
};
