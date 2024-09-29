import { Modal, Table } from '@yl-d/design';
import {
  IconDownload,
  IconPlayArrow,
  IconSound,
  IconVideoCamera,
} from '@yl-d/icon';
import { queryOss } from './services';
import userStore from '@/store/user';
import './index.less';

const Page = () => {
  const startPlay = (record: any) => {
    localStorage.setItem('musicId', record.id); // 处理 render 函数获取不到最新的 state 问题
    userStore.playMusic = record;
  };
  return (
    <Table
      {...{
        useRefresh: false,
        useFilter: false,
        pagination: false,
        scroll: {
          y: 'calc(-186px + 100vh)',
        },
        columns: [
          {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
          },
          {
            title: '播放',
            dataIndex: 'play',
            width: 100,
            render: (e: any, record: any) => {
              const playing =
                localStorage.getItem('musicId') === String(record.id);
              return playing ? (
                <IconSound
                  style={{
                    cursor: 'pointer',
                    color: 'var(--primary-color)',
                  }}
                  onClick={() => {
                    startPlay({
                      name: record.title,
                      ksUrl: record.url,
                    });
                  }}
                />
              ) : (
                <IconPlayArrow
                  style={{
                    cursor: 'pointer',
                    color: 'var(--primary-color)',
                  }}
                  onClick={() => {
                    startPlay({
                      name: record.title,
                      ksUrl: record.url,
                    });
                  }}
                />
              );
            },
          },
          {
            title: '音乐标题',
            dataIndex: 'title',
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
          },
        ],
        rowOperations: {
          title: '操作',
          width: 100,
          menus({ record }) {
            return [
              {
                key: 'xiazai1',
                label: <IconDownload />,
              },
              {
                key: 'mv',
                onClick: async () => {
                  Modal({
                    title: record.title,
                    footer: false,
                    render() {
                      return (
                        <video
                          controls
                          src={record.url}
                          autoPlay
                          style={{ width: 565, height: 300 }}
                        />
                      );
                    },
                  }).open();
                },
                label: <IconVideoCamera />,
              },
            ];
          },
        },
        request: async () => {
          const { data: res } = await queryOss();
          console.log(res);
          return {
            success: res.code === 200,
            total: res.data.length,
            data: res.data,
          };
        },
      }}
    />
  );
};

Page.auth = '/search/oss'; // 路由鉴权

Page.keeplive = true; // 启用缓存

export default Page;
