const moment = require("moment")
const fs = require("fs")
const { resolve } = require("path")
const util = require("util")
// 格式化时间
exports.formatTime = (time) => moment(time).format("YYYY-MM-DD HH:mm:ss")
const users = "users"
// 处理成功响应

exports.success = function (res) {
  // console.log(this)
  this.ctx.body = {
    code: 0,
    data: res,
    msg: "请求成功",
  }
  this.ctx.status = 200
}
exports.writeToken = async function (user_name, token) {
  const { ctx, app, service } = this
  await app.redis.hset(users, user_name, token)
  //  app.redis.
  // console.log(await app.redis.get(user_name))
}
exports.deleteToken = async function (username, token) {
  const { ctx, app } = this
  // console.log(`${token}`)
  if (ctx.helper.checkToken(username, token)) {
    return await app.redis.hdel(users, username)
  } else return false
}
exports.checkToken = async function (username, token) {
  const { app, ctx } = this
  const isExisted = await app.redis.hexists(users, username)
  if (!isExisted) ctx.throw("401", "没有token, 请重新登录")
  const redisToken = await app.redis.hget(users, username)
  if (redisToken != token) ctx.throw("401", "token不正确，请重新登录")
  return redisToken == token
}
exports.saveFile = async function (file, toFilePath) {
  let res = false
  const promiseRead = util.promisify(fs.readFile)
  const promiseWrite = util.promisify(fs.writeFile)
  // return await promiseRead(file.filepath)
  //   .then((data) => promiseWrite(toFilePath, data))
  //   .then((r) => true)
  //   .catch((err) => {
  //     return res
  //   })
  try {
    const data= await promiseRead(file.filepath)
    await promiseWrite(toFilePath,data)
    res = true
  } catch (error) {
    res = false
  }
  return res
}
