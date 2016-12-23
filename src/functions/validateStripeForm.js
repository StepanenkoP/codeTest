import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateStripeForm(data) {
  let errors = {}
  if (Validator.isEmpty(data.amount.trim())) {
    errors.amount = "This field is required";
  } else if (isNaN(+data.amount.trim())) {
    errors.amount = "This field should contain only numbers";
  }
  if (Validator.isEmpty(data.card_number.trim())) {
    errors.card_number = "Enter your card number";
  } else if (data.card_number.trim().length !== 16) {
    errors.card_number = "Card number must contain 16 numbers";
  } else if (isNaN(+data.card_number.trim())) {
    errors.card_number = "Card number must contain only numbers";
  }
  if (Validator.isEmpty(data.exp_month.trim()) || Validator.isEmpty(data.exp_year.trim()) || Validator.isEmpty(data.cvc.trim())) {
    errors.exp_month = "Enter expire date and cvc";
  }
  if (Validator.isEmpty(data.exp_year.trim())) {
    errors.exp_year = "Enter expire date and cvc";
  }
  if (Validator.isEmpty(data.cvc.trim())) {
    errors.exp_month = "Enter expire date and cvc";
  } else if (isNaN(+data.cvc.trim())) {
    errors.exp_month = "Invalid cvc";
  } else if (data.cvc.trim().length !== 3) {
    errors.exp_month = "Invalid cvc";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
