import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateSecondForm(data) {
  let errors = {}

  if (Validator.isEmpty(data.contactnumber)) {
    errors.contactnumber = "This field is required";
  }
  else if (data.contactnumber.length < 7) {
    errors.contactnumber = "Contact Number must have at least 7 characters";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "This field is required";
  }
  else if (data.address.length < 10) {
    errors.address = "Address must have at least 10 characters";
  }
  if (Validator.isEmpty(data.business)) {
    errors.business = "Select your type of business";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
