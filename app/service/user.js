'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async addUser(userInfo) {
    const { ctx,app }= this.ctx;
    let { 
      user_id= null,
      username: user_name,
      password: user_password,
      user_photo= null,
      user_phone= null,
      user_role= 'normal',
      user_email= null,
      user_qq_openId= null
    } = userInfo;
    // console.log(`${user_name}`)
    if(user_name == null || user_password == null)
      return "params is error"
    const user =await app.mysql.get('user',{user_name})
    if(user){
      return "user has signed";
    }
    else{
      app.mysql.insert('user',{user_name,user_password})
      return "user signs successful"
    }
    // console.log(user)
    return user;
  }
  async login(loginInfo){
    const { ctx,app }= this.ctx;
    const {username: user_name,password:user_password} = loginInfo
    const user =await app.mysql.get('user',{user_name,user_password})
    return user
  }
}

module.exports = UserService;
