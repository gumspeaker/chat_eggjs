"use strict"
const Service = require("egg").Service
const uuid = require("uuid")
const _ = require("lodash")
const imageType = [
  "bmp",
  "jpg",
  "png",
  "tif",
  "gif",
  "pcx",
  "tga",
  "exif",
  "fpx",
  "svg",
  "psd",
  "cdr",
  "pcd",
  "dxf",
  "ufo",
  "eps",
  "ai",
  "raw",
  "WMF",
  "webp",
  "avif",
]
const voiceType = ["cd", "wav", "mp3", "mpeg"]
function getDirName(type) {
  if (imageType.includes(type)) return "./file/image/"
  else if (voiceType.includes(type)) return "./file/voice/"
  else return "./file/normal/"
}

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
    let res 
    try {
      const { ctx, app, logger } = this
      const messageD = messageDto(message)
      res = await app.mysql.insert("group_message", messageD)
    } catch (error) {
      res = false
    }
    return res
  }
  async getRecentMessage(groupId, page) {
    try {
      const { ctx, app, logger, config } = this
      const pagesize = config.pagesize
      let begin = (parseInt(page) - 1) * pagesize
      const res = await app.mysql.select("group_message", {
        where: {
          message_deleted: 0,
          message_groupId: parseInt(groupId),
        },
        columns: [
          "message_id",
          "message_body",
          "message_date",
          "message_owner",
          "message_type",
        ],
        orders: [["message_date", "desc"]],
        limit: pagesize,
        offset: begin,
      })
      return res
    } catch (error) {}
  }
  async uploadFile(message, file) {
    const { ctx, app, logger } = this
    const filetype = file.filename.substring(file.filename.lastIndexOf(".") + 1)
    const dirName = getDirName(filetype)
    let savedFileName
    if (dirName.includes("normal")) savedFileName = file.filename
    else savedFileName = uuid.v4() + "." + filetype
    const filePath = dirName +savedFileName
    const messageD = messageDto(message)
    if (await ctx.helper.saveFile(file, filePath))
      messageD.message_body = savedFileName
    else messageD.message_body = "err.img"
    await app.mysql.insert("group_message", messageD)
    return messageD
  }
}

module.exports = MessageService
