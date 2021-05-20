// home页面网络请求封装
import {request} from './request';

export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
  });
};
