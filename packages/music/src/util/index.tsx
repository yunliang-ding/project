/* eslint-disable no-console */
import { getMp4Url } from '@/services';
import { Modal } from '@yl-d/design';
import { useEffect, useState } from 'react';

export const parseImagePath = (v) => v;
// .replace('http://p2.music.126.net', '/music.163/p2')
// .replace('http://p1.music.126.net', '/music.163/p1')
// .replace('https://p2.music.126.net', '/music.163/p2')
// .replace('https://p1.music.126.net', '/music.163/p1');

export const proxyMp4 = (v) => {
  return v.replace('http://vodkgeyttp8.vod.126.net/', '/music.163/mp4/');
};

export const openMp4Modal = (mvId: number, title: string) => {
  Modal({
    title,
    width: 500,
    height: 300,
    footer: false,
    bodyStyle: {
      padding: 0,
    },
    render() {
      const [url, setUrl] = useState();
      const init = async () => {
        const {
          data: { url },
        } = await getMp4Url(mvId);
        setUrl(url);
      };
      useEffect(() => {
        init();
      }, []);
      return (
        url && (
          <video
            controls
            src={url}
            autoPlay
            style={{ width: 500, height: 294 }}
          />
        )
      );
    },
  }).open();
};
