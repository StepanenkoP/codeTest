import React, {Component} from 'react'

class TextFieldGroup extends Component {
  render() {
    const {field, value, label, type, onChangeHandler, placeholder, error, onBlurHandler, className} = this.props
    const limits = this.props.limits ? <span className="no_limits">0 - no limits</span> : null
    return (
      <div className="form_group">
        <label className="form_group__label">{label}</label>
        <input
          value={value}
          onChange={onChangeHandler}
          type={type}
          onBlur={onBlurHandler}
          name={field}
          placeholder={placeholder}
          className={className}
        />
        {error && <span className="validate_span">{error}</span>}
        {limits}
      </div>
    )
  }
}

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  onChangeHandler: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  limits: React.PropTypes.string
}

export default TextFieldGroup
