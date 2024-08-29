import { useEffect, useRef } from 'react';
import { useBreadCrumb } from 'lyr';
import tableSchema from './schema-table';
import userStore from '@/store/user';
import { DatePicker, Table, Button } from '@yl-d/design';
import { IconRefresh } from '@yl-d/icon';

const Page = () => {
  const { userId, likeIds } = userStore.useSnapshot();
  const breadCrumb = useBreadCrumb();
  const tableRef: any = useRef<any>({});
  const startPlay = (record: any) => {
    localStorage.setItem('musicId', record.id); // 处理 render 函数获取不到最新的 state 问题
    userStore.playMusic = record;
  };
  useEffect(() => {
    breadCrumb?.update({
      title: (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span>我的推荐列表</span>
          <Button
            onClick={() => {
              tableRef.current.refresh();
            }}
          >
            <IconRefresh />
          </Button>
        </div>
      ),
      extra: (
        <div className="history-data-picker">
          <DatePicker
            placeholder="历史日推歌曲"
            onChange={(date) => {
              tableRef.current.refresh({
                date,
              });
            }}
          />
        </div>
      ),
    } as any);
  }, []);
  return (
    <Table
      tableRef={tableRef}
      {...tableSchema({
        startPlay,
        uid: userId,
        likeIds,
      })}
    />
  );
};

Page.auth = '/recommend/list'; // 路由鉴权

Page.keeplive = true; // 启用缓存

export default Page;
