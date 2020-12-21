"use strict"

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt,io } = app
  router.get("/", controller.home.index)
  router.post("/user/sign", controller.user.sign)
  router.post("/user/login", controller.user.login)
  router.post("/user/loginout", controller.user.loginOut)
  router.post("/user/updateInformation", controller.user.updateInformation)
  router.post("/message/sendMessage",controller.message.sendMessage)
  router.get("/message/getMessage",controller.message.getMessageNew)
  router.post("/message/uploadImage",controller.message.sendImage)
  io.of('/chat').route('chat',io.controller.chat.index)
  router.post("/group/create",controller)
}
