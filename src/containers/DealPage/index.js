import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import Tappable from 'react-tappable';
import { isNull, isUndefined } from 'lodash';

import EditDealPage from '../EditDealPage';

import TopNavBar from '../../components/TopNavBar';
import ProfileSelector from '../../components/ProfileSelector';
import CustomAlert from '../../components/CustomAlert';
import CustomInputText from '../../components/CustomInputText';
import LoaderImage from '../../components/LoaderImage';
import FieldErrorMessage from '../../components/FieldErrorMessage';
import CustomButton from '../../components/CustomButton';
import ImageUploader from '../../components/ImageUploader';

import {
  TOGGLE_STATUS_BUY,
  TOGGLE_STATUS_SELL
} from './constants';

import {
  onToggleTapped,
  fetchUserProfilesData,
  onSaveNewProfile,
  onShowProfileDialog,
  onHideProfileDialog,
  onProfileSelected,
  onSaveNewProfileFromDialogRequest,
  onProfileTempSelected,
  cancelProfileSelected,
  onSwitchProfile,
  onUserChoiceImage,
  onUserRemoveImage
} from './actions';

import {
  onSwitchNextOfferAction,
  onSwitchPreviousOfferAction
} from '../MyDealPage/actions';


import MyDealPage from '../MyDealPage';
import MakeDealPage from '../MakeDealPage';


const changePageByToggle = (url) => (dispatch) => {
  dispatch(push(url));
  dispatch(onToggleTapped());
}

const DealPageWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  
  & > div:nth-child(1) {
    display: flex;
    height: 90px;
    border-bottom: 1px solid #ddd;
  }

  & > div:not(.dialogALert):nth-child(2) {
    width: 100%;
    margin-top: 95px;
    background-color: white;
    margin-bottom: 60px;
  }

  & > div.dialogALert {
    & > div > div > div > div.upload-profile-pict {
      margin-top: 1rem;
    }
  }

