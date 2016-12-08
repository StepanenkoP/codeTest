import React, {Component} from 'react'
import FileBase64 from '../unisex/FileBase64';

class InputFileGroup extends Component {


  render() {
    const {field, value, label, type, onChangeHandler, placeholder, error, onBlurHandler, className, id} = this.props
    // const image = bgimg ? <img src={bgimg} alt="alt" className="bgimg"/> : null
    return (
      <div className="form_group">
        <label className="form_group__label">{label}</label>
        <input
          value={value}
          type={type}
          onBlur={onBlurHandler}
          name={field}
          readOnly={this.props.readOnly}
          placeholder={placeholder}
          className={className}
        />
        <label htmlFor={id} className="labelFile">
          Upload photo
          <FileBase64
            id={id}
            multiple={ true }
            onDone={this.props.getFiles} />
        </label>
        {error && <span className="validate_span">{error}</span>}
      </div>
    )
  }
}

InputFileGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
  error: React.PropTypes.string
}

export default InputFileGroup
