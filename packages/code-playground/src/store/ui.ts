import { create } from '@yl-d/hooks';

export default create<{
  dark: boolean;
  currentFile: any; // 当前选中的
  components: any; // 所有文件
  activeTab: number;
  iframeRef: any;
  fullScreen: boolean;
  require: any; // 依赖脚本
  selectedTab: number;
}>({
  dark: true,
  fullScreen: false,
  currentFile: {},
  components: [],
  selectedTab: 0,
  activeTab: 1,
  iframeRef: {},
  require: {
    '@yl-d/design': window.yldDesign,
    '@yl-d/icon': window.yldIcon,
  },
});
