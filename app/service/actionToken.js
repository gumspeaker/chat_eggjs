"use strict"

const Service = require("egg").Service

class ActionTokenService extends Service {
  async apply(username) {
    const { ctx } = this
    return ctx.app.jwt.sign(
      {
        data: {
          user_name: username,
        },
        expire: Math.floor(Date.now()) + 60 * 60 * 24 * 7*1000,
      },
      ctx.app.config.jwt.secret
    )
  }
}

module.exports = ActionTokenService

