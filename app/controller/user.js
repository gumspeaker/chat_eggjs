"use strict"

const Controller = require("egg").Controller

class UserController extends Controller {
  async sign() {
    const { ctx, service } = this
    let userInfo = ctx.request.body
    const signInformation = await ctx.service.user.addUser(userInfo)
    ctx.helper.success(signInformation)
    // ctx.body = signInformation
  }
  async login() {
    const { ctx, service, app, helper } = this
    let userInfo = ctx.request.body
    const loginInformation = await ctx.service.user.login(userInfo)
    if (loginInformation == "error" || loginInformation == null) {
      ctx.throw("500", "参数错误或者密码错误")
    } else {
      const token = await service.actionToken.apply(loginInformation.user_name)
      ctx.helper.writeToken(loginInformation.user_name, token)
      // vo中不该有密码
      Reflect.deleteProperty(loginInformation, "user_password")
      ctx.helper.success({ loginInformation, token })
    }
  }
  async loginOut() {
    const { ctx, service, app } = this
    let { username, token } = ctx.request.body
    let res = await ctx.helper.deleteToken(username, token)
    ctx.helper.success({ res })
  }
  async updateInformation() {
    const { ctx, service, app } = this
    const { username } = ctx.request.body

    await ctx.helper.success("signInformation")

    ctx.throw("500", "系统错误")
    // ctx.body = ctx.request.body
  }
  async askJoinGroup() {
    const { ctx, service, app } = this
    const { username, groupId } = ctx.body
  }
}

module.exports = UserController
