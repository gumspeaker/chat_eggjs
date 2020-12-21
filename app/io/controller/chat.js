"use strict"

const Controller = require("egg").Controller

class ChatController extends Controller {
  async index() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit("connect","ji")
    await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
  }
}

module.exports = ChatController
