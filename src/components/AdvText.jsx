import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'strikethrough',
      'highlight',
      'link',
      '|',
      'indent',
      'outdent',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'code',
      'codeBlock',
      '|',
      'horizontalLine',
      'specialCharacters',
      '|',
      'insertTable',
      '|',
      'undo',
      'redo'
    ]
};

class AdvText extends Component {
    constructor() {
      super();
      this.state = {
        editor: {} // Holds the editor after render
      }
    }
    handleClick() {
      // If the user clicks in the padding outside of the CKEditor, make the editor
      // focus

      this.state.editor.focus();
    }
    render() {
        return (
          <div
            className={"row-element-container "+this.props.className}
            id={this.props.id+"e"}
            onClick={this.handleClick.bind(this)}>

              <div className="row-element">
                  <CKEditor
                      editor={ Editor }
                      config={ editorConfiguration }
                      data={this.props.data}
                      id={this.props.id+"tb"}
                      disabled={this.props.disabled}
                      onReady={ editor => {
                          this.setState({editor:editor});
                          this.props.onReady();
                      } }
                      onChange={ ( event, editor ) => {
                          this.props.onChange(editor.getData());
                      } }
                  />
              </div>
          </div>
        );
    }
}

export default AdvText;
