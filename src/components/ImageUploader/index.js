import React, { Component } from 'react';
import styled from 'styled-components';
import { isNull } from 'lodash';

import Upload from '../../images/upload.svg';
import CustomButton from '../CustomButton';
import FieldErrorMessage from '../FieldErrorMessage';

const ImageUploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > input {
    display: none;
  }

  & > div.uploadField {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > button {
      margin: 1rem;
    }
  }

  & > div.prev {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > button {
      margin: 1rem;
    }
    & > div.imagePreview {
      max-width: 300px;
      position: relative; 
      padding: 1rem;
      border-radius: 3px;
      border: 1px solid #ddd;
      & > img {
        width: 100%;
      }
      & > span {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -10px;
        right: -13px;
        cursor: pointer;
        background-color: #F48024;
        color: white;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        text-align: center;
      }
    }
  }


`;

class ImageUploader extends Component {
	constructor(props) {
		super(props);
    this.imageField = React.createRef();
	}

	render() {
		return (
			<ImageUploaderWrapper>
				<input type="file" onChange={this.props.onChange} ref={this.imageField} accept="image/*" />
				{ isNull(this.props.currentImage) &&  <div className="uploadField">
            <img src={Upload} width="50" /> 
             <CustomButton
              onClick={() => {this.imageField.current.click()}} color="white" bg="#F48024">{ this.props.buttonText}</CustomButton>   
          </div>
        }
        { !isNull(this.props.currentImage) &&
          <div className="prev">
            <div className="imagePreview">
              <span onClick={this.props.onRemoveImage}>X</span>
              { this.props.errors.length <= 0 && <img src={this.props.currentImageURL} />}
              { this.props.errors.map((error, index) => <FieldErrorMessage key={index}>
                  {error}
                </FieldErrorMessage>)
              }
            </div>
            { !this.props.hideOnShowImage && 
              <CustomButton onClick={ this.props.onUploadClick } 
                disabled={this.props.errors.length > 0}
                color="white" bg="#F48024">Upload</CustomButton>
            }
          </div>
        }
			</ImageUploaderWrapper>
			)
	}
}

export default ImageUploader;