import { checkQrCodeLogin, emailLogin, getQrCodeBase64 } from '@/services';
import { Button, Form, Tabs } from '@yl-d/design';
import { IconMusic, IconUser } from '@yl-d/icon';
import React, { useEffect, useState } from 'react';
import './index.less';

export default () => {
  return (
    <div className="app-login">
      <div className="app-login-wrap">
        <h2>
          <IconMusic
            style={{
              position: 'relative',
              fontSize: 26,
              color: 'var(--primary-color)',
            }}
          />
          我的云音乐
        </h2>
        <Tabs
          tabs={[
            {
              key: '1',
              label: '邮箱登录',
              content: <Email />,
            },
            {
              key: '2',
              label: '二维码登录',
              content: <QRCode />,
            },
          ]}
        />
      </div>
    </div>
  );
};

const QRCode = () => {
  let timer: any = null;
  const [spin, setSpin]: any = useState(true);
  const [base64, setBase64]: any = useState();
  const [code, setCode]: any = useState(801);
  const queryQrCode = async () => {
    const { data, unikey, ...rest }: any = await getQrCodeBase64();
    if (rest.code === 200) {
      setSpin(false);
      setBase64(data.qrimg);
      checkLogin(unikey);
    }
  };
  // 轮训检查
  const checkLogin = async (unikey: string) => {
    timer = setTimeout(async () => {
      const { cookie, ...rest }: any = await checkQrCodeLogin(unikey);
      setCode(rest.code);
      if (rest.code === 803) {
        localStorage.setItem('user.cookie', cookie);
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else if (rest.code === 801 || rest.code === 802) {
        checkLogin(unikey);
      }
    }, 2000);
  };
  useEffect(() => {
    queryQrCode();
    return () => {
      // clear定时器
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <div className="app-login-wrap-img">
        {spin ? <span>loading...</span> : <img src={base64} />}
      </div>
      <div className="app-login-wrap-info">
        {code === 800 && (
          <span style={{ color: 'red' }}>
            二维码已过期
            <a style={{ marginLeft: 10 }} onClick={queryQrCode}>
              刷新
            </a>
          </span>
        )}
        {code === 801 && (
          <span style={{ color: '#666' }}>使用网易云音乐App扫码登录</span>
        )}
        {code === 802 && (
          <span style={{ color: 'green' }}>请在手机上确认授权</span>
        )}
        {code === 803 && (
          <span style={{ color: 'green' }}>授权成功，正在跳转</span>
        )}
      </div>
    </>
  );
};

const Email = () => {
  const form = Form.useForm();
  const login = async () => {
    const data = await form.validateField?.();
    const res: any = await emailLogin(data.email, data.password);
    if (res.code === 200) {
      localStorage.setItem('user.cookie', res.cookie);
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  };
  return (
    <div style={{ marginTop: 40, width: 325 }}>
      <Form
        form={form}
        schema={[
          {
            type: 'Input',
            name: 'email',
            required: true,
            label: '',
            props: {
              suffix: <IconUser />,
              placeholder: '请输入邮箱账号',
              style: {
                height: 44,
              },
            },
          },
          {
            type: 'Input',
            name: 'password',
            required: true,
            label: '',
            props: {
              type: 'password',
              placeholder: '请输入邮箱密码',
              style: {
                height: 44,
              },
            },
          },
        ]}
      />
      <Button
        onClick={login}
        type="primary"
        style={{ width: '100%', height: 44, marginTop: 20 }}
      >
        登录
      </Button>
    </div>
  );
};
