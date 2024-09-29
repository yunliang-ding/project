import { request } from 'lyr';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const getList = async (uid: number): Promise<any> => {
  return request.get(`/music.163/recommend/songs?uid=${uid}`, {});
};

export const getHistoryList = async (date: string): Promise<any> => {
  return request.get(
    `/music.163/history/recommend/songs/detail?date=${date}`,
    {},
  );
};

export const like = async (id: number, like = true): Promise<any> => {
  return request.get(`/music.163/like?id=${id}`, {
    params: {
      like,
    },
  });
};
