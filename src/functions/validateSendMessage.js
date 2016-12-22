import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateCampaignForm(data) {
  let errors = {}
  console.log(data);

  if (Validator.isEmpty(data.message_text)) {
    errors.message_text = "This field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
