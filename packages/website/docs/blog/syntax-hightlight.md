## 基本配置

```ts
export default {
  height: value.split('\n').length * 18, // 计算高度
  minimap: {
    enabled: false, // 不展示小地图
  },
  scrollBeyondLastLine: false, // 高度撑满
  contextmenu: false, // 不展示右键菜单
  folding: false, // 不提供代码折叠
  lineNumbers: 'off', // 不设置行号
  hover: {
    enabled: false, // 移除hover提示
  },
  scrollbar: {
    handleMouseWheel: false, // 不添加 wheel事件，否则会导致不会随着鼠标滑动无效
  },
  readOnly: true, // 只读模式
};
```

## 修改部分样式

> 不展示链接线、选中行样式、光标样式、readonly 的悬浮提示

```less
.monaco-editor-syntax-highlight {
  .decorationsOverviewRuler,
  .current-line,
  .core-guide,
  .monaco-editor-overlaymessage,
  .cursor.monaco-mouse-cursor-text {
    display: none !important;
  }
}
```

## demo 查看

- 参看 [@yl-d/code-editor](https://packages.yunliang.cloud/#/code-editor)
