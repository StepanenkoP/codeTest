import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateFeedback(data) {
  let errors = {}

  if (Validator.isEmpty(data.subject.trim())) {
    errors.subject = "This field is required";
  }
  if (Validator.isEmpty(data.description.trim())) {
    errors.description = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
