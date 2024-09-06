import { Notification, FormItemProps } from '@yl-d/design';
import { encode } from '@yl-d/shared';
import { add } from './services';

export default ({
  initialValues = {
    id: undefined,
    schema: undefined,
    type: 'form',
  },
  title = '创建模型',
  onSearch,
}) => {
  return {
    title,
    initialValues,
    confirmText: '创建',
    async onSubmit(values) {
      const { code } = await add({
        ...values,
        schema: encode('{}'),
        pureSchema: encode('{}'),
      });
      if (code === 200) {
        Notification.success({
          title: '提示',
          content: '创建成功',
        });
        onSearch();
      } else {
        return Promise.reject();
      }
      return true;
    },
    schema: [
      {
        type: 'Input',
        name: 'name',
        label: '模型名称',
        required: true,
      },
      {
        type: "RadioGroup",
        name: 'type',
        label: '设计器',
        disabled: initialValues.schema,
        props: {
          options: [
            {
              label: '表单',
              value: 'form',
            },
            {
              label: '数据表格',
              value: 'table',
            },
          ],
        },
      },
    ] as FormItemProps[],
  };
};
