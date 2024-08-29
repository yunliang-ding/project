import { useEffect, useRef } from 'react';
import { useBreadCrumb } from 'lyr';
import tableSchema from './schema-table';
import { Table, Form, Button } from '@yl-d/design';
import { getPlayList } from './services';
import userStore from '@/store/user';
import { IconRefresh } from '@yl-d/icon';

const Page = () => {
  const { userId, likeIds }: any = userStore.useSnapshot();
  const breadCrumb = useBreadCrumb();
  const tableRef: any = useRef({});
  const form = Form.useForm();
  const startPlay = (record: any) => {
    localStorage.setItem('musicId', record.id); // 处理 render 函数获取不到最新的 state 问题
    userStore.playMusic = record;
  };
  useEffect(() => {
    (async () => {
      const { code, playlist } = await getPlayList(userId);
      if (code === 200) {
        // 默认查询第一个
        const playId = playlist[0].id;
        tableRef.current.refresh({
          playId,
        });
        breadCrumb?.update({
          title: (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span>我的歌单列表</span>
              <Button
                onClick={() => {
                  tableRef.current.refresh({
                    playId: form.getValues?.().playId,
                  });
                }}
              >
                <IconRefresh />
              </Button>
            </div>
          ),
          extra: [
            <Form
              initialValues={{
                playId,
              }}
              form={form}
              schema={[
                {
                  type: 'Select',
                  name: 'playId',
                  label: '',
                  props: {
                    style: {
                      width: 200,
                    },
                    allowClear: false,
                    options: playlist?.map((i: any) => ({
                      ...i,
                      label: i.name,
                      value: i.id,
                    })) || [],
                    onChange(playId: number) {
                      tableRef.current.refresh({
                        playId,
                      });
                    },
                  },
                },
              ]}
            />,
          ],
        });
        return playlist.map((i: any) => ({
          ...i,
          label: i.name,
          value: i.id,
        }));
      } else {
        return [];
      }
    })();
  }, []);
  return (
    <Table
      tableRef={tableRef}
      {...tableSchema({
        startPlay,
        likeIds,
      })}
    />
  );
};

Page.auth = '/playlist/list'; // 路由鉴权

Page.keeplive = true; // 启用缓存

export default Page;