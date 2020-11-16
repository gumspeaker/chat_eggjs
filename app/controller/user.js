const Controller = require("egg").Controller;

class UserController extends Controller {
  async sign() {
    const { ctx, service } = this;
    let userInfo = ctx.request.body;
    const signInformation = await ctx.service.user.addUser(userInfo);
    ctx.helper.success(signInformation);
    // ctx.body = signInformation
  }
  async login() {
    const { ctx, service, app, helper } = this;
    let userInfo = ctx.request.body;
    const loginInformation = await ctx.service.user.login(userInfo);
    if (loginInformation == "error") {
      ctx.body = "参数错误";
    } else {
      const token = await service.actionToken.apply(loginInformation.user_name);
      ctx.helper.writeToken(loginInformation.user_name, token);
      // vo中不该有密码
      delete loginInformation.user_password;
      ctx.helper.success({ loginInformation, token });
    }
  }
  async loginOut() {
    const { ctx, service } = this;
    let username = ctx.request.body;
  }
}

module.exports = UserController;
