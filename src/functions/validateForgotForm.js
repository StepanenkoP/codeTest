import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateForgotForm(data) {
  let errors = {}

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
