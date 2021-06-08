const request = require('axios').default;

const accessKey = 'fd676d5473508a5e942ddfae16d402a1';

exports.validateEmailAddress = async (email) => {
  try {
    const response = await request
      .get(this.generateValidationUrl(email), {
        email,
      })
      .then((res) => res)
      .catch((err) => err);
    console.log(response.data);
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
  `http://apilayer.net/api/check?access_key=${accessKey}&email=${email}&smtp=1&format=1`;

const successResponse = (message, data) => ({
  status: true,
  message,
  data,
});

const errorResponse = (message) => ({
  status: false,
  message,
});
