"use strict"
const Service = require("egg").Service
function messageDto(message) {
  return {
    message_id: null,
    message_body: message.messageBody,
    message_owner: message.messageOwner,
    message_date: new Date(parseInt(message.messageDate)),
    message_deleted: false,
    message_type: message.messageType,
    message_groupId: message.messageGroupId,
  }
}
class MessageService extends Service {
  async addMessage(message) {
    const { ctx, app, logger } = this
    const messageD = messageDto(message)
    const t = await app.mysql.insert("group_message", messageD)
    return t
  }
}

module.exports = MessageService
