// const JWT = require("jsonwebtoken")

module.exports = (options) => {
  return async function (ctx, next) {
    // 拿到传会数据的header 中的token值
    const token = ctx.request.body.token
    const method = ctx.method.toLowerCase()
    // 当前请求时get请求，执行接下来的中间件
    // if (method === "get") {
    //   await next()
    //   // 当前token值不存在的时候
    // } else 
    if (!token) {
      if (
        ctx.path === "/user/login" ||
        ctx.path === "/user/sign"
      ) {
        await next()
      } else {
        ctx.throw("401", "未登录， 请先登录")
      }
    } else {
      // 当前token值存在
      let decode
        // 验证当前token
        decode = ctx.app.jwt.verify(token, options.secret)
        // console.log(Object.entries(decode))
        if (!decode || !decode.data.user_name) {
          ctx.throw('401', "没有权限，请登录")
        }
        if (Date.now() > decode.expire ) {
          ctx.helper.deleteToken(decode.data.user_name,token)
          ctx.throw('401', "Token已过期")
        }
        const user = await ctx.service.user.getUserInfoByName(decode.data.user_name)
        if (user) {
            ctx.request.body['user']=user.user_name
          await next()
        } else {
          ctx.throw("401", "用户信息验证失败")
        }
    }
  }
}
