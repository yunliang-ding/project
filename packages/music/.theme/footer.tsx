/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { parseImagePath } from '@/util';
import { Slider } from '@yl-d/design';
import { request } from 'lyr';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import userStore from '@/store/user';
import {
  IconPauseCircle,
  IconPlayCircle,
  IconSkipNext,
  IconSkipPrevious,
} from '@yl-d/icon';

const $: any = document.querySelector.bind(document);

let lyricString = '';

const TimeText = (time: number) => {
  if (!isNaN(time)) {
    return [
      String(Math.floor(time / 60)).padStart(2, '0'),
      String(Math.floor(time % 60)).padStart(2, '0'),
    ].join(':');
  }
  return '-';
};
const MusicToolBar = ({ setPlaying, playing, IconRender }) => {
  const { playMusic }: any = userStore.useSnapshot();
  const { dt, id } = playMusic;
  const [lyric, setLyric] = useState({});
  const [progress, setProgress]: any = useState(0);
  // 查询并解析歌词
  const queryLyrics = async (musicid: number) => {
    setLyric({
      0: '歌词加载中...',
    }); // clear
    const { lrc }: any = await request.get(`/music.163/lyric?id=${musicid}`);
    const obj = {};
    lrc.lyric
      .split('\n')
      .filter(Boolean)
      .forEach((i) => {
        obj[
          i
            .slice(1, 6)
            .split(':')
            .reduce((a, b) => Number(a) * 60 + Number(b))
        ] = i.slice(i.indexOf(']') + 1);
      });
    setLyric(obj);
    setPlaying(true);
  };
  useEffect(() => {
    if (id) {
      queryLyrics(id);
    }
  }, [id]);
  useEffect(() => {
    $('#audio').ontimeupdate = (e: any) => {
      setProgress(e.target.currentTime / dt * 100000);
    };
  }, [dt]);
  // 渲染之前的节点
  if (lyric[Math.floor(progress * dt / 100000)] !== undefined) {
    lyricString = lyric[Math.floor(progress * dt / 100000)];
  }
  return (
    <div className="music-toolbar">
      <div className="music-toolbar-name">
        {playMusic.picUrl && (
          <img src={`${parseImagePath(playMusic.picUrl)}?param=30y30`} />
        )}
        <div className="music-toolbar-name-title">
          <Marquee pauseOnHover gradient={false} delay={2} play={playing}>
            <span>{playMusic.name}</span>
            <span style={{ color: '#999' }}>-</span>
            <span style={{ color: '#999' }}>{playMusic.arName}</span>
          </Marquee>
          <div style={{ marginLeft: 10 }}>
            <span style={{ color: '#999' }}>{TimeText(progress * dt / 100000)}</span>
            <span style={{ color: '#999' }}>/</span>
            <span style={{ color: '#999' }}>{TimeText(dt / 1000)}</span>
          </div>
        </div>
      </div>
      <Slider
        tooltipVisible={false}
        min={0}
        max={dt / 1000}
        value={progress}
        onChange={(e: any) => {
          // 更新音乐
          $('#audio').currentTime = e  * dt / 100000;
          setProgress(e);
        }}
      />
      <div className="music-toolbar-center">
        <IconSkipPrevious />
        {IconRender}
        <IconSkipNext />
      </div>
      <div className="music-toolbar-lyrics">{lyricString}</div>
      <div style={{ display: 'none' }}>
        <audio
          id="audio"
          src={
            playMusic.ksUrl
              ? playMusic.ksUrl
              : `//music.163.com/song/media/outer/url?id=${playMusic.id}.mp3`
          }
          loop
          autoPlay
          preload="auto"
        />
      </div>
    </div>
  );
};

export default () => {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    playing ? $('#audio').play() : $('#audio').pause();
  }, [playing]);
  const IconRender = playing ? (
    <IconPauseCircle
      onClick={() => {
        setPlaying(false);
      }}
      style={{
        fontSize: 20,
        padding: 4,
        color: "#ff",
        backgroundColor: "var(--bg-color-2)",
        borderRadius: '50%',
      }}
    />
  ) : (
    <IconPlayCircle
      onClick={() => {
        setPlaying(true);
      }}
      style={{
        fontSize: 20,
        padding: 4,
        color: "#ff",
        backgroundColor: "var(--bg-color-2)",
        borderRadius: '50%',
      }}
    />
  );
  return (
    <MusicToolBar
      setPlaying={setPlaying}
      IconRender={IconRender}
      playing={playing}
    />
  );
};
