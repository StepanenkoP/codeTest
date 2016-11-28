import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateSecondForm(data) {
  let errors = {}

  if (Validator.isEmpty(data.contact_number.trim())) {
    errors.contact_number = "This field is required";
  }
  else if (data.contact_number.trim().length < 7) {
    errors.contact_number = "Contact Number must have at least 7 characters";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "This field is required";
  }
  else if (data.address.trim().length < 10) {
    errors.address = "Address must have at least 10 characters";
  }
  if (Validator.isEmpty(data.business_type_id.trim())) {
    errors.business_type_id = "Select your type of business";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
