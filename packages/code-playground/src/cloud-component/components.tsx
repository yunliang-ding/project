/* eslint-disable require-atomic-updates */
/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { isEmpty } from '@yl-d/shared';
import { IconRender } from './main';
import { Message, ModalForm } from '@yl-d/design';

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

const lessStr = `.{componentName}{
  padding: 10px;
}`;

export default ({ component, setComponent, onAdd, activeTab }) => {
  const addComponent = async (componentName: string) => {
    const item: any = {};
    if (!isEmpty(componentName)) {
      item.componentName = componentName;
      if (componentName.endsWith('.md')) {
        item.react = markdownStr;
      } else {
        item.react = reactStr.replaceAll('{componentName}', componentName);
      }
      item.less = lessStr.replaceAll('{componentName}', componentName);
      item.props = {
        name: componentName,
      };
      // 自动选中到新增的这条
      component.forEach((i) => {
        i.selected = false;
        i.open = false; // 兼容bug, 改成单开模式
      });
      item.selected = true;
      item.open = true;
      try {
        item.id = await onAdd(item); // 获取id
        if (item.id === undefined) {
          Message.error('文件保存失败');
        } else {
          item.selectedTab = 'index.tsx'; // 默认选中 js
        }
      } catch (error) {
        console.log(error);
      }
      return item;
    }
  };
  return (
    <>
      <div
        className="cloud-component-left-header"
        style={{ display: activeTab === 1 ? 'flex' : 'none' }}
      >
        <span>我的组件列表</span>
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
                height: 280,
              },
              initialValues: {
                type: 1,
              },
              schema: [
                {
                  type: 'RadioGroup',
                  name: 'type',
                  props: {
                    options: [
                      {
                        label: 'markdown 文件',
                        value: 0,
                      },
                      {
                        label: 'react 组件',
                        value: 1,
                      },
                    ],
                  },
                },
                {
                  type: 'Input',
                  name: 'name',
                  label: '组件名',
                  required: true,
                  // rules: [
                  //   {
                  //     async validator(value, callback) {
                  //       if (/\s+/.test(value)) {
                  //         callback('文件名称不能包含空格');
                  //       } else if (/[\u4E00-\u9FA5]/.test(value)) {
                  //         callback('文件名称不能有中文');
                  //       } else if (/^\d+$/.test(value)) {
                  //         callback('文件名称不能以数字开头');
                  //       } else if (
                  //         component.some(
                  //           (item) =>
                  //             item.componentName === value && !isEmpty(value),
                  //         )
                  //       ) {
                  //         callback('文件已存在');
                  //       } else {
                  //         Promise.resolve();
                  //       }
                  //     },
                  //   },
                  // ],
                },
              ],
              async onSubmit(values) {
                let { type, name } = values;
                if (type === 0) {
                  name += '.md';
                }
                const item = await addComponent(name);
                setComponent([item, ...component]);
              },
            }).open();
          }}
        />
      </div>
      <div
        className="cloud-component-left-body"
        style={{ display: activeTab === 1 ? 'block' : 'none' }}
      >
        {component.map((item: any) => {
          return (
            <div
              key={item.componentName}
              className={
                item.selected
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
                    setComponent(
                      component.map((i: any) => {
                        return {
                          ...i,
                          open: i.componentName === item.componentName, // 兼容bug, 改成单开模式
                          selected: i.componentName === item.componentName,
                        };
                      }),
                    );
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
