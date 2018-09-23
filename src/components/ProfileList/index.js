import React from 'react';
import styled from 'styled-components';

import CustomButton from '../../components/CustomButton';


const CirclePict = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${ props => props.backgroundPict }) center;
  background-size: 40px 40px;
  margin-right: 1rem;
`;

const ProfileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 0.5rem;

  & > div:first-child {
    max-height: 312px;
    overflow-y: scroll;
    & > div {
      padding: 1rem 0;
      display: flex;
      justify-content: stretch;
      align-items: center;
      flex-direction: row;

      &.no-found {
        text-align: center;
        font-size: 90%;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #ddd;
      }

      & > div:nth-child(1) {
        width: 60px;
      }

      & > div:nth-child(2) {
        width: calc(100% - 60px);
      }

      & > div:nth-child(3), & > div:nth-child(4) {
        width: 200px;
      }
    }
  }

  & > div:last-child {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div.children {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: stretch;

      & > div {
        & > div:nth-child(1) {
          display: flex;
          flex-direction: column;
          justify-content: center;
          & > input, & > textarea {
            margin-bottom: 0.5rem;
          }
        }

        & > div:nth-child(2) {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          & > button:first-child {
            margin-right: 1rem;
          }
        }
      }
    }
  }
`;

const ProfileList = (props) => {
  console.log(props)
  if(props.profiles.length <= 0) {
    return <ProfileListWrapper>
      <div className="no-found">No profile found.</div>
    </ProfileListWrapper>
  }
  return (
      <ProfileListWrapper>
        <div>
          { props.profiles.map((profile, index) => (
            <div key={index}>
              <div>
                <CirclePict backgroundPict={profile.profile_picture}/>
              </div>
              <div>
                { profile.profile_name}
              </div>
              <div>
                <CustomButton color="white" bg="#F48024" 
                  onClick={() => { props.onShareProfileClick(profile.id) }}>Share profile</CustomButton>
              </div>
            </div>
          ))}
        </div>
        <div>
          { !props.isCreateNewProfile &&
            <CustomButton
              onClick={props.onCreateNewProfile}
              color="white" 
              bg="#F48024">Create new profile</CustomButton>
          }
          { props.isCreateNewProfile &&  
            <div className="children">
              { props.children }
            </div>
          }
        </div>
      </ProfileListWrapper>
    )
}

export default ProfileList;