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

// 详情页的轮播图下面的各项数据整合成一个类
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}
