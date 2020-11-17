/* eslint valid-jsdoc: "off" */

'use strict';
const { db_config } = require('../database/config');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1604842847219_1304';
  config.security = {
    csrf: {
      enable: false,
      domainWhiteList: [ 'http://localhost:7001' ],
      // headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  }
  //设置jwt
  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  }
  // 设置跨域
  config.cors = {
    origin:'http://localhost:80',
    allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  config.redis = {
    client:{
      port: 6379,
      host: '47.115.47.66',
      password: 'root',
      db:0
    }
  }
  // 添加中间件
  config.middleware = ['errorHandler','auth'];
  // 数据库配置信息
  config.mysql = db_config;
  // add your user config here
  config.errorHandler = {
    // 通用配置（以下是重点）
    enable:true, // 控制中间件是否开启。
    match:'/user/*', // 设置只有符合某些规则的请求才会经过这个中间件（匹配路由）
    //ignore:'/shop' // 设置符合某些规则的请求不经过这个中间件。
    /**
        注意：
        1. match 和 ignore 不允许同时配置
        **/
    // match 和 ignore 支持多种类型的配置方式：字符串、正则、函数（推荐）
    // match(ctx) {
    //     // 只有 ios 设备才开启
    //     const reg = /iphone|ipad|ipod/i;
    //     return reg.test(ctx.get('user-agent'));
    // },
  };
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
