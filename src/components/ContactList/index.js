import React from 'react';
import styled from 'styled-components';

const ContactListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #ddd;
  max-height: 312px;
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
  }
`;

const ContactList = (props) => {
  console.log(props.contacts)
  if(props.contacts.length <= 0) {
    return <ContactListWrapper>
      <div className="no-found">No contacts found.</div>
    </ContactListWrapper>
  }
  return (
      <ContactListWrapper>
        { props.contacts.map(contact => (
            <div key={contact.label}>{contact.label}</div>
          ))}
      </ContactListWrapper>
    )
}

export default ContactList;