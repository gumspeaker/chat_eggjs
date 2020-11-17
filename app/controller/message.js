'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async sendMessage() {
    const {app,ctx,service } =this
    const message = ctx.request.body
    ctx.helper.checkToken(message.messageOwner,message.token)
    const res =await service.message.addMessage(message)
    console.log(Object.entries(res))
    ctx.helper.success(res)
    // ctx.body={
    //   a:1
    // }
  }
}

module.exports = MessageController;
