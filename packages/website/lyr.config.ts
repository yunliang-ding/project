import { defineConfig } from 'lyr';

export default defineConfig({
  title: '我的主页',
  favicon:
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/user-logo.png',
  link: [
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/monaco-file-icon.css',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/design.min.css',
  ],
  devScript: [
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-markdown.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.development.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.development.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/router.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router-dom.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/axios.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/icon.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/design.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/code-editor.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/shared.min.js',
  ],
  buildScript: [
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-markdown.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.production.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.production.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/router.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router-dom.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/axios.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/icon.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/design.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/code-editor.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/@yl-d/shared.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/track.min.js',
  ],
  docsRequire: {
    axios: 'axios',
    LyrCodeEditor: '@yl-d/code-editor',
    lyrDesign: '@yl-d/design',
    lyricon: '@yl-d/icon',
  },
  serverPath: '/apis',
  menus: [
    {
      label: '介绍',
      path: '/',
    },
    {
      label: 'Blog',
      path: '/blog',
      children: [
        {
          label: 'Drawer 扩展',
          path: '/blog/drawer',
        },
        {
          label: 'Form 扩展',
          path: '/blog/form',
        },
        {
          label: 'Button 扩展',
          path: '/blog/button',
        },
        {
          label: 'React 状态管理',
          path: '/blog/state',
        },
        {
          label: 'Snippets',
          path: '/blog/snippets',
        },
        {
          label: 'monaco 使用 vscode 主题',
          path: '/blog/monaco-theme',
        },
        {
          label: '使用 fetch 分块读取内容',
          path: '/blog/fetch',
        },
        {
          label: '字符串代码',
          path: '/blog/babel-parse',
        },
        {
          label: '基于monaco的语法高亮',
          path: '/blog/syntax-hightlight',
        },
      ],
    },
    {
      label: '面试相关',
      path: '/interview',
      children: [
        {
          label: '大文件上传',
          path: '/interview/upload',
        },
        {
          label: '下载文件',
          path: '/interview/download',
        },
      ],
    },
    {
      label: '基础算法题',
      path: '/algorithm',
      children: [
        {
          label: '二分查找',
          path: '/algorithm/binary-search',
        },
      ],
    },
    {
      label: '相关模版',
      path: '/template',
      children: [
        {
          label: 'float-ui',
          path: '/template/float-ui',
        },
      ],
    },
    {
      label: '开发日志',
      path: '/log',
    },
  ],
});
