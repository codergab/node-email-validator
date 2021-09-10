const {validateEmailAddress} = require('../src/services/email-validation');

validateEmailAddress('gabrieltfxt@gmail.com').then(resi => {
  console.log(resi);
});