`;

class DealPage extends Component {

  constructor(props) {
    super(props);
    this.onToggleTapped = this.onToggleTapped.bind(this);
    this.onLeftTapped = this.onLeftTapped.bind(this);
    this.saveNewProfile = this.saveNewProfile.bind(this);
    this.saveNewProfileFromDialog = this.saveNewProfileFromDialog.bind(this);
    this.onProfileSelected = this.onProfileSelected.bind(this);
    this.createNewProfileRef = React.createRef();
    this.onProfileTapped = this.onProfileTapped.bind(this);
    this.onSwitchProfileTapped = this.onSwitchProfileTapped.bind(this);
    this.onSwitchOfferTapped = this.onSwitchOfferTapped.bind(this);
    this.onPreviousOfferTapped = this.onPreviousOfferTapped.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
  }

  handleImageChange(event) {
    const { dispatch } = this.props;
    const file = event.target.files[0];
    this.readFile(file)
      .then(fileData => {
        dispatch(onUserChoiceImage(fileData.file, fileData.dataURL));
      })
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  }


  onRemoveImage() {
    const { dispatch, match } = this.props;
    dispatch(onUserRemoveImage()); 
  }

  onSwitchProfileTapped() {
    const { dispatch } = this.props;
    dispatch(onSwitchProfile());
  }

  onSwitchOfferTapped() {
    const { myDealPage, dispatch } = this.props;
    dispatch(onSwitchNextOfferAction(myDealPage.myDealProducts[myDealPage.currentProductId + 1].id));
  }

  onProfileTapped(event) {
    const { dispatch } = this.props;
    dispatch(onProfileTempSelected(event.target.value));
  }

  onPreviousOfferTapped() {
    const { myDealPage, dispatch } = this.props;
    dispatch(onSwitchPreviousOfferAction(myDealPage.myDealProducts[myDealPage.currentProductId - 1].id));
  }

  componentDidMount() {
    const { dispatch, global } = this.props;
    if(global.isLoggedIn) {
      if(isUndefined(global.userData.additional_information)) {
        dispatch(push('/content/fill-additional-information'));
      }
    }
  }

  onProfileSelected() {
    const { dispatch } = this.props;
  }

  saveNewProfile() {
    const { dispatch, global, dealPage } = this.props;
    dispatch(
      onSaveNewProfile({ user: global.userData.data.id, 
        profile_name: this.profileNameField.value, profile_picture: dealPage.tempImage }, 
        false,
        this.createNewProfileRef));
  }

  saveNewProfileFromDialog() {
    const { dispatch, global } = this.props;
    dispatch(
      onSaveNewProfile({ user: global.userData.data.id, profile_name: this.createNewProfileRef.current.value }, 
        true,
        this.createNewProfileRef));
  }

  onToggleTapped(event) {
    const { dispatch, dealPage } = this.props;
    const url = dealPage.currentToggleStatus == TOGGLE_STATUS_SELL ? '/content/deal/my' : '/content/deal/make';
    dispatch(changePageByToggle(url));
  }

  onLeftTapped(event) {
    const { dispatch, dealPage } = this.props;
    dispatch(onShowProfileDialog());
  }

  render() {
    const { dealPage, match, dispatch, myDealPage } = this.props;
    let content = null;
    if(!isNull(dealPage.profiles) && dealPage.profiles.length == 0) {
      content = <div className="dialogALert">
        <CustomAlert show={true} 
          title="Create new profile"
          okButtonText={dealPage.isLoading ? 'Saving profile' : 'Save profile'}
          onOkClick={this.saveNewProfile}
          cancel={false} okButtonDisabled={dealPage.isLoading}>
          <CustomInputText placeholder="Profile name" isError={dealPage.newProfileErrors.profile_name.length > 0}
            innerRef={profileName => {this.profileNameField = profileName; }}/>
          {dealPage.newProfileErrors.profile_name.map(error => 
            <FieldErrorMessage className="error-message" key={error}>{error}</FieldErrorMessage>)}
          <div className="upload-profile-pict">
          <ImageUploader 
            currentImage={dealPage.tempImage}
            currentImageURL={dealPage.tempImageUrl}
            onUploadClick={this.saveNewProfile}
            onRemoveImage={this.onRemoveImage}
            errors={dealPage.errors}
            hideOnShowImage={true}
            isOptional={true}
            buttonText={"Pilih Profile Pict"}
            onChange={this.handleImageChange} />
          </div>
        </CustomAlert>
      </div>;
    } else if(dealPage.isLoading) {
      content = <LoaderImage />;
    } else if(!isNull(dealPage.profiles)){
      content = <div>
        <Route path={`${match.url}/make`} component={MakeDealPage} />
        <Route path={`${match.url}/my`} component={MyDealPage} />
        <Route path={`${match.url}/edit/:productId`} component={EditDealPage} />
        <CustomAlert show={dealPage.showProfileDialog} 
          onOkClick={() => { dispatch(onProfileSelected()); }}
          onCancelClick={() => { dispatch(cancelProfileSelected()); }}
          title="Select Profile" 
          okButtonText="Select" 
          okButtonDisabled={dealPage.isLoading}
          cancelButtonText="Cancel"
          cancel={true}>
          <ProfileSelector name="profile" profiles={dealPage.profiles} 
            onProfileTapped={this.onProfileTapped}
            isSaving={dealPage.isLoadingDialog}
            newProfileErrors={dealPage.newProfileErrors}
            createNewProfileRef={this.createNewProfileRef}
            onSaveNewProfileClick={this.saveNewProfileFromDialog} />
        </CustomAlert>
      </div>;
    }
    return <DealPageWrapper>
      <div>
        <TopNavBar title="Logo" status={dealPage.currentToggleStatus}
          freezeToggle={dealPage.freezeToggle}
          currentProfileText={!isNull(dealPage.profiles) && dealPage.profiles.length > 0 ? 
            dealPage.profiles[dealPage.currentProfileIndex].label : ''}
          onLeftTapped={dealPage.currentToggleStatus == TOGGLE_STATUS_SELL ? 
            this.onLeftTapped : this.onPreviousOfferTapped}
          rightButtonHide={(myDealPage.isLoading && 
            dealPage.currentToggleStatus == TOGGLE_STATUS_BUY) || ((dealPage.currentToggleStatus == TOGGLE_STATUS_BUY) 
            && (!isNull(myDealPage.myDealProducts) && 
              myDealPage.myDealProducts.length == myDealPage.currentProductId + 1))}
          leftButtonHide={(myDealPage.isLoading && 
            dealPage.currentToggleStatus == TOGGLE_STATUS_BUY) || ((dealPage.currentToggleStatus == TOGGLE_STATUS_BUY) 
            && (!isNull(myDealPage.myDealProducts) && myDealPage.currentProductId <= 0))}
          onRightTapped ={dealPage.currentToggleStatus == TOGGLE_STATUS_SELL ? 
            this.onSwitchProfileTapped : this.onSwitchOfferTapped}
          statusActionText={dealPage.currentToggleStatus == TOGGLE_STATUS_SELL ? 
            'Switch Profile' : 'Switch Offer'}
          onToggleTapped={this.onToggleTapped} />
      </div>
      { content }
    </DealPageWrapper>;
  }
}


const mapStateToProps = (state) => ({
  global: state.get('global').toJS(),
  dealPage: state.get('dealPage').toJS(),
  myDealPage: state.get('myDealPage').toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(DealPage);