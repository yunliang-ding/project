import { request } from 'lyr';

export const toSign = async (): Promise<any> => {
  return request.get('/music.163/daily_signin?type=1');
};

