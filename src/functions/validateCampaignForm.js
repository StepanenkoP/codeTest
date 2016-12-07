import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateCampaignForm(data) {
  let errors = {}
  console.log(data);

  if (Validator.isEmpty(data.title)) {
    errors.title = "This field is required";
  }
  if (data.start_date !== undefined && Validator.isEmpty(data.start_date)) {
    errors.start_date = "Enter start date";
  }
  if (data.end_date !== undefined && Validator.isEmpty(data.end_date)) {
    errors.end_date = "Enter end date";
  } else if (data.end_date === 'Invalid date') {
    errors.end_date = "Enter end date";
  }
  if (Validator.isEmpty(data.country_id.trim())) {
    errors.country_id = "Select your country";
  }
  if (Validator.isEmpty(data.gender_id.trim())) {
    errors.gender_id = "Select your gender";
  }
  if (data.serverDays.length === 0) {
    errors.days = "Please choose days";
  }
  if (data.serverTimes.length === 0) {
    errors.times = "Please choose time";
  }
  if (data.serverAges.length === 0) {
    errors.ages = "Please choose age";
  }
  if (data.serverWebsites.length === 0) {
    errors.websites = "Please choose websites";
  }
  if (Validator.isEmpty(data.limit_per_day.trim())) {
    errors.limit_per_day = "Enter day limit";
  }
  if (Validator.isEmpty(data.limit_per_user.trim())) {
    errors.limit_per_user = "Enter limit per user";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
