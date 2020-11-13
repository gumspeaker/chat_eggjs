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
    origin:'*',
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
  config.middleware = ['errorHandler'];
  // 数据库配置信息
  config.mysql = db_config;
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
