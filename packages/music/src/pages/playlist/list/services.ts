import { request } from 'lyr';

export const getPlayList = async (uid: number): Promise<any> => {
  return request.get(`/music.163/user/playlist?uid=${uid}`, {});
};

export const getList = async (id: number): Promise<any> => {
  return request.get(`/music.163/playlist/track/all?id=${id}`, {});
};
