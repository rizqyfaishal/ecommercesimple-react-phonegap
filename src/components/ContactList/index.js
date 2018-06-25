import React from 'react';
import styled from 'styled-components';

const ContactListWrapper = styled.div`
	display: grid;
	border-radius: 5px;
	border: 1px solid #ddd;
	max-height: 312px;
	overflow-y: scroll;
	padding: 0.5rem;

	& > div {
		padding: 0.5rem 0;

		&:not(:last-child) {
			border-bottom: 1px solid #ddd;
		}
	}
`;

const ContactList = (props) => {
	return (
			<ContactListWrapper>
				{ props.contacts.map(contact => (
						<div>{contact.label}</div>
					))}
			</ContactListWrapper>
		)
}

export default ContactList;