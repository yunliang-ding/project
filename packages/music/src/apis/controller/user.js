const Base = require("./base.js");

module.exports = class extends Base {
  async infoAction() {
    const { data } = await this.CenterServices({
      method: "post",
      url: "/user/userinfo",
    });
    this.json(data);
  }
};
