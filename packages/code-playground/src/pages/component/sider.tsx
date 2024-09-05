import { Avatar, Button } from '@yl-d/design';
import uiStore from '@/store/ui';
import { IconCodeBlock, IconDriveFile, IconMoon, IconSun } from '@yl-d/icon';
import userStore from '@/store/user';

export default () => {
  const { dark, activeTab } = uiStore.useSnapshot();
  const { avatarUrl } = userStore.useSnapshot();
  const IconMoonSun = dark ? IconSun : IconMoon;
  return (
    <div className="code-playground-sider">
      <IconDriveFile
        style={{
          marginTop: 10,
          color: activeTab === 1 ? '#fff' : '#aaa',
          fontSize: 22,
          cursor: 'pointer',
        }}
        onClick={async () => {
          uiStore.activeTab = 1;
        }}
      />
      <IconCodeBlock
        style={{
          color: activeTab === 2 ? '#fff' : '#aaa',
          fontSize: 22,
          cursor: 'pointer',
        }}
        onClick={async () => {
          uiStore.activeTab = 2;
        }}
      />
      <div className="code-playground-sider-footer">
        <Avatar size={30}>
          <img alt="avatar" src={avatarUrl} />
        </Avatar>
        <Button
          style={{
            marginTop: 20,
            background: '#3f3f3f',
          }}
          onClick={async () => {
            uiStore.dark = !dark;
          }}
          circle
          icon={<IconMoonSun style={{ color: '#aaa' }} />}
        />
      </div>
    </div>
  );
};
