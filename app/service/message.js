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
    try {
      const { ctx, app, logger } = this
      const messageD = messageDto(message)
      const t = await app.mysql.insert("group_message", messageD)
      return t
    } catch (error) {
    }

  }
  async getRecentMessage(groupId,page){
    try {
      const { ctx, app, logger,config } = this
      // console.log(config.pagesize)
      const pagesize =config.pagesize
      let begin = (parseInt(page)-1)*pagesize
      // console.log(begin)
      const res = await app.mysql.select('group_message',{
        where : {
          message_deleted:0,
          message_groupId:parseInt(groupId)
        },
        columns:['message_id','message_body','message_date','message_owner','message_type'],
        orders:[['message_date','desc']],
        limit: pagesize,
        offset:begin,
      })
      return res
    } catch (error) {
    }
  }
  async addImageMessage(message,file){
    const { ctx, app, logger } = this
    const filePath = './image/'+ file.filename
    result = await ctx.helper.saveFile(file,filePath)
    const messageD = messageDto(message)
    return await app.mysql.insert("group_message", messageD)   
  }
}

module.exports = MessageService
