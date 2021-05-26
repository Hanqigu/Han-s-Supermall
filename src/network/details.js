// details页面网络请求封装
import {request} from './request';

export function getDetails(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    },
  });
};
