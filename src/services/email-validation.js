const request = require('axios').default;
const { MAIL_VALIDATOR_SERVER } = require('../../config');

exports.validateEmailAddress = async (email) => {
  try {
    const response = await request
      .get(this.generateValidationUrl(email), {
        email,
      })
      .then((res) => res)
      .catch((err) => err);
    const { domain, mx_found, disposable, score, smtp_check, format_valid } = response.data;
    if (!format_valid) {
      return errorResponse('Invalid Email Address format');
    }

    if (!mx_found || !smtp_check || (disposable && !(score > 0.5))) {
      return errorResponse('Email Address is not valid');
    }

    if (mx_found && smtp_check && !disposable && score > 0.5) {
      return successResponse('Email Valid', { domain });
    }
  } catch (error) {
    return errorResponse('Something Went Wrong');
  }
};

exports.generateValidationUrl = (email) =>
  `http://apilayer.net/api/check?access_key=${MAIL_VALIDATOR_SERVER}&email=${email}&smtp=1&format=1`;

const successResponse = (message, data) => ({
  status: true,
  message,
  data,
});

const errorResponse = (message) => ({
  status: false,
  message,
});
