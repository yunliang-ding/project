import { useEffect, useRef, useState } from 'react';
import { Spin } from '@yl-d/design';
import './index.less';

export default ({ stepRef = useRef({}) }: any) => {
  const [logs, setLogs]: any = useState(['资源加载中..']);
  const updateLogs = async (log: string) => {
    logs.push(log);
    setLogs([...logs]);
  };
  useEffect(() => {
    stepRef.current.updateLogs = updateLogs;
  }, []);
  return (
    <div className="app-step-logs">
      <pre>
        <Spin loading style={{ top: 20 }} />
        {logs.reverse().map((log: any) => {
          return (
            <p
              key={log}
              style={{
                color: log.includes('失败')
                  ? '#e54e50'
                  : log.includes('成功')
                  ? '#4b9626'
                  : '#888',
              }}
            >
              {log}
            </p>
          );
        })}
      </pre>
    </div>
  );
};
