import React from 'react';
import styled from 'styled-components';

import Checked from '../../images/checked.svg';
import { isUndefined } from 'lodash';

const ContactListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #ddd;
  max-height: 400px;
  overflow-y: scroll;
  padding: 0.5rem;

  & > div {
    padding: 0.5rem 0;

    &.no-found {
      text-align: center;
      font-size: 90%;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }

    & > div {
      margin: 0.5rem 0.25rem; 
      font-size: 90%;
    }

    display: flex;
    justify-content: stretch;
    align-items: center;

  }
`;

const CirclePict = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${ props => props.backgroundPict }) center;
  background-size: 40px 40px;
  margin-right: 1rem;
`;


const ContactList = (props) => {
  if(props.contacts.length <= 0) {
    return <ContactListWrapper>
      <div className="no-found">No contacts found.</div>
    </ContactListWrapper>
  } else if(props.isClickable) {
    return <ContactListWrapper>
      { props.contacts.map((contact, index) => (
          <div key={index} onClick={() => { props.onContactClick(index) }}>
            <div>
              {contact.firstName + 
                (!isUndefined(contact.middleName) ? ' ' + contact.middleName : '') + 
                (!isUndefined(contact.lastName) ? ' ' + contact.lastName : '') 
                + ' - ' + contact.phoneNumbers[0].number
              } 
            </div>
          </div>
        ))}  
    </ContactListWrapper>
  }
  return (
      <ContactListWrapper>
        { props.contacts.map((contact, index) => (
            <div key={index}>
              <div>
                <CirclePict backgroundPict={contact.data.profile.profile_picture}/>
              </div>
              <div>
                {contact.label}
              </div>
            </div>
          ))}
      </ContactListWrapper>
    )
}

export default ContactList;