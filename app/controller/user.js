'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async sign() {
    const { ctx,service } = this;
    let userInfo = ctx.request.body;
    // await console.log(ctx)
    //  console.log(`${ctx.request.body}`);
    const signInformation = await ctx.service.user.addUser(userInfo);
    // console.log(signInformation)
    ctx.body = signInformation
    // return signInformation;
    }
    async login() {
      const { ctx,service } = this;
      let userInfo = ctx.request.body;
      // await console.log(ctx)
       console.log(`${ctx.request.body}`);
      const loginInformation = await ctx.service.user.login(userInfo);
      // console.log(signInformation)
      const token = await ctx.service.actionToken.apply(loginInformation.user_name)
      ctx.body = {loginInformation,token}
      // return signInformation;
      }
}

module.exports = UserController;
