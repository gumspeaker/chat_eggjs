/* eslint valid-jsdoc: "off" */

"use strict"
const { db_config } = require("../database/config")
const whitelist = [
  // images
  '.jpg', '.jpeg', // image/jpeg
  '.png', // image/png, image/x-png
  '.gif', // image/gif
  '.bmp', // image/bmp
  '.wbmp', // image/vnd.wap.wbmp
  '.webp',
  '.tif',
  '.psd',
  // text
  '.svg',
  '.js', '.jsx',
  '.json',
  '.css', '.less',
  '.html', '.htm',
  '.xml',
  // tar
  '.zip',
  '.gz', '.tgz', '.gzip',
  // video
  '.mp3',
  '.mp4',
  '.avi',
  '.pdf'
];
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1604842847219_1304"
  config.security = {
    csrf: {
      enable: false,
      // domainWhiteList: ["localhost:7001","127.0.0.1:5500"],
      // headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  }
  //设置jwt
  config.jwt = {
    secret: "Great4-M",
    enable: true, // default is false
    match: "/jwt", // optional
  }
  // 设置跨域
  config.cors = {
    origin: "http://127.0.0.1:5500",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH", 
    credentials: true,
  }
  config.redis = {
    client: {
      port: 6379,
      host: "47.115.47.66",
      password: "root",
      db: 0,
    },
  }
  // 添加中间件
  config.middleware = ["errorHandler", "auth"]
  // 数据库配置信息
  config.mysql = db_config
  // add your user config here
  config.errorHandler = {
    // 通用配置（以下是重点）
    enable: true, // 控制中间件是否开启。
    match: ["/user/*", "/message/*",'/'], // 设置只有符合某些规则的请求才会经过这个中间件（匹配路由）
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
  }
  config.io = { 
    // redis: {
    //   port: 6379,
    //   host: "47.115.47.66",
    //   password: "root",
    //   db: 0,
    // },
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packetMiddleware: ['filter'],
      },
      '/socket.io': {
        connectionMiddleware: ['connection'],
        packetMiddleware: ['filter'],
      },
      '/chat': {
        connectionMiddleware: ['connection'],
        packetMiddleware: [],
      }
    }
  }
  config.multipart ={
    mode:'file',
    whitelist:whitelist
  }
  const userConfig = {
    // myAppName: 'egg',
    pagesize: 10,
  }

  return {
    ...config,
    ...userConfig,
  }
}
