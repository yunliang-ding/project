/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { decode } from '@yl-d/shared';
import {
  Avatar,
  Dropdown,
  Empty,
  Menu,
  Space,
  ModalForm,
  Button,
} from '@yl-d/design';
import formSchema from './schema';
import { outLogin } from '@/services';
import { getList } from './services';
import userStore from '@/store/user';
import { IconMoon, IconPlus, IconSun } from '@yl-d/icon';
import Loading from '@/.theme/loading';
import { CodeEditor } from '@yl-d/code-editor';
import uiStore from '@/store/ui';
import './index.less';

const prefixCls = 'app-form-designer-dashboard';

export default () => {
  const { dark } = uiStore.useSnapshot();
  const IconMoonSun = dark ? IconSun : IconMoon;
  const { name, avatarUrl } = userStore.useSnapshot();
  const [data, setData]: any = useState([]);
  const [spin, setSpin] = useState(false);
  const query = async () => {
    setSpin(true);
    const {
      code,
      data: { data },
    } = await getList({
      pageNum: 1,
      pageSize: 9999,
    });
    setSpin(false);
    if (code === 200) {
      setData(data);
    }
    return data[0];
  };
  useEffect(() => {
    query();
  }, []);
  return spin ? (
    <Loading />
  ) : (
    <div className={prefixCls}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-title`}>
          <img src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/favicon.ico" />
          <h2>Crud-Model</h2>
        </div>
        <div className={`${prefixCls}-header-tools`}>
          <Button
            onClick={async () => {
              uiStore.dark = !dark;
            }}
            circle
            icon={<IconMoonSun />}
          />
          <Button
            circle
            icon={<IconPlus />}
            onClick={() => {
              ModalForm({
                ...formSchema({
                  onSearch: async () => {
                    await query();
                  },
                }),
              }).open();
            }}
          />
          <div className={`${prefixCls}-header-tools-item`}>
            <Avatar size={32}>
              <img alt="avatar" src={avatarUrl} />
            </Avatar>
            &nbsp; &nbsp;
            <Dropdown
              droplist={
                <Menu
                  menus={[
                    {
                      path: '1',
                      label: '切换用户',
                      onClick: () => {
                        outLogin;
                      },
                    },
                  ]}
                />
              }
            >
              <a>{name}</a>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={`${prefixCls}-body`}>
        {data.length === 0 ? (
          <Empty />
        ) : (
          data.map((item) => {
            return (
              <div key={item.id} className="yld-card">
                <div className="yld-card-head">
                  <div className="yld-card-head-title">{item.name}</div>
                  <div className="yld-card-head-extra">
                    <Space>
                      <a
                        onClick={() => {
                          window.open(
                            `/#/edit?id=${item.id}&type=${item.type}`,
                          );
                        }}
                      >
                        编辑
                      </a>
                      <a
                        onClick={() => {
                          window.open(
                            `/#/preview?schema=${item.pureSchema}&type=${item.type}`,
                          );
                        }}
                      >
                        预览
                      </a>
                    </Space>
                  </div>
                </div>
                <div className="yld-card-body">
                  <CodeEditor
                    value={decode(item.pureSchema)}
                    readOnly
                    minimapEnabled={false}
                  />
                </div>
                <div className="yld-card-footer">
                  <Space>
                    <span>更新时间</span>
                    <a>{item.updateTime}</a>
                  </Space>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
