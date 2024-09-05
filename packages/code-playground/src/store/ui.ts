import { create } from '@yl-d/hooks';

export default create<{
  dark: boolean;
  currentFile: any
  components: any;
  dependencies: any;
  activeTab: number
  iframeRef: any;
}>({
  dark: false,
  currentFile: undefined,
  components: [],
  dependencies: {},
  activeTab: 1,
  iframeRef: {},
});
