import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import TitleBar from '../../components/TitleBar';
import LoaderImage from '../../components/LoaderImage';
import CirclePict from '../../components/CirclePict';
import CustomInputTextButton from '../../components/CustomInputTextButton';

import {
  fetchProfileData
} from './actions';

const ProfileDetailPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div.content {
    margin-top: 60px;
    & > div.profile-picture {
      padding: 1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    & > div.profile-text {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: center;
      & > h1 {
        margin: 1rem 0;
      }
      & > p {
        margin: 0 0 1rem 0;
      }
    }
  }
`;

function selectElementText(el){
    var range = document.createRange() // create new range object
    range.selectNodeContents(el) // set range to encompass desired element text
    var selection = window.getSelection() // get Selection object from currently user selected text
    selection.removeAllRanges() // unselect any user selected text (if any)
    selection.addRange(range) // add range to Selection object to select it
}

function getSelectionText(){
    var selectedText = ""
    if (window.getSelection){ // all modern browsers and IE9+
        selectedText = window.getSelection().toString()
    }
    return selectedText
}

class ProfileDetailPage extends Component {


  constructor(props) {
    super(props);

    this.generetedLinkRef = React.createRef();
    this.onCopyClick = this.onCopyClick.bind(this);
  }

  onCopyClick() {
    console.log( this.generetedLinkRef.current.select());
    selectElementText(this.generetedLinkRef.current)
    alert(getSelectionText());
    document.execCommand('copy');
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const profileId = match.params.profileId;
    dispatch(fetchProfileData(profileId));
  }

  render() {
    const { profileDetailPage } = this.props;
    return <ProfileDetailPageWrapper>
      <TitleBar title="Share Profile" />
      { profileDetailPage.isLoading ? 
        <LoaderImage /> :
        <div className="content">
          <div className="profile-picture">
            <CirclePict backgroundPict={profileDetailPage.profileData.profile_picture} size={200} />
          </div>
          <div className="profile-text">
            <h1>{ profileDetailPage.profileData.profile_name }</h1>
            <p>{ profileDetailPage.profileData.description}</p>
            <CustomInputTextButton 
              onClick={this.onCopyClick}
              inputRef={this.generetedLinkRef}
              disabled={true}
              defaultValue={`http://178.128.82.252:17519/api/v2/check-profile/?q=${profileDetailPage.profileData.generated_link}`} />
          </div>
        </div>
      }
    </ProfileDetailPageWrapper>
  }
}

const mapStateToProps = (state) => ({
  profileDetailPage: state.get('profileDetailPage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailPage);