import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data) {
  let errors = {}

  if (Validator.isEmpty(data.firstname.trim())) {
    errors.firstname = "This field is required";
  }
  else if (data.firstname.trim().length < 2) {
    errors.firstname = "First name must have at least 2 characters";
  }
  if (Validator.isEmpty(data.lastname.trim())) {
    errors.lastname = "This field is required";
  }
  else if (data.lastname.trim().length < 2) {
    errors.lastname = "Last name must have at least 2 characters";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password.trim())) {
    errors.password = "This field is required";
  }
  else if (data.password.trim().length < 6) {
    errors.password = "Password must have at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
