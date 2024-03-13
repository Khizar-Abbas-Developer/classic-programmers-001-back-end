const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const registerValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    email_address: Joi.string().email().required().label("Email"),
  });
  return schema.validate(data);
};

module.exports = { registerValidation };
