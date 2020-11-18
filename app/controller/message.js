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
  async getMessageNew(){
    const {app,ctx,service} = this
    const {page,groupId} = ctx.request.queries
    // console.log(Object.entries(ctx.request.body))
    const res =await service.message.getRecentMessage(groupId,page)
    ctx.helper.success(res)
  }
}

module.exports = MessageController;
