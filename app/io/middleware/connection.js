let i = 0
module.exports = (app) => {
  return async (ctx, next) => {
    const say = "ddwd"
    ctx.socket.emit("res", "auth!" + say)
    await next()
    // console.log("disconnect!")
  }
}
