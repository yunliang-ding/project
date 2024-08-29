> 在 Form.Item 属性上扩展了 effect 属性，来决定该组件的副作用，在 Form 的 onChange 事件中来发布通知

## 基本显示隐藏的联动

```jsx
import { Form } from '@yl-d/design';

export default () => {
  return (
    <Form
      schema={[
        {
          type: 'RadioGroup',
          name: 'sex',
          label: '性别',
          // 通知刷新并清空
          notifiRender: [
            {
              name: 'age',
              clear: true,
            },
          ],
          props: {
            options: [
              {
                label: '男',
                value: 0,
              },
              {
                label: '女',
                value: 1,
              },
            ],
          },
        },
        {
          type: 'InputNumber',
          name: 'age',
          label: '年龄',
          visible({ getValues }) {
            return getValues().sex === 0;
          },
          props: {
            style: {
              width: 180,
            },
          },
        },
      ]}
    />
  );
};
```

## 基本的属性切换

```jsx
mport { Form } from '@yl-d/design';

export default () => {
  return (
    <Form
      style={{
        width: 300,
      }}
      initialValues={{
        type: 2,
      }}
      schema={(form) => [
        {
          type: 'RadioGroup',
          label: '类型',
          name: 'type',
          props: {
            type: 'button',
            options: [
              {
                label: '类型 A',
                value: 1,
              },
              {
                label: '类型 B',
                value: 2,
              },
            ],
            onChange(value) {
              form.mergeItemByName('age', {
                props: {
                  addonBefore: value === 1 ? '类型 A' : '类型 B',
                },
              });
            },
          },
        },
        {
          type: 'Input',
          label: '年龄',
          name: 'age',
          props: {
            addonBefore: form.getValues()?.type === 1 ? '类型 A' : '类型 B',
          },
        },
      ]}
    />
  );
};
```

## 实现原理

- 具体源码和 Demo 参看 [Form](https://packages.yunliang.cloud#/design/data-entry/form)
