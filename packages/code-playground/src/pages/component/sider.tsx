import { Avatar, Button } from '@yl-d/design';
import uiStore from '@/store/ui';
import {
  IconFullscreen,
  IconFullscreenExit,
  IconMoon,
  IconSun,
} from '@yl-d/icon';
import userStore from '@/store/user';
import { useFullscreen } from '@yl-d/hooks';

export default ({ rootRef }) => {
  const { dark, activeTab, fullScreen } = uiStore.useSnapshot();
  const { avatarUrl } = userStore.useSnapshot();
  const IconMoonSun = dark ? IconSun : IconMoon;
  const IconFullscreenAndExit = fullScreen
    ? IconFullscreenExit
    : IconFullscreen;
  const [, { toggleFullscreen }] = useFullscreen(rootRef);
  return (
    <div className="code-playground-sider">
      <div
        className="code-playground-sider-line"
        style={{
          top: (activeTab - 1) * 50,
        }}
      />
      <i
        className="file-icon javascriptreact-lang-file-icon"
        style={{
          fontSize: 22,
          cursor: 'pointer',
        }}
        onClick={async () => {
          uiStore.activeTab = 1;
        }}
      />
      <i
        className="file-icon markdown-lang-file-icon"
        style={{
          fontSize: 22,
          cursor: 'pointer',
        }}
        onClick={async () => {
          uiStore.activeTab = 2;
        }}
      />
      <i
        className="file-icon javascript-lang-file-icon"
        style={{
          fontSize: 22,
          cursor: 'pointer',
        }}
        onClick={async () => {
          uiStore.activeTab = 3;
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
            toggleFullscreen();
            uiStore.fullScreen = !fullScreen;
          }}
          circle
          icon={<IconFullscreenAndExit style={{ color: '#aaa' }} />}
        />
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
