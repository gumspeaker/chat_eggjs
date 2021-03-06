'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  jwt: {
    enable:true,
    package:'egg-jwt',
  },
  cors:{
    enable: true,
    package: 'egg-cors'
  },
  redis:{
    enable:true,
    package:'egg-redis'
  },
  multipart:{
    enable:true,
    package:'egg-multipart'
  },
  io:{
    enable:true,
    package:'egg-socket.io'
  }
};