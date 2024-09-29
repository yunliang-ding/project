import axios from 'axios';

export const queryOss = async (): Promise<any> => {
  return axios.get('https://api-online.yunliang.cloud/oss/list');
};
