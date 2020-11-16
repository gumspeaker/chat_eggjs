const moment = require('moment')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功响应
exports.success = function(res) {
  // console.log(this)
  this.ctx.body = {
    code: 0,
    data: res,
    msg:"请求成功"
  }
 this.ctx.status = 200
}
exports.writeToken =async function(user_name,token){
  const {
    ctx,
    app,
    service
  } = this;
 await app.redis.hset("users",user_name, token)
//  app.redis.
  // console.log(await app.redis.get(user_name))
      
}
// export
