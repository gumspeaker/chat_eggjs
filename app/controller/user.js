'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async sign() {
    const { ctx,service } = this;
    let userInfo = ctx.request.body;
    const signInformation = await ctx.service.user.addUser(userInfo);
    ctx.body = signInformation
    }
    async login() {
      const { ctx,service } = this;
      let userInfo = ctx.request.body;
      //  console.log(`${ctx.request.body}`);
      const loginInformation = await ctx.service.user.login(userInfo);
      if(loginInformation =="error"){
        ctx.body = "参数错误"
      }
      else{
      const token = await ctx.service.actionToken.apply(loginInformation.user_name)
      app.redis.set
      ctx.body = {loginInformation,token}
      }
      }
}

module.exports = UserController;
