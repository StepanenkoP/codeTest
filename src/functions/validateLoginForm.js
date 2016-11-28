import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateLoginForm(data) {
  let errors = {}

  if (!Validator.isEmail(data.login.trim())) {
    errors.login = "Email is invalid";
  }
  if (Validator.isEmpty(data.password.trim())) {
    errors.password = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
