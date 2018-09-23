import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import TitleBar from '../../components/TitleBar';
import LoaderImage from '../../components/LoaderImage';

import {
  fetchProfileData
} from './actions';

const ProfileDetailPageWrapper = styled.div`
  & > div.content {
    margin-top: 60px;
  }
`;

class ProfileDetailPage extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const profileId = match.params.profileId;
    dispatch(fetchProfileData(profileId));
  }

  render() {
    const { profileDetailPage } = this.props;
    console.log(profileDetailPage);
    return <ProfileDetailPageWrapper>
      <TitleBar title="Share Profile" />
      { profileDetailPage.isLoading ? 
        <LoaderImage /> :
        <div className="content">
          { JSON.stringify(profileDetailPage.profileData)}
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