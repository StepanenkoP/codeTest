import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateCreateAd(data) {
  let errors = {}
  console.log(data);

  if (Validator.isEmpty(data.title.trim())) {
    errors.title = "This field is required";
  }
  if (Validator.isEmpty(data.short_description.trim())) {
    errors.short_description = "This field is required";
  }
  if (Validator.isEmpty(data.description.trim())) {
    errors.description = "Email is invalid";
  }
  if (Validator.isEmpty(data.url_link.trim())) {
    errors.url_link = "This field is required";
  }
  if (Validator.isEmpty(data.campaign_id.trim())) {
    errors.campaign_id = "Select campaign";
  }
  if (Validator.isEmpty(data.image.trim())) {
    errors.image_base64 = "Choose image";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
