import React, {Component} from 'react'

class TextFieldGroup extends Component {
  render() {
    const {field, value, label, type, onChangeHandler, placeholder, error} = this.props
    return (
      <div className="form_group">
        <label className="form_group__label">{label}</label>
        <input
          value={value}
          onChange={onChangeHandler}
          type={type}
          name={field}
          placeholder={placeholder}
          className="form_group__input"
        />
        {error && <span className="validate_span">{error}</span>}
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
  error: React.PropTypes.string
}

export default TextFieldGroup
