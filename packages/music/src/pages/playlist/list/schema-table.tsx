import { like } from '@/pages/recommend/list/services';
import { openMp4Modal, parseImagePath } from '@/util';
import { Message } from '@yl-d/design';
import {
  IconDownload,
  IconHeart,
  IconHeartFill,
  IconLock,
  IconPlayArrow,
  IconSound,
  IconStar,
  IconVideoCamera,
} from '@yl-d/icon';
import { getList } from './services';

const tableSchema = ({ startPlay, likeIds }): any => ({
  paginationConfig: false,
  useRefresh: false,
  useFilter: false,
  scroll: {
    y: 'calc(-186px + 100vh)',
  },
  columns: [
    {
      title: '',
      dataIndex: 'no',
      width: 80,
      render(value, record, index) {
        return index + 1;
      },
    },
    {
      title: '播放',
      dataIndex: 'play',
      width: 100,
      render: (e: any, record: any) => {
        const playing = localStorage.getItem('musicId') === String(record.id);
        return playing ? (
          <IconSound
            style={{
              cursor: 'pointer',
              color: 'var(--primary-color)',
            }}
            onClick={() => {
              startPlay(record);
            }}
          />
        ) : (
          <IconPlayArrow
            style={{
              cursor: 'pointer',
              color: 'var(--primary-color)',
            }}
            onClick={() => {
              startPlay(record);
            }}
          />
        );
      },
    },
    {
      title: '',
      dataIndex: 'picUrl',
      width: 50,
      render: (picUrl: any) => {
        return (
          <img
            src={`${parseImagePath(picUrl)}?param=30y30`}
            style={{
              borderRadius: 4,
              width: 30,
              height: 30,
            }}
          />
        );
      },
    },
    {
      title: '音乐标题',
      dataIndex: 'name',
      render(name, { fee }) {
        return (
          <div
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {fee === 1 && (
              <IconLock style={{ color: 'var(--primary-color)', marginRight: 10 }} />
            )}
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      title: '歌手',
      dataIndex: 'arName',
    },
    {
      title: '专辑',
      dataIndex: 'alName',
    },
    {
      title: '时长',
      dataIndex: 'dt',
      key: 'dt',
      width: 140,
      render: (dt) => {
        return (
          <div>
            {Math.floor(dt / 1000 / 60)
              .toString()
              .padStart(2, '0')}
            :
            {Math.floor((dt / 1000) % 60)
              .toString()
              .padStart(2, '0')}
          </div>
        );
      },
    },
  ],
  rowOperations: {
    title: '操作',
    width: 160,
    menus({ record }) {
      return [
        {
          key: 'liked',
          label: likeIds.includes(record.id) ? (
            <IconHeartFill />
          ) : (
            <IconHeart
              onClick={async () => {
                const { code } = await like(record.id);
                if (code === 200) {
                  Message.success('已添加到喜欢');
                }
              }}
            />
          ),
        },
        {
          key: 'shoucang',
          label: <IconStar />,
        },
        {
          key: 'xiazai1',
          label: <IconDownload />,
        },
        {
          key: 'mv',
          disabled: record.mv === 0,
          onClick: async () => {
            openMp4Modal(record.mv, record.name);
          },
          label: <IconVideoCamera />,
        },
      ];
    },
  },
  request: async ({ playId }) => {
    if (playId === undefined) {
      return {
        success: true,
        data: [],
        total: 0,
      };
    }
    const res = await getList(playId);
    return {
      success: res.code === 200,
      total: res.songs.length,
      data: res.songs.map((i) => ({
        ...i,
        alName: i.al.name,
        arName: i.ar.map((i1) => i1.name).join('、'),
        picUrl: i.al.picUrl,
      })),
    };
  },
});

export default tableSchema;