"use strict"

const Service = require("egg").Service
const { checkParam } = require("../util/normal")
class UserService extends Service {
  async addUser(userInfo) {
    const { ctx, app } = this.ctx
    let {
      user_id = null,
      username: user_name,
      password: user_password,
      user_photo = null,
      user_phone = null,
      user_role = "normal",
      user_email = null,
      user_qq_openId = null,
    } = userInfo
    if (checkParam(user_name) == false) return "params is error"
    const user = await app.mysql.get("user", { user_name })
    // 这里如果查询到了user表明就有人注册了
    if (checkParam(user) == false) {
      app.mysql.insert("user", { user_name, user_password })
      return "user signs successful"
    } else {
      return "user has signed"
    }
    // console.log(user)
    return user
  }
  async login(loginInfo) {
    const { ctx, app } = this.ctx
    const { username: user_name, password: user_password } = loginInfo
    if (checkParam(user_name, user_password) == true) {
      const user = await app.mysql.get("user", { user_name, user_password })
      return user
    } else {
      return "error"
    }
  }
}

module.exports = UserService
