'use strict';

const Service = require('egg').Service;

class QueryAdminConfService extends Service {
  async echo() {
    async queryLoanFlag() {
        const result = await app.curl('http://192.168.1.220:3030/api/market/channel/getCfgOfCashLoan?id=-100', {
          dataType: 'json',
        });
        return result.data.data;
      }
  }
}

module.exports = QueryAdminConfService;
