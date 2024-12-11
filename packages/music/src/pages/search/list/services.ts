import { request } from 'lyr';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const queryByKeyword = async (keywords: string): Promise<any> => {
  const {
    result: { songs },
  }: any = await request.get(`/music.163/search?keywords=${keywords}&limit=60`, {});
  return request.get(
    `/music.163/song/detail?ids=${songs.map((i) => i.id).join(',')}`,
    {},
  );
};
