> 打造 React 全新状态管理库

## 单一组件使用

```jsx
import { useReactive } from '@yl-d/hooks';

export default () => {
  const state = useReactive({
    count: 0,
    age: 0,
    user: {
      baseInfo: {
        age: 0,
      },
    },
  });
  return (
    <>
      <div>
        count: {state.count}
        <button
          onClick={() => {
            state.count++;
          }}
        >
          +1
        </button>
      </div>
      <div>
        age: {state.user.baseInfo.age}
        <button
          onClick={() => {
            state.user.baseInfo.age++;
          }}
        >
          +1
        </button>
      </div>
    </>
  );
};
```

## 全局状态管理

```jsx
import { create } from '@yl-d/hooks';

export const store = create({
  count: 1,
  age: 1,
  addCount() {
    this.count++;
  },
});

export default () => {
  const { age } = store.useSnapshot();
  return (
    <div>
      {age}
      <button
        onClick={async () => {
          store.age += 1;
        }}
      >
        添加age
      </button>
    </div>
  );
};
```

## 实现原理

- 参看 [@yl-d/hooks](https://packages.yunliang.cloud#/hooks/create)
