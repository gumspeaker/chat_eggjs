"use strict"

const Controller = require("egg").Controller

class GroupController extends Controller {
  async getAllGroup() {}
  async getMyGroup() {}
  async CreateGroup() {
    const { ctx, service } = this
    let  groupInformation= ctx.body
    let res  = await service.group.addGroup(groupInformation)
  }
  async deleteGroup() {}
}

module.exports = GroupController
