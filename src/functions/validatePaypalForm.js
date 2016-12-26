import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validatePaypalForm(data) {
  let errors = {}
  if (Validator.isEmpty(data.amount.trim())) {
    errors.amount = "This field is required";
  } else if (isNaN(+data.amount.trim())) {
    errors.amount = "This field should contain only numbers";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
