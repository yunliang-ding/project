import { useEffect, useRef } from 'react';
import { useBreadCrumb } from 'lyr';
import tableSchema from './schema-table';
import { Table, Input } from '@yl-d/design';
import userStore from '@/store/user';
import { IconSearch } from '@yl-d/icon';

const Page = () => {
  const tableRef: any = useRef({});
  const { userId, likeIds } = userStore.useSnapshot();
  const breadCrumb = useBreadCrumb();
  const startPlay = (record: any) => {
    localStorage.setItem('musicId', record.id); // 处理 render 函数获取不到最新的 state 问题
    userStore.playMusic = record;
  };
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
