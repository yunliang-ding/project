const Base = require('./base.js');
const axios = require('axios');

module.exports = class extends Base {
  async indexAction() {
    const params = {
      // 清除缓存
      timestamp: Date.now(),
    };
    let url = this.ctx.originalUrl;
    let type = 'json';
    if (url.startsWith('/music.163/mp3')) {
      type = 'mp3';
      url = this.ctx.originalUrl.replace(
        '/music.163/mp3',
        'http://music.163.com',
      );
    } if (url.startsWith('/music.163/mp4')) {
      type = 'mp4';
      url = this.ctx.originalUrl.replace(
        '/music.163/mp4',
        'http://vodkgeyttp8.vod.126.net',
      );
    } else if (url.startsWith('/music.163/p1')) {
      type = 'jpg';
      url = this.ctx.originalUrl.replace(
        '/music.163/p1',
        'http://p1.music.126.net',
      );
    } else if (url.startsWith('/music.163/p2')) {
      type = 'jpg';
      url = this.ctx.originalUrl.replace(
        '/music.163/p2',
        'http://p2.music.126.net',
      );
    } else if (url.startsWith('/music.163')) {
      url = url.replace('/music.163', 'http://dev-ops.yunliang.cloud:6900');
    }
    if (!think.isEmpty(this.ctx.header.cookie163)) {
      params.cookie = this.ctx.header.cookie163;
    }
    try {
      const { data } = await axios.get(url, {
        params,
        responseType: 'arraybuffer', // 图片资源需要设置下
      });
      if (type === 'jpg') {
        this.ctx.type = 'image/ipg'
        this.ctx.res.end(data);
      } else if (type === 'mp3') {
        this.ctx.type = 'audio/mpeg'
        this.ctx.res.end(data);
      }  else if (type === 'mp4') {
        this.ctx.type = 'video/mp4'
        this.ctx.res.end(data);
      } else {
        this.json(data);
      }
    } catch (error) {
      this.json({
        code: error.response.data.code,
        msg: error.response.data.message,
      });
    }
  }
};
