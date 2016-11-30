import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateChangepass(data) {
  let errors = {}

  if (Validator.isEmpty(data.current_password.trim())) {
    errors.current_password = "This field is required";
  }
  else if (data.current_password.trim().length < 6) {
    errors.current_password = "This field must have at least 6 characters";
  }
  if (Validator.isEmpty(data.new_password.trim())) {
    errors.new_password = "This field is required";
  }
  else if (data.new_password.trim().length < 6) {
    errors.new_password = "This field must have at least 6 characters";
  }
  if (Validator.isEmpty(data.confirm_password.trim())) {
    errors.confirm_password = "This field is required";
  }
  else if (data.confirm_password.trim().length < 6) {
    errors.confirm_password = "This field must have at least 6 characters";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
