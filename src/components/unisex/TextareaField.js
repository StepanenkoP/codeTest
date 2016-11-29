import React, {Component} from 'react'

class TextareaField extends Component {
  render() {
    const {field, value, label, onChangeHandler, placeholder, error, onBlurHandler} = this.props
    return (
      <div className="form_group">
        <label className="form_group__label">{label}</label>
        <textarea
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          name={field}
          placeholder={placeholder}
          className="form_group__input textarea"
        ></textarea>
        {error && <span className="validate_span">{error}</span>}
      </div>
    )
  }
}

TextareaField.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChangeHandler: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  error: React.PropTypes.string
}

export default TextareaField
