import React from 'react';
import ReactDom from "react-dom";

class FileBase64 extends React.Component {

  handleFile = (e) => {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      ReactDom.findDOMNode(this.refs.in).value = '';
      this.props.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <input ref="in" id={this.props.id} type="file" accept="image/*" onChange={this.handleFile} />
    );
  }

}

export default FileBase64;
