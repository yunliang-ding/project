import { useEffect, useRef } from 'react';
import { useBreadCrumb } from 'lyr';
import tableSchema from './schema-table';
import { Table, Input } from '@yl-d/design';
import userStore from '@/store/user';
import { IconSearch } from '@yl-d/icon';
import { start } from '@/pages/recommend/list';

const Page = () => {
  const tableRef: any = useRef({});
  const { userId, likeIds, playing } = userStore.useSnapshot();
  const breadCrumb = useBreadCrumb();
  useEffect(() => {
    breadCrumb?.update({
      extra: (
        <Input
          placeholder="请输入关键字查询"
          style={{ width: 300 }}
          prefix={<IconSearch />}
          onPressEnter={(e) => {
            tableRef.current.refresh({
              keyword: e.target.value,
            });
          }}
        />
      ),
    } as any);
  }, []);
  return (
    <Table
      tableRef={tableRef}
      {...tableSchema({
        start,
        suspended: () => {
          userStore.playing = false;
        },
        uid: userId,
        likeIds,
        playing,
      })}
    />
  );
};

Page.auth = '/recommend/list'; // 路由鉴权

Page.keepAlive = true; // 启用缓存

export default Page;
