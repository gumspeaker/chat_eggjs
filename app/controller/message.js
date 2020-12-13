'use strict';

const Controller = require('egg').Controller;
// const fs = require('mz/fs');
class MessageController extends Controller {
  async sendMessage() {
    const {app,ctx,service } =this
    const message = ctx.request.body
    // ctx.helper.checkToken(message.messageOwner,message.token)
    const res =await service.message.addMessage(message)
    ctx.helper.success(res)
  }
  async getMessageNew(){
    const {app,ctx,service} = this
    const {page,groupId} = ctx.request.queries
    const res =await service.message.getRecentMessage(groupId,page)

    ctx.helper.success(res)
  }
  async sendImage(){
    const {app,ctx,service } =this
    const message = {...ctx.request.body,messageBody:null}
    const file = ctx.request.files[0]

    // ctx.helper.checkToken(message.messageOwner,message.token)
    const res = await service.message.addImageMessage(message,file)
    // console.log(Object.entries(res))
    ctx.helper.success(res)
  }
}

module.exports = MessageController;
