> 开发日志

```tsx | pureReact
import { Space, Timeline, Spin } from '@yl-d/design';
import { IconCheckCircleFill, IconExclamationCircleFill } from '@yl-d/icon';
import axios from 'axios';

export default () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios
      .post('https://api-online.yunliang.cloud/task/list', {
        userId: 2,
        pageSize: 100,
      })
      .then((res) => {
        setData(res.data.data.data);
      });
  }, []);
  return data.length === 0 ? (
    <Spin />
  ) : (
    <Timeline
      items={data.map((item) => {
        return {
          key: item,
          dot:
            item.status === 3 ? (
              <IconCheckCircleFill
                style={{
                  fontSize: 14,
                  color: '#00b42a',
                }}
              />
            ) : (
              <IconExclamationCircleFill
                style={{
                  fontSize: 14,
                  color: '#39a9f4',
                }}
              />
            ),
          title: (
            <div style={{ marginLeft: 10 }}>
              <div>{item.content}</div>
              <div style={{ fontSize: 10, marginTop: 10, opacity: 0.6 }}>
                {item.endDate.substring(0, 10)}
              </div>
            </div>
          ),
        };
      })}
    />
  );
};
```
