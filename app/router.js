"use strict"

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app
  router.get("/", controller.home.index)
  router.post("/user/sign", controller.user.sign)
  router.post("/user/login", controller.user.login)
  router.post("/user/loginout", controller.user.loginOut)
  router.post("/user/updateInformation", controller.user.updateInformation)
  router.post("/message/sendMessage",controller.message.sendMessage)
}
