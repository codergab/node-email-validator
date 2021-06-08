const { validateEmailAddress } = require('../services/email-validation');

class AppController {
  static async validateEmailAddress(req, res) {
    const verificationResponse = await validateEmailAddress(req.body.email);
    res.send(verificationResponse);
  }
}

module.exports = AppController;